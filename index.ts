const server = Bun.serve({
  port: 3000,
  routes: {
    "/": () => new Response("Hi from Bun"),
  },
});

console.log(`Listening on ${server.url}`);
