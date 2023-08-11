import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: {
    type: String,
    maxlength: 1000,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;