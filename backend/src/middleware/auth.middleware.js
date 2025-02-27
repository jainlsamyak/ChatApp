import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const protectRoute = async (res, req, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "Unauthorized- No Token Provided" });
    }
  } catch (error) {}
};
