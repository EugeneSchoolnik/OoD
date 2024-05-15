import uniqid from "uniqid";
import db from "../db";
import { clientError, errorHandler } from "../utils/error";
import type { Handler } from "../utils/express";

export const get: Handler = async (req, res) => {
  try {
    const [data] = await db.execute("SELECT * FROM customer_requests");

    res.json({ data });
  } catch (e) {
    errorHandler(e, res);
  }
};

export const getById: Handler = async (req, res) => {
  try {
    const data: any = await db.execute("SELECT * FROM customer_requests WHERE id = ?", [req.params.id]);

    res.json({ data: data[0][0] });
  } catch (e) {
    errorHandler(e, res);
  }
};

export const customersId: Handler = async (req, res) => {
  try {
    const [data] = await db.execute("SELECT id, email FROM customers");

    res.json({ data });
  } catch (e) {
    errorHandler(e, res);
  }
};

export const add: Handler = async (req, res) => {
  try {
    const { id_customer, type, area, min_price, max_price } = req.body;

    const id = uniqid.time();
    const record: any = await db.execute(
      "INSERT INTO customer_requests (id, id_customer, type, area, min_price, max_price) VALUES (?, ?, ?, ?, ?, ?)",
      [id, id_customer, type, area, min_price, max_price]
    );

    if (record[0] && record[0].affectedRows !== 1) throw clientError(500, "Error adding customer request");

    res.status(201).json({ id, id_customer, type, area, min_price, max_price });
  } catch (e) {
    errorHandler(e, res);
  }
};

export const edit: Handler = async (req, res) => {
  try {
    if (req.user.group !== "admin") throw clientError(401, "You don't have access");

    const { id, id_customer, type, area, min_price, max_price } = req.body;

    const result: any = await db.execute(
      "UPDATE customer_requests SET id_customer = ?, type = ?, area = ?, min_price = ?, max_price = ? WHERE id = ?",
      [id_customer, type, area, min_price, max_price, id]
    );

    if (result[0] && result[0].affectedRows == 0) throw clientError(500, "Error editing customer request");

    res.status(200).send();
  } catch (e) {
    errorHandler(e, res);
  }
};

export const remove: Handler = async (req, res) => {
  try {
    if (req.user.group !== "admin") throw clientError(401, "You don't have access");

    const { id } = req.params;
    const result: any = await db.execute("DELETE FROM customer_requests WHERE id = ?", [id]);

    if (result[0] && result[0].affectedRows == 0) throw clientError(500, "Error removing customer request");

    res.send();
  } catch (e) {
    errorHandler(e, res);
  }
};
