import index from "@web/index.html";

const server = Bun.serve({
  port: 3000,
  routes: {
    "/": index,
    "/api": () => Response.json({ message: "hi from bun" }),
  },
});

console.log(`Listening on ${server.url}`);
