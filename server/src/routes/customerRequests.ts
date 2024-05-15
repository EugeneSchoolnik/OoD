import { Router } from "express";
import { add, customersId, edit, get, getById, remove } from "../controllers/customerRequests";
import { authentication } from "../controllers/auth";

const customerRequests = Router();

customerRequests
  .get("/", get as any)
  .get("/get/:id", getById as any)
  .get("/customers", customersId as any)
  .post("/add", authentication as any, add as any)
  .put("/edit", authentication as any, edit as any)
  .delete("/remove/:id", authentication as any, remove as any);

export default customerRequests;
