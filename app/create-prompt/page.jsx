"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { toast } from "react-hot-toast";

export default function CreatePromptPage() {
	const router = useRouter();
	const { data: session } = useSession();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await fetch(`/api/prompt/new/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: post.prompt,
					userId: session?.user.id,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				toast.success("Prompt created successfully!");
				router.push("/");
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type="Create"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={handleSubmit}
		/>
	);
}
