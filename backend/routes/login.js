const Router = require("@koa/router");
const Login = require("../models/Login");
const bcrypt = require("bcrypt");

const loginRouter = new Router({
  prefix: "/login",
});

loginRouter.post("/signup", async (ctx) => {
  const username = ctx.request.body.username;
  const password = await bcrypt.hash(ctx.request.body.password, 10);

  const newLogin = new Login({
    username,
    password,
  });

  newLogin
    .save()
    .then((ctx) => {
      console.log("user added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//login

loginRouter.post("/", async (ctx) => {
  try {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;

    const user = await Login.findOne({ username: username });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        ctx.status = 200;
        ctx.body = {
          user: true,
          validate: true,
        };
      } else {
        ctx.status = 200;
        ctx.body = {
          user: true,
          validate: false,
        };
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        user: false,
        validate: false,
      };
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      user: false,
      validate: false,
    };
  }
});

module.exports = loginRouter;
