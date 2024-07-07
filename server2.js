import http from "http";
const PORT = 8080;

const users = [
  { id: 1, name: "Tade Doe" },
  { id: 2, name: "Bayo Olaniyi" },
  { id: 3, name: "Sola Alagbe" },
];

const logger = (res, req, next) => {
  console.log(`${res.method} ${res.url}`);
  next();
};

// JSON MIDDLEWARE
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

const handleGetUsers = (res, req) => {
  res.statusCode = 200;
  res.end(JSON.stringify(users));
};

const handleGetUserByID = (res, req) => {
  const id = req.url.split("/")[3];
  res.statusCode = 200;
  const user = users.find((user) => user.id === Number(id));
  if (user) {
    res.end(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "User Not Found" }));
  }
};

const handleGetUserNotFound = (res, req) => {
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Not Found" }));
};

const handleCreateUser = (req, res) => {
  let body = "";
  req.on("data", (chunck) => {
    body += chunck.toString();
  });
  req.on("end", () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

const server = http.createServer((req, res) => {
  logger(res, req, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === `/api/users` && req.method === "GET") {
        handleGetUsers(res, req);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        handleGetUserByID(res, req);
      } else if (req.url === `/api/users` && req.method === "POST") {
        handleCreateUser(req, res);
      } else {
        handleGetUserNotFound(res, req);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
