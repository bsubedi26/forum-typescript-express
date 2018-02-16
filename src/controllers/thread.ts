import { Response, Request, NextFunction } from "express";
import * as faker from "faker";
import Thread from "../models/Thread";
import Topic from "../models/Topic";
import { range } from "lodash";

// function _seeder() {
  // const counter = [...Array(15).keys()];
  // for (const idx of counter) {
  //   const doc = await Thread.create({
  //     topicId,
  //     creatorId,
  //     title: faker.lorem.text(),
  //     summary: faker.lorem.paragraph()
  //   });
  // }
// }

export let redirectToSingleTopic = async (req: Request, res: Response) => {
  const singleTopic: any = await Topic.findOne();
  res.redirect(`/thread/topicId/${singleTopic._id}`);
};

export let getByTopicId = async (req: Request, res: Response) => {
  const currentPage = parseInt(req.query.page, 10);
  const topicId = req.params._id;
  const itemPerPage = 5;

  const count = await Thread.find({ topicId }).count();
  const threads: any = await Thread.find({ topicId })
    .skip(itemPerPage * currentPage)
    .limit(itemPerPage)
    .sort({ updatedAt: -1 })
    .populate({ path: 'topicId', select: 'name' });


  const topic = {
    name: threads[0].topicId.name,
    _id: topicId,
    page: req.query.page || 1,
    count
  };

  const pages = range(1, count / itemPerPage); // create an array based on total count / item per page
  const topics = await Topic.find();

  res.render("thread/threads-by-topic-id", {
    title: "Threads By Topic",
    threads,
    topic,
    topics,
    pages
  });
};

export let getOne = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const thread = await Thread.findById(_id);

  res.render("thread/thread-by-thread-id", {
    title: "Thread Single ID",
    thread
  });
};

export let findAll = async (req: Request, res: Response) => {
  const threads = await Thread.find().sort({ updatedAt: -1 });
  const topics = await Topic.find();
  res.render("thread/index", {
    title: "Thread",
    threads,
    topics
  });
};

export let create = (req: Request, res: Response) => {
  res.render("thread/create", {
    title: "Create Thread"
  });
};

export let postCreate = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.user);
  console.log(req.body);
  req.body.creatorId = req.user._id;
  req.assert("title", "Title cannot be blank").notEmpty();
  req.assert("summary", "Summary cannot be blank").notEmpty();
  req.assert("topicId", "topicId cannot be blank").notEmpty();
  req.assert("creatorId", "creatorId cannot be blank").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/thread/create");
  }

  try {
    const thread = new Thread(req.body);
    const doc = await thread.save();
    req.flash("success", {
      msg: "Successfully created thread!"
    });
    return res.redirect("/thread");
  }
  catch (err) {
    next(err);
    // res.status(400).json({ error: err });
  }
};


