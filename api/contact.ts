export default async function handler(req: Request) {
  return new Response(
    JSON.stringify({
      ok: true,
      message: "API works",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}