const response = await collection.mpesaStkPush({
  first_name: firstName,
  last_name: lastName,
  email,
  phone_number: phone,
  amount,
  host:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000",
  api_ref: apiRef,
});

console.log("INTASEND RESPONSE:");
console.dir(response, { depth: null });

return NextResponse.json(response);