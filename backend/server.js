const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const mongoose = require("mongoose");
const KoaRouter = require("@koa/router");

const app = new Koa();
const router = new KoaRouter();

app.use(cors());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(5000, () => {
  console.log("App Running on PORT 5000");
});

const connection = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/AF2017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.once("open", () => {
  console.log("MongoDB connection success");
});

//routes

const bookRouter = require("./routes/book");
const authorRouter = require("./routes/author");
const loginRouter = require("./routes/login");

app.use(bookRouter.routes());
app.use(authorRouter.routes());
app.use(loginRouter.routes());
