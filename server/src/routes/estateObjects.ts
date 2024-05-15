import { Router } from "express";
import { add, edit, get, getById, remove } from "../controllers/estateObjects";
import { authentication } from "../controllers/auth";

const estateObjects = Router();

estateObjects
  .get("/", get as any)
  .get("/get/:id", getById as any)
  .post("/add", authentication as any, add as any)
  .put("/edit", authentication as any, edit as any)
  .delete("/remove/:id", authentication as any, remove as any);

export default estateObjects;
