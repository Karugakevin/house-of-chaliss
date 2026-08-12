import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

const MAX_DOWNLOADS = Number(process.env.MAX_DOWNLOADS || 3);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    // Find download token
    const { data: downloadToken, error: tokenError } = await supabase
      .from("download_tokens")
      .select("*")
      .eq("token", token)
      .single();

    if (tokenError || !downloadToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid download link.",
        },
        {
          status: 404,
        }
      );
    }

    // Check expiration
    if (new Date(downloadToken.expires_at) < new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: "This download link has expired.",
        },
        {
          status: 403,
        }
      );
    }

    // Current downloads
    const currentDownloads = downloadToken.downloads ?? 0;

    // Enforce download limit
    if (currentDownloads >= MAX_DOWNLOADS) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You have reached the maximum number of downloads for this purchase.",
          downloads_used: currentDownloads,
          downloads_remaining: 0,
          max_downloads: MAX_DOWNLOADS,
        },
        {
          status: 403,
        }
      );
    }

    // Find purchase
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .select("*")
      .eq("id", downloadToken.purchase_id)
      .single();

    if (purchaseError || !purchase) {
      return NextResponse.json(
        {
          success: false,
          message: "Purchase not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Verify payment
    if (purchase.payment_status !== "paid") {
      return NextResponse.json(
        {
          success: false,
          message: "Payment has not been completed.",
        },
        {
          status: 403,
        }
      );
    }
    // Find book
    const { data: book, error: bookError } =
      await supabase
        .from("books")
        .select("pdf_url")
        .eq("id", purchase.book_id)
        .single();

    if (bookError || !book?.pdf_url) {
      return NextResponse.json(
        {
          success: false,
          message: "Book file not found.",
        },
        {
          status: 404,
      }
     );
    }

    // Generate signed URL (5 minutes)
    const { data: signedUrlData, error: storageError } =
      await supabase.storage
        .from("ebooks")
        .createSignedUrl(
          book.pdf_url,
          60 * 5
        );

    if (storageError || !signedUrlData) {
      console.error("Storage Error:", storageError);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to prepare your download.",
        },
        {
          status: 500,
        }
      );
    }

    // Increment download counter
    const { error: updateError } = await supabase
      .from("download_tokens")
      .update({
        downloads: currentDownloads + 1,
      })
      .eq("id", downloadToken.id);

    if (updateError) {
      console.error("Download Counter Error:", updateError);
    }

    // Return signed URL
    return NextResponse.json({
      success: true,
      url: signedUrlData.signedUrl,
      downloads_used: currentDownloads + 1,
      downloads_remaining:
        MAX_DOWNLOADS - (currentDownloads + 1),
      max_downloads: MAX_DOWNLOADS,
    });

  } catch (error) {
    console.error("Download Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error.",
      },
      {
        status: 500,
      }
    );
  }
}
