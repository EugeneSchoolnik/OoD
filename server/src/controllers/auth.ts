import { clientError, errorHandler } from "../utils/error";
import type { Handler } from "../utils/express";

export const login: Handler = async (req, res) => {
  try {
    const { group, password } = req.body;

    if (!["manager", "admin"].includes(group)) throw clientError(404, "Group not found");
    if (group == "manager" && password != "1234567890") throw clientError(401, "Invalid password");
    if (group == "admin" && password != "admin1234567890") throw clientError(401, "Invalid password");

    res.cookie("authorization", group, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ group });
  } catch (e) {
    errorHandler(e, res);
  }
};

export const authentication: Handler = async (req, res, next) => {
  try {
    const group = req.cookies.authorization;

    if (!group) throw clientError(401, "You don't have access");

    req.user = { group };
    next();
  } catch (e) {
    errorHandler(e, res);
  }
};

export const getMe: Handler = async (req, res) => {
  try {
    const group = req.cookies.authorization;
    if (!group) return res.json({ group: "user" });

    res.json({ group });
  } catch (e) {
    errorHandler(e, res);
  }
};

export const logout: Handler = async (req, res) => {
  try {
    res.cookie("authorization", "user", { httpOnly: true, maxAge: 0 }).send();
  } catch (e) {
    errorHandler(e, res);
  }
};
