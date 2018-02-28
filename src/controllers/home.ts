import { Request, Response } from "express";
import User from "../models/User";
import Topic from "../models/Topic";
import Thread from "../models/Thread";
import { seeder } from "./helpers";

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  seeder(User, Topic, Thread);
  res.render("home", {
    title: "Home"
  });
};
