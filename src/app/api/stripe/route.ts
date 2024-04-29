import prisma from "@/lib/db";

export const POST = async (request: Request) => {
  const data = await request.json();

  await prisma.user.update({
    where: { email: data.data.object.customer_email },
    data: { hasAccess: true },
  });

  return Response.json(null, { status: 200 });
};
