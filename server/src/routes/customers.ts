import { Router } from "express";
import { add, edit, get, getById, remove } from "../controllers/customers";
import { authentication } from "../controllers/auth";

const customers = Router();

customers
  .get("/", get as any)
  .get("/get/:id", getById as any)
  .post("/add", authentication as any, add as any)
  .put("/edit", authentication as any, edit as any)
  .delete("/remove/:id", authentication as any, remove as any);

export default customers;
