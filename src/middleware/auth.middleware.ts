import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Env from "../env/env";
import logger from "../helpers/logger";
import { ErrorHandler } from "../handle/error.handle";

class MiddlewareAuth {
  private env = new Env();

  public authenticate(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ErrorHandler(401, "01", { auth: "Unauthorized access!" });
    }

    const token = authHeader.replace(/^Bearer\s+/i, "");

    try {
      const payload = jwt.verify(
        token,
        this.env.getSecretAccess()
      ) as JwtPayload;
      req.user = payload;
      next();
    } catch (error) {
      logger.error(`Unauthorized access attempt.`, { error });
      throw new ErrorHandler(401, "01", { auth: "Invalid token!" });
    }
  }
}

export default new MiddlewareAuth();
