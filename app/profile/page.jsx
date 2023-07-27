"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
	const router = useRouter();
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch(
					`/api/users/${session?.user.id}/posts/`
				);
				if (!res.ok) {
					throw new Error("Failed to fetch user posts.");
				}
				const resPosts = await res.json();
				setPosts(resPosts);
				setLoading(false);
				toast.success("Posts fetched successfully!");
			} catch (error) {
				setError(error); // Set the actual error object
				setLoading(false);
				toast.error("Failed to fetch user posts.");
			}
		};

		fetchPosts();
	}, [session?.user.id]);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post?._id}`);
	};

	const handleDelete = (post) => {
		const hasConfirmed = confirm(
			"Are you sure? you want to delete this prompt."
		);

		if (hasConfirmed) {
			toast.promise(
				fetch(`/api/prompt/${post?._id}`, {
					method: "DELETE",
				}),
				{
					loading: "Deleting...",
					success: () => {
						toast.success("Prompt deleted successfully!");
						setPosts(posts.filter((p) => p._id !== post._id));
					},
					error: () => {
						toast.error("Failed to delete prompt.");
					},
				}
			);
		}
	};

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page!"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
}
