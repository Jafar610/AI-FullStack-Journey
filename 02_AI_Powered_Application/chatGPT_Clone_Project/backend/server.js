import express from "express";

const server = express();

function logged(req, res, next) {
  const url = req.url;
  const method = req.method;
   console.log(url, method);
   next();
}


function secondLogger(req, res, next){
    console.log("This is a second logger");
    next();
}

server.use('/dashboard', logged);

server.get("/about",(req, res) => {
  res.send("Hello Welcome!!");
});



server.get("/dashboard/index", (req, res) => {

  res.send("Hello this is home page");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
