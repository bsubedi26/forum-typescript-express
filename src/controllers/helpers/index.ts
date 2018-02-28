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

async function seeder(Thread) {
  const creatorId = "5a865606fa7ee315680f6a8f";
  const topicId = "5a848fbf9078812020bffdda";

  const counter = [...Array(15).keys()];
  for (const idx of counter) {
    const doc = await Thread.create({
      topicId,
      creatorId,
      title: faker.lorem.word(),
      summary: faker.lorem.paragraph()
    });
  }
}

export {
  handleIfNoThreads,
  seeder
};