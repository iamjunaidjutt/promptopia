import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
	mongoose.set("strict", true);

	if (isConnected) {
		console.log("=> using existing database connection");
		return;
	}

	try {
		console.log("=> using new database connection");
		mongoose.connect(process.env.MONGODB_URI, {
			dbName: "share_prompt",
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		isConnected = true;

		console.log("=> database connected!");
	} catch (error) {
		console.log("=> error connecting to database! ", error);
	}
};
