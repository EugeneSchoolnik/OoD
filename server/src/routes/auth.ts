import { Router } from "express";
import { getMe, login, logout } from "../controllers/auth";

const auth = Router();

auth
  .post("/login", login as any)
  .get("/", getMe as any)
  .get("/logout", logout as any);

export default auth;
