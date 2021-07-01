import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = async (req, res, next) => {
  //   console.log(req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //we cdont want the 'bearer', the split method splits it into an array where the bearer is the first element
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password"); //exclude password
      next();
    } catch (error) {
      console.error(error);
      res.send(401);
      throw new Error("Not authorised, token failed");
    }
  }

  if (!token) {
    res.send(401);
    throw new Error("Not authorised, no token");
  }
};

export { protect };
