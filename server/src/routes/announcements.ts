import { Router } from "express";
import { add, edit, get, getById, objectsId, relevant, remove } from "../controllers/announcements";
import { authentication } from "../controllers/auth";

const announcements = Router();

announcements
  .get("/", get as any)
  .get("/get/:id", getById as any)
  .get("/estateObjects", objectsId as any)
  .post("/add", authentication as any, add as any)
  .put("/edit", authentication as any, edit as any)
  .delete("/remove/:id", authentication as any, remove as any)
  .get("/relevant", relevant as any);

export default announcements;
