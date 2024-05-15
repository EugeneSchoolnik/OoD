import type { NextFunction, Request, Response } from "express";

type user = { group: "manager" | "admin" };

export type Handler = (req: Request & { user: user }, res: Response, next: NextFunction) => void;
