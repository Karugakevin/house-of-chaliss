import { notFound, redirect } from "next/navigation";
import supabaseAdmin from "@/lib/supabase-admin";

interface Props {
  params: Promise<{
    token: string;
  }>;
}

export default async function DownloadPage({ params }: Props) {
  const { token } = await params;

  console.log("====================================");
  console.log("DOWNLOAD TOKEN:", token);

  // --------------------------------------------------
  // Find download token
  // --------------------------------------------------

  const {
    data: downloadToken,
    error: tokenError,
  } = await supabaseAdmin
    .from("download_tokens")
    .select("*")
    .eq("token", token)
    .maybeSingle();

  console.log("Download Token:");
  console.dir(downloadToken, { depth: null });

  console.log("Download Token Error:");
  console.dir(tokenError, { depth: null });

  if (tokenError || !downloadToken) {
    console.log("Download token not found.");
    notFound();
  }

  // --------------------------------------------------
  // Expiry
  // --------------------------------------------------

  if (new Date(downloadToken.expires_at) < new Date()) {
    return (
      <main className="max-w-xl mx-auto py-20">
        <h1 className="text-3xl font-bold">
          Download link expired.
        </h1>
      </main>
    );
  }

  // --------------------------------------------------
  // Download limit
  // --------------------------------------------------

  if (downloadToken.downloads >= 5) {
    return (
      <main className="max-w-xl mx-auto py-20">
        <h1 className="text-3xl font-bold">
          Download limit reached.
        </h1>
      </main>
    );
  }

  // --------------------------------------------------
  // Purchase
  // --------------------------------------------------

  const {
    data: purchase,
    error: purchaseError,
  } = await supabaseAdmin
    .from("purchases")
    .select("*")
    .eq("id", downloadToken.purchase_id)
    .maybeSingle();

  console.log("Purchase:");
  console.dir(purchase, { depth: null });

  console.log("Purchase Error:");
  console.dir(purchaseError, { depth: null });

  if (purchaseError || !purchase) {
    console.log("Purchase not found.");
    notFound();
  }

  // --------------------------------------------------
  // Book
  // --------------------------------------------------

  const {
    data: book,
    error: bookError,
  } = await supabaseAdmin
    .from("books")
    .select("*")
    .eq("id", purchase.book_id)
    .maybeSingle();

  console.log("Book:");
  console.dir(book, { depth: null });

  console.log("Book Error:");
  console.dir(bookError, { depth: null });

  if (bookError || !book) {
    console.log("Book not found.");
    notFound();
  }

  // --------------------------------------------------
  // Signed URL
  // --------------------------------------------------

  const {
    data: signedUrl,
    error: signedError,
  } = await supabaseAdmin.storage
    .from("books")
    .createSignedUrl(book.pdf_url, 60);

  console.log("Signed URL:");
  console.dir(signedUrl, { depth: null });

  console.log("Signed URL Error:");
  console.dir(signedError, { depth: null });

  if (signedError || !signedUrl) {
    notFound();
  }

  // --------------------------------------------------
  // Increment downloads
  // --------------------------------------------------

  await supabaseAdmin
    .from("download_tokens")
    .update({
      downloads: downloadToken.downloads + 1,
    })
    .eq("id", downloadToken.id);

  console.log("Redirecting to PDF...");

  redirect(signedUrl.signedUrl);
}// Netlify deployment check
