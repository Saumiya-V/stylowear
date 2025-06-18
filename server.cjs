// server.cjs
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Enable pagination headers
server.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

server.use(router);

server.listen(3000, () => {
  console.log('✅ JSON Server running on http://localhost:3000');
});
