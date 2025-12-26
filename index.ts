import index from "@web/index.html";

const server = Bun.serve({
  port: 3000,
  routes: {
    "/": index,
    "/api": () => Response.json({ message: "hi from bun" }),
    "/upload": async (req) => {
      if (req.method !== "POST") {
        return Response.json(
          { success: false, error: "Method not allowed" },
          { status: 405 },
        );
      }

      const form = await req.formData();

      const file = form.get("file");
      if (!file) {
        return Response.json(
          { success: false, error: "No file provided" },
          { status: 400 },
        );
      }

      const hash = new Bun.CryptoHasher("sha256");
      hash.update(file);
      const digest = hash.digest("hex");

      return Response.json({
        success: true,
        message: "File uploaded successfully",
        payload: {
          hash: digest,
        },
      });
    },
  },
});

console.log(`Listening on ${server.url}`);
