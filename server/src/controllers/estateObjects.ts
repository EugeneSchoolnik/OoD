import uniqid from "uniqid";
import db from "../db";
import { clientError, errorHandler } from "../utils/error";
import type { Handler } from "../utils/express";

export const get: Handler = async (req, res) => {
  try {
    const [data] = await db.execute("SELECT * FROM estate_objects");

    res.json({ data });
  } catch (e) {
    errorHandler(e, res);
  }
};

export const getById: Handler = async (req, res) => {
  try {
    const data: any = await db.execute("SELECT * FROM estate_objects WHERE id = ?", [req.params.id]);

    res.json({ data: data[0][0] });
  } catch (e) {
    errorHandler(e, res);
  }
};

export const add: Handler = async (req, res) => {
  try {
    const { type, address, area, price } = req.body;

    const exist = (await db.execute("SELECT id FROM estate_objects WHERE address = ?", [address]))[0][0];
    if (exist) throw clientError(409, "Address is already in use");

    const id = uniqid.time();
    const record: any = await db.execute(
      "INSERT INTO estate_objects (id, type, address, area, price) VALUES (?, ?, ?, ?, ?)",
      [id, type, address, area, price]
    );

    if (record[0] && record[0].affectedRows !== 1) throw clientError(500, "Error adding estate object");

    res.status(201).json({ id, type, address, area, price });
  } catch (e) {
    errorHandler(e, res);
  }
};

export const edit: Handler = async (req, res) => {
  try {
    if (req.user.group !== "admin") throw clientError(401, "You don't have access");

    const { id, type, address, area, price } = req.body;

    const exist: any = (await db.execute("SELECT id FROM estate_objects WHERE address = ?", [address]))[0][0];
    if (exist && exist.id !== id) throw clientError(409, "Email is already in use");

    const result: any = await db.execute(
      "UPDATE estate_objects SET type = ?, address = ?, area = ?, price = ? WHERE id = ?",
      [type, address, area, price, id]
    );

    if (result[0] && result[0].affectedRows == 0) throw clientError(500, "Error editing estate object");

    res.status(200).send();
  } catch (e) {
    errorHandler(e, res);
  }
};

export const remove: Handler = async (req, res) => {
  try {
    if (req.user.group !== "admin") throw clientError(401, "You don't have access");

    const { id } = req.params;
    const result: any = await db.execute("DELETE FROM estate_objects WHERE id = ?", [id]);

    if (result[0] && result[0].affectedRows == 0) throw clientError(500, "Error removing estate object");

    res.send();
  } catch (e) {
    errorHandler(e, res);
  }
};
