"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { toast } from "react-hot-toast";

export default function UpdatePromptPage() {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const searchParams = useSearchParams();
	const promptId = searchParams.get("id");
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`);
			const data = await response.json();
			setPost(data);
		};

		if (promptId) getPromptDetails();
	}, [promptId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) alert("No prompt ID found. Please try again.");

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: post.prompt,
					userId: promptId,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				toast.success("Prompt updated successfully!");
				router.push("/profile");
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
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={handleSubmit}
		/>
	);
}
