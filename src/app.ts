import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { middlewareErrorHandler } from "./middleware/error";
import routes from "./routes/index";

import swaggerUi from "swagger-ui-express";
import OPENAPI_DOCS from "./swagger-docs/swagger";

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";


export const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

//cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(cors());

// routes
app.use("/api/v1", routes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(OPENAPI_DOCS, { customCssUrl: CSS_URL })
);

// Testing api
app.get("/api/test", (request: Request, response: Response) => {
  response.status(200).send({
    success: true,
    message: "Your API is working fine",
  });
});

// Unknown API route
app.all("*", (request: Request, response: Response) => {
  response.status(404).send({
    success: false,
    message: `${request.originalUrl} route you are trying to reach does not exist`,
  });
});

app.use(middlewareErrorHandler);
