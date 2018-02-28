import * as faker from "faker";

const handleIfNoThreads = (topicId, req, res) => {
  if (req.isAuthenticated()) {
    req.flash("success", { msg: "Please create a thread. There are currently no threads in the mongo database." });
    return res.redirect(`/thread/${topicId}/create`);
  } else {
    req.flash("errors", { msg: "Please login to create threads. There are currently no threads in the mongo database." });
    return res.redirect("/user/login");
  }
};

const redirectToPrevious = (req, res) => {
  const referer = req.header('Referer');
  const origin = req.header('origin');
  const redirectUrl = referer.substring(origin.length);
  return res.redirect(redirectUrl);
};

const titleCase = str => `${str.charAt(0).toUpperCase()}${str.substring(1)}`;

const userSeed = async (User) => {
  const counter = [...Array(5).keys()];

  for (const idx of counter) {
    const user = { email: faker.internet.email(), password: faker.internet.email() };
    await User.create(user);
  }
};

const threadSeed = async (Thread, topics, users) => {
  for (const topic of topics) {
    for (const user of users) {
      const counter = [...Array(4).keys()];
      for (const idx of counter) {
        const doc = await Thread.create({
          topicId: topic._id,
          creatorId: user._id,
          title: faker.lorem.words(),
          summary: faker.lorem.paragraph()
        });
      }
    }
  }
};
const seeder = async (User, Topic, Thread) => {
  console.log("seeding...");
  await userSeed(User);
  const users = await User.find();
  const topics = await Topic.find();
  await threadSeed(Thread, topics, users);
};

export {
  handleIfNoThreads,
  seeder,
  redirectToPrevious,
  titleCase
};