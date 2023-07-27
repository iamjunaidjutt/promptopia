// route.js
import Prompt from "@models/Prompt";
import { connectDB } from "@utils/dbConfig";

export const GET = async (request, { params }) => {
	try {
		if (!params?.id) {
			return new Response("Invalid request. 'id' parameter missing.", {
				status: 400,
			});
		}

		await connectDB();

		const prompt = await Prompt.find({ creator: params.id }).populate(
			"creator"
		);

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		console.error(error); // Log the error for debugging
		return new Response("Failed to fetch the prompt.", { status: 500 });
	}
};
