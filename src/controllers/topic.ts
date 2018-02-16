import Topic from "../models/Topic";
import { Request, Response, NextFunction } from "express";
/**
 * router.get('/', TopicController.all);
 * router.post('/', TopicController.save);
 * router.get('/:id', TopicController.one);
 * router.delete('/:id', TopicController.remove);
 */

export default class Controller {

  static async all(req: Request, res: Response, next: NextFunction) {
    try {
      const docs = await Topic.find();
      res.json({ docs });
    } catch (err) { next(err); }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;
      const doc = await Topic.remove({ _id });
      res.json({ doc });
    } catch (err) { next(err); }
  }
  static async save (req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await Topic.create(req.body);
      res.json({ doc });
    } catch (err) { next(err); }
  }
  static async one (req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;
      const doc = await Topic.find({ _id });
      res.json({ doc });
    } catch (err) { next(err); }
  }

}

// export const all = async (req: Request, res: Response, next: NextFunction) => {
//   const docs = await Topic.find();
//   res.json({ docs });
// };
// export const save = async (req: Request, res: Response, next: NextFunction) => {
//   const doc = await Topic.create(req.body);
//   res.json({ doc });
//  };
// export const one = async (req: Request, res: Response, next: NextFunction) => {
//   const { _id } = req.params;
//   const doc = await Topic.find({ _id });
//   res.json({ doc });
//  };
// export const remove = async (req: Request, res: Response, next: NextFunction) => {
//   const { _id } = req.params;
//   const doc = await Topic.remove({ _id });
//   res.json({ doc });
//  };
