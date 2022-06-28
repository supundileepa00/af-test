const mongoose = require("mongoose");
const Router = require("@koa/router");
const Author = require("../models/Author");

const authorRouter = new Router({
  prefix: "/author",
});

authorRouter.get("/", async (ctx) => {
  try {
    const authors = await Author.find();

    ctx.status = 200;

    ctx.body = {
      message: "Authors",
      authors: authors,
    };
  } catch (error) {
    console.log(error);

    ctx.status = 500;

    ctx.body = {
      message: "Error",
    };
  }
});

//add

authorRouter.post("/add", (ctx) => {
  const firstName = ctx.request.body.firstName;
  const lastName = ctx.request.body.lastName;
  const nationality = ctx.request.body.nationality;

  const newAuthor = new Author({
    firstName,
    lastName,
    nationality,
  });

  ctx.status = 200;

  ctx.body = {
    status: true,
    book: newAuthor,
  };

  newAuthor
    .save()
    .then((ctx) => {
      console.log("Author Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = authorRouter;
