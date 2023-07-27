import Prompt from "@models/Prompt";
import { connectDB } from "@utils/dbConfig";

export const POST = async (req) => {
	try {
		const { userId, prompt, tag } = await req.json();

		// Validate the incoming request data
		if (!userId || !prompt || !tag) {
			return new Response("Invalid request data", { status: 400 });
		}

		await connectDB();
		const newPrompt = await Prompt.create({
			creator: userId,
			prompt,
			tag,
		});

		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		console.log(error); // Log the error for debugging
		return new Response("Failed to create a prompt", { status: 500 });
	}
};
