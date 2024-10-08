// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from "express-serve-static-core";
import { UserTypes } from "@/@types/types.user";

declare global {
  namespace Express {
    interface Request {
      user?: UserTypes;
    }
  }
}
