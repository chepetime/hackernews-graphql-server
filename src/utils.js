require("dotenv").config();

const jwt = require("jsonwebtoken");
const APP_SECRET = process.env.APP_SECRET || "t9nnziUD3syMAQbuWW9n92hkfIR8WV";

function getUserId(context) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not authenticated");
}

module.exports = {
  APP_SECRET,
  getUserId,
};
