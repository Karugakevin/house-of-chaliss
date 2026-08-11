import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    token: string;
  }>;
}

export default async function DownloadPage({
  params,
}: Props) {
  const { token } = await params;

  console.log("DOWNLOAD PAGE TOKEN:", token);

  redirect(`/api/download/${token}`);
}