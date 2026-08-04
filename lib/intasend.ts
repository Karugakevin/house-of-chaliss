import IntaSend from "intasend-node";

const intasend = new IntaSend(
  process.env.NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY!,
  process.env.INTASEND_SECRET_KEY!,
  true // true = Sandbox, false = Live
);

export const collection = intasend.collection();