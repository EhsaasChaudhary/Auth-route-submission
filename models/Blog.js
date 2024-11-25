import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 3 },
    description: { type: String, required: true, trim: true, minlength: 10 },
    image: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
