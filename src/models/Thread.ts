import * as mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },

  // tslint:disable-next-line:no-trailing-whitespace
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // fans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }]

}, { timestamps: true });

const Thread = mongoose.model("Thread", threadSchema);
export default Thread;