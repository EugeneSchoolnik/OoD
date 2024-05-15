import uniqid from "uniqid";
import db from "../db";
import { clientError, errorHandler } from "../utils/error";
import type { Handler } from "../utils/express";

export const get: Handler = async (req, res) => {
  try {
    const [data] = await db.execute("SELECT * FROM announcements");

    res.json({ data });
  } catch (e) {
    errorHandler(e, res);
  }
};

export const getById: Handler = async (req, res) => {
  try {
    const data: any = await db.execute("SELECT * FROM announcements WHERE id = ?", [req.params.id]);

    res.json({ data: data[0][0] });
  } catch (e) {
    errorHandler(e, res);
  }
};

export const objectsId: Handler = async (req, res) => {
  try {
    const [data] = await db.execute("SELECT id, address FROM estate_objects");

    res.json({ data });
  } catch (e) {
    errorHandler(e, res);
  }
};

const getDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Додаємо 1, оскільки місяці нумеруються з 0
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const add: Handler = async (req, res) => {
  try {
    const { id_object, id_customer, type, area, price } = req.body;

    const objectExist = (await db.execute("SELECT id FROM estate_objects WHERE id = ?", [id_object]))[0][0];
    if (!objectExist) throw clientError(404, "Estate object not found");
    const customerExist = (await db.execute("SELECT id FROM customers WHERE id = ?", [id_customer]))[0][0];
    if (!customerExist) throw clientError(404, "Customer not found");

    const id = uniqid.time();
    const status = true;
    const date = getDate();
    const record: any = await db.execute(
      "INSERT INTO announcements (id, id_object, id_customer, type, area, price, status, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, id_object, id_customer, type, area, price, status, date]
    );

    if (record[0] && record[0].affectedRows !== 1) throw clientError(500, "Error adding announcement");

    res.status(201).json({ id, id_object, id_customer, type, area, price, status, date });
  } catch (e) {
    errorHandler(e, res);
  }
};

export const edit: Handler = async (req, res) => {
  try {
    if (req.user.group !== "admin") throw clientError(401, "You don't have access");

    const { id, id_object, id_customer, type, area, price, status } = req.body;

    const result: any = await db.execute(
      "UPDATE announcements SET id_object = ?, id_customer = ?, type = ?, area = ?, price = ?, status = ? WHERE id = ?",
      [id_object, id_customer, type, area, price, status, id]
    );

    if (result[0] && result[0].affectedRows == 0) throw clientError(500, "Error editing announcement");

    res.status(200).send();
  } catch (e) {
    errorHandler(e, res);
  }
};

export const remove: Handler = async (req, res) => {
  try {
    if (req.user.group !== "admin") throw clientError(401, "You don't have access");

    const { id } = req.params;
    const result: any = await db.execute("DELETE FROM announcements WHERE id = ?", [id]);

    if (result[0] && result[0].affectedRows == 0) throw clientError(500, "Error removing announcement");

    res.send();
  } catch (e) {
    errorHandler(e, res);
  }
};

export const relevant: Handler = async (req, res) => {
  try {
    const [data] = await db.execute(
      "SELECT announcements.id AS id_announcement, customer_requests.id AS id_request, announcements.id_customer AS id_owner, customer_requests.id_customer AS id_customer\
      FROM customer_requests, announcements\
      WHERE announcements.price <= customer_requests.max_price and announcements.status = 1 and customer_requests.type = announcements.type and announcements.area >= customer_requests.area"
    );

    res.json({ data });
  } catch (e) {
    errorHandler(e, res);
  }
};
