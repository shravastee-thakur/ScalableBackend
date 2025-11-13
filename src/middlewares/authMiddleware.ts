import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { Response, NextFunction, Request } from "express";
import { ProtectedRequest } from "../../types/api-request";

interface DecodedToken extends JwtPayload {
  userId: string;
}

const protect = asyncHandler(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as DecodedToken;

        req.user = await User.findById(decoded.userId).select("-password");

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export { protect };
