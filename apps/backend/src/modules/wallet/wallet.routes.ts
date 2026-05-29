/**
 * Wallet routes placeholder.
 */

import { Router, type Router as ExpressRouter } from "express";

export const walletRouter: ExpressRouter = Router();

walletRouter.get("/", (_request, response) => {
  response.status(200).json({ message: "Wallet routes placeholder" });
});
