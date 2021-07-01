import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// encrypting the entered password before save
userSchema.pre("save", async function (next) {
  //if the password is not modified, mongoose function
  if (!this.isModified("password")) {
    next();
  }
  //this shouldnt work if user only updates profile name or password
  //if user modifies password this should run

  const salt = await bcrypt.genSalt(10); //  using salting to create a stronger password, with 10 rounds
  this.password = await bcrypt.hash(this.password, salt); //adding salt to the entered password
});

const User = mongoose.model("User", userSchema);
export default User;
