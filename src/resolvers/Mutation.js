const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { APP_SECRET, getUserId } = require("../utils");

/**
 * signup
 */
async function signup(_parent, args, context, _info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
}

/**
 * login
 */
async function login(_parent, args, context, _info) {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error("No such user found");
  }

  const validPassword = await bcrypt.compare(args.password, user.password);

  if (!validPassword) {
    throw new Error("No such user found");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
}

/**
 * post
 *
 */
async function post(_parent, args, context, _info) {
  const userId = getUserId(context);

  return context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });
}

module.exports = {
  signup,
  login,
  post,
};
