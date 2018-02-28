import Topic from "../models/Topic";
import { Request, Response, NextFunction } from "express";
import { redirectToPrevious, titleCase } from "./helpers";

export let all = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Topic.find();
    res.json({ docs });
  } catch (err) { next(err); }
};

export let remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params;
    const doc = await Topic.remove({ _id });
    res.json({ doc });
  } catch (err) { next(err); }
};

export let postCreate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { name } = req.body;
    name = titleCase(name);
    const doc = await Topic.create({ name });
    req.flash("success", {
      msg: "Successfully created topic!"
    });
    return redirectToPrevious(req, res);
  } catch (err) { next(err); }
};

export let getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params;
    const doc = await Topic.find({ _id });
    res.json({ doc });
  } catch (err) { next(err); }
};