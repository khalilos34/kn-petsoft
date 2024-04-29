import prisma from "@/lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (request: Request) => {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.log("webhook verification failed: ", error);
    return Response.json(null, { status: 400 });
  }
  switch (event.type) {
    case "checkout.session.completed":
      await prisma.user.update({
        where: { email: event.data.object.customer_email },
        data: { hasAccess: true },
      });
      break;
    default:
      console.log(`Unhandled webhook type: ${event.type}`);
      return Response.json(null, { status: 400 });
  }

  return Response.json(null, { status: 200 });
};
