import * as mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true }

}, { timestamps: true });

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;