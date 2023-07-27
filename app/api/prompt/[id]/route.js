import Prompt from "@models/Prompt";
import { connectDB } from "@utils/dbConfig";

// Get (for reading)
export const GET = async (request, { params }) => {
	try {
		await connectDB();

		const prompt = await Prompt.findById(params.id).populate("creator");

		if (!prompt) {
			return new Response("Prompt not found.", { status: 404 });
		}

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response("Failed to fetch the prompt.", { status: 500 });
	}
};

// Patch (for updating)
export const PATCH = async (request, { params }) => {
	try {
		await connectDB();

		const existingPrompt = await Prompt.findById(params.id);

		if (!existingPrompt) {
			return new Response("Prompt not found.", { status: 404 });
		}

		const { prompt, tag } = await request.json();

		// Validate the request body here if necessary

		if (prompt) existingPrompt.prompt = prompt;
		if (tag) existingPrompt.tag = tag;

		await existingPrompt.save();

		return new Response(JSON.stringify(existingPrompt), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response("Failed to update the prompt.", { status: 500 });
	}
};

// Delete (for deleting)
export const DELETE = async (request, { params }) => {
	try {
		await connectDB();

		const removePrompt = await Prompt.findByIdAndRemove(params.id);

		return new Response(JSON.stringify(removePrompt), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response("Failed to delete the prompt.", { status: 500 });
	}
};
