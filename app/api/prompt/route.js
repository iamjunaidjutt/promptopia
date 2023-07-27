import Prompt from "@models/Prompt";
import { connectDB } from "@utils/dbConfig";

export const GET = async () => {
	try {
		await connectDB();

		const prompts = await Prompt.find({}).populate("creator");

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch all prompts.", { status: 500 });
	}
};
