"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post.id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

export default function Feed() {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchText(value);
	};

	const handleTagClick = (tag) => {
		setSearchText(tag); // Update the searchText state with the clicked tag
	};

	useEffect(() => {
		// fetch data
		const fetchPosts = async () => {
			try {
				const res = await fetch("/api/prompt");
				if (!res.ok) {
					throw new Error("Failed to fetch posts.");
				}
				const data = await res.json();
				setPosts(data);
				setFilteredPosts(data); // Set the initial filtered posts to all posts
				toast.success("Posts fetched successfully!");
			} catch (error) {
				toast.error("Failed to fetch posts.");
			}
		};

		fetchPosts();
	}, []);

	useEffect(() => {
		// Filter posts when searchText changes
		const filteredPosts = posts.filter(
			(post) =>
				post.tag.includes(searchText) ||
				post.prompt.includes(searchText) ||
				post.creator.username.includes(searchText)
		);

		setFilteredPosts(filteredPosts);
	}, [searchText, posts]);

	return (
		<section className="feed">
			<form className="relative w-full text-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			<PromptCardList
				data={filteredPosts}
				handleTagClick={handleTagClick}
			/>
		</section>
	);
}
