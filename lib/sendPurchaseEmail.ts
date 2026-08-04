import { resend } from "@/lib/resend";

interface PurchaseEmailProps {
  firstName: string;
  email: string;
  token: string;
}

export async function sendPurchaseEmail({
  firstName,
  email,
  token,
}: PurchaseEmailProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const downloadUrl = `${siteUrl}/download/${token}`;

  const coverUrl = `${siteUrl}/images/house-of-chaliss-cover.jpg`;

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "📖 Your copy of House of Chaliss is ready!",

    text: `
Hi ${firstName},

Thank you for purchasing House of Chaliss: Book 1 – Experience of Being Kevo.

Your download link:

${downloadUrl}

This link expires after 24 hours.

Maximum downloads: 3

Enjoy reading!

House of Chaliss
`,

    html: `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
</head>

<body style="
margin:0;
padding:0;
background:#F5F1EA;
font-family:Arial,Helvetica,sans-serif;
">

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="padding:40px 0;"
>

<tr>

<td align="center">

<table
width="620"
cellpadding="0"
cellspacing="0"
style="
background:#ffffff;
border-radius:16px;
overflow:hidden;
box-shadow:0 10px 35px rgba(0,0,0,.08);
"
>

<tr>

<td
style="
background:#3F2B1F;
padding:35px;
text-align:center;
"
>

<h1
style="
margin:0;
color:white;
font-size:34px;
"
>

House of Chaliss

</h1>

<p
style="
color:#E9DCC7;
margin-top:10px;
font-size:16px;
"
>

Book 1 – Experience of Being Kevo

</p>

</td>

</tr>

<tr>

<td align="center" style="padding:35px;">

<img
src="${coverUrl}"
alt="House of Chaliss Cover"
width="230"
style="
border-radius:10px;
box-shadow:0 8px 25px rgba(0,0,0,.25);
display:block;
"
/>

</td>

</tr>

<tr>

<td style="padding:0 45px 10px;">

<h2
style="
margin:0;
color:#7C4A03;
font-size:28px;
"
>

Hello ${firstName},

</h2>

<p
style="
font-size:18px;
line-height:1.8;
color:#444;
margin-top:25px;
"
>

Thank you for purchasing

<strong>
House of Chaliss:
Book 1 – Experience of Being Kevo
</strong>.

<br><br>

Your payment has been successfully confirmed and your eBook is now ready for download.

</p>

</td>

</tr>

<tr>

<td align="center" style="padding:35px;">

<a
href="${downloadUrl}"

style="
background:#92400E;
color:white;
padding:18px 40px;
text-decoration:none;
font-size:18px;
font-weight:bold;
border-radius:10px;
display:inline-block;
"
>

📥 Download Your eBook

</a>

</td>

</tr>

<tr>

<td style="padding:0 45px;">

<div
style="
background:#F8F5EF;
padding:25px;
border-radius:12px;
font-size:16px;
line-height:1.9;
color:#555;
"
>

<b>Your purchase includes:</b>

<ul style="padding-left:22px;">

<li>PDF edition of House of Chaliss</li>

<li>Download available immediately</li>

<li>Link expires after <b>24 hours</b></li>

<li>Maximum of <b>3 downloads</b></li>

</ul>

</div>

</td>

</tr>

<tr>

<td style="padding:45px;">

<p
style="
font-size:16px;
line-height:1.8;
color:#555;
"
>

If the download button does not work, copy and paste this link into your browser:

</p>

<p
style="
word-break:break-word;
color:#92400E;
font-size:14px;
"
>

${downloadUrl}

</p>

<hr
style="
margin:35px 0;
border:none;
border-top:1px solid #DDD;
"
/>

<p
style="
text-align:center;
color:#777;
font-size:14px;
line-height:1.8;
"
>

Thank you for supporting independent writing.

<br><br>

<strong>House of Chaliss</strong>

<br>

© ${new Date().getFullYear()} All Rights Reserved.

</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`,
  });

  if (error) {
    console.error("Resend Email Error:", error);
    throw error;
  }
}