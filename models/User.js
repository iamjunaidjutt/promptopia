import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is required!"],
		unique: [true, "Email already exists!"],
	},
	username: {
		type: String,
		required: [true, "Username is required!"],
		match: [
			/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			"Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
		],
	},
	image: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
