const Router = require("@koa/router");
const Book = require("../models/Book");

const bookRouter = new Router({
  prefix: "/books",
});

//add book
bookRouter.post("/add", (ctx) => {
  const name = ctx.request.body.name;
  const isbn = ctx.request.body.isbn;
  const author = ctx.request.body.author;
  const price = ctx.request.body.price;
  const year = ctx.request.body.year;
  const publisher = ctx.request.body.publisher;

  const newBook = new Book({
    name,
    isbn,
    author,
    price,
    year,
    publisher,
  });

  ctx.status = 200;

  ctx.body = {
    status: true,
    book: newBook,
  };

  newBook
    .save()
    .then((ctx) => {
      console.log("Book Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all book
bookRouter.get("/", async (ctx) => {
  const books = await Book.find();

  ctx.status = 200;

  ctx.body = {
    message: "Book List",
    books: books,
  };
});

//delete book
bookRouter.delete("/delete/:id", (ctx) => {
  const id = ctx.params.id;

  Book.findByIdAndDelete(id)
    .then(() => {
      console.log("Book Deleted");
      ctx.status = 200;

      ctx.body = {
        message: "Book Deleted",
      };
    })
    .catch((err) => {
      console.log("err");
    });
});

//update book

bookRouter.put("/update/:id", async (ctx) => {
  try {
    const id = ctx.params.id;

    const name = ctx.request.body.name;
    const isbn = ctx.request.body.isbn;
    const author = ctx.request.body.author;
    const price = ctx.request.body.price;
    const year = ctx.request.body.year;
    const publisher = ctx.request.body.publisher;

    const newBook = new Book({
      name,
      isbn,
      author,
      price,
      year,
      publisher,
    });

    const update = await Book.findByIdAndUpdate(id, newBook);
    ctx.status = 200;

    ctx.body = {
      message: "Book Updated",
      books: newBook,
    };
  } catch (error) {
    console.log(error);
    ctx.status = 200;

    ctx.body = {
      message: "Update Error",
    };
  }
});

//calc service

bookRouter.post("/calc", async (ctx) => {
  try {
    const bookList = ctx.request.body.bookList;

    var total = 0;

    var i;
    for (i = 0; i < bookList.length; i++) {
      const book = await Book.findById(bookList[i]);
      total = total + book.price;
    }
    ctx.status = 200;

    ctx.body = {
      total: total,
    };
  } catch (error) {
    ctx.status = 200;

    ctx.body = {
      message: "Calc Error",
    };
  }
});

//get books by author
bookRouter.get("/author", async (ctx) => {
  try {
    const author = ctx.request.body.author;
    const books = await Book.find({
      author: author,
    });

    ctx.status = 200;

    ctx.body = {
      message: "Book List by " + author,
      books: books,
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;

    ctx.body = {
      message: "Error",
    };
  }
});

module.exports = bookRouter;
