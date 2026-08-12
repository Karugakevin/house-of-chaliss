import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

const MAX_DOWNLOADS = Number(
  process.env.MAX_DOWNLOADS || 3
);

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ token: string }>;
  }
) {
  try {
    const { token } = await params;

    console.log("====================================");
    console.log("DOWNLOAD REQUEST");
    console.log("TOKEN:", token);

    // --------------------------------------------------
    // Find download token
    // --------------------------------------------------

    const {
      data: downloadToken,
      error: tokenError,
    } = await supabase
      .from("download_tokens")
      .select("*")
      .eq("token", token)
      .single();

    if (tokenError || !downloadToken) {
      console.error(
        "Download token not found:",
        tokenError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Invalid download link.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // Check expiration
    // --------------------------------------------------

    if (
      new Date(downloadToken.expires_at) <
      new Date()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This download link has expired.",
        },
        { status: 403 }
      );
    }

    // --------------------------------------------------
    // Check download limit
    // --------------------------------------------------

    const currentDownloads =
      downloadToken.downloads ?? 0;

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
        { status: 403 }
      );
    }

    // --------------------------------------------------
    // Find purchase
    // --------------------------------------------------

    const {
      data: purchase,
      error: purchaseError,
    } = await supabase
      .from("purchases")
      .select("*")
      .eq(
        "id",
        downloadToken.purchase_id
      )
      .single();

    if (purchaseError || !purchase) {
      console.error(
        "Purchase not found:",
        purchaseError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Purchase not found.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // Verify payment
    // --------------------------------------------------

    if (
      purchase.payment_status !== "paid"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment has not been completed.",
        },
        { status: 403 }
      );
    }

    // --------------------------------------------------
    // Find book
    // --------------------------------------------------

    const {
      data: book,
      error: bookError,
    } = await supabase
      .from("books")
      .select("pdf_url")
      .eq(
        "id",
        purchase.book_id
      )
      .single();

    if (
      bookError ||
      !book?.pdf_url
    ) {
      console.error(
        "Book file not found:",
        bookError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Book file not found.",
        },
        { status: 404 }
      );
    }

    console.log(
      "ORIGINAL PDF PATH:",
      book.pdf_url
    );

    // --------------------------------------------------
    // Determine storage bucket
    // --------------------------------------------------

    const bucket =
      process.env.SUPABASE_EBOOK_BUCKET ||
      "ebooks";

    // --------------------------------------------------
    // Normalize PDF path
    //
    // Example database value:
    //
    // books/21d6da6c-8b0b-4049-bbe4-a29fa2cca6cc.pdf
    //
    // Bucket:
    // ebooks
    //
    // Path inside bucket:
    // books/21d6da6c-8b0b-4049-bbe4-a29fa2cca6cc.pdf
    // --------------------------------------------------

    const pdfPath = String(book.pdf_url)
      .replace(/^ebooks[\\/]/, "");

    console.log(
      "DOWNLOAD BUCKET:",
      bucket
    );

    console.log(
      "NORMALIZED PDF PATH:",
      pdfPath
    );

    // --------------------------------------------------
    // Generate Supabase signed URL
    // --------------------------------------------------

    const {
      data: signedUrlData,
      error: storageError,
    } = await supabase.storage
      .from(bucket)
      .createSignedUrl(
        pdfPath,
        60 * 5
      );

    console.log(
      "SIGNED URL CREATED:",
      Boolean(
        signedUrlData?.signedUrl
      )
    );

    if (
      storageError ||
      !signedUrlData?.signedUrl
    ) {
      console.error(
        "Storage Error:",
        storageError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to prepare your download.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // Increment download counter
    // --------------------------------------------------

    const {
      error: updateError,
    } = await supabase
      .from("download_tokens")
      .update({
        downloads:
          currentDownloads + 1,
      })
      .eq(
        "id",
        downloadToken.id
      );

    if (updateError) {
      console.error(
        "Download Counter Error:",
        updateError
      );
    }

    // --------------------------------------------------
    // IMPORTANT:
    // Redirect directly to the signed PDF URL.
    //
    // Do NOT return JSON here.
    // --------------------------------------------------

    console.log(
      "Redirecting customer to PDF..."
    );

    return NextResponse.redirect(
      signedUrlData.signedUrl
    );
  } catch (error) {
    console.error(
      "DOWNLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Server error.",
      },
      { status: 500 }
    );
  }
}