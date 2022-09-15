import mongoose from "mongoose";

const defaultImg =
  "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      default: defaultImg,
    },
    favouriteMovies: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
