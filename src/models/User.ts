import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUserDocument extends Document<string> {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  /** Either Employee code for admin and faculty or Registration number for student */
  user_unique_id: number;
  role: "admin" | "faculty" | "student";
  /** Users that have left will be flagged as true */
  dropped: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    user_unique_id: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
