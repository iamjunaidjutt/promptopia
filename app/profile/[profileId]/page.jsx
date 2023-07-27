"use client";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { toast } from "react-hot-toast";

export default function UserProfilePage({ params }) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch(
					`/api/users/${params.profileId}/posts/`
				);
				if (!res.ok) {
					throw new Error("Failed to fetch user posts.");
				}
				const resPosts = await res.json();
				setPosts(resPosts);
				toast.success("Posts fetched successfully!");
			} catch (error) {
				toast.error("Failed to fetch user posts.");
			}
		};

		fetchPosts();
	}, [params.profileId]);

	return (
		<Profile
			name="User"
			desc={`Welcome to the user profile page!`}
			data={posts}
		/>
		// <div>Profile Page</div>s
	);
}
