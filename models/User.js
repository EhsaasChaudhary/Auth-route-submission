import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
