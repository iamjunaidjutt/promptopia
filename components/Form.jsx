"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Form({
	type,
	post,
	setPost,
	submitting,
	handleSubmit,
}) {
	return (
		<section className="w-full max-w-full flex-start flex-col min-h-[70vh] mt-32">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{type} Post</span>
			</h1>
			<p className="desc text-left max-w-md">
				{type} and share amazing prompts with the world, and let your
				imagination run wild with any AI-powered platform.
			</p>

			<motion.form
				initial={{ opacity: 0, x: 200 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: 0.4, type: "tween" }}
				onSubmit={handleSubmit}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
			>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Your AI Prompt
					</span>
				</label>

				<textarea
					value={post.prompt}
					onChange={(e) =>
						setPost({ ...post, prompt: e.target.value })
					}
					placeholder="Write your prompt here..."
					required
					className="form_textarea"
				/>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Tag {` `}
					</span>
					<span className="font-normal">
						(#product, #webdevelopment, #idea)
					</span>
				</label>

				<input
					value={post.tag}
					onChange={(e) => setPost({ ...post, tag: e.target.value })}
					placeholder="tag"
					required
					className="form_input"
				/>
				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href="/" className="text-gray-500 text-sm">
						Cancel
					</Link>

					<button
						type="submit"
						disabled={submitting}
						className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
					>
						{submitting ? `${type}...` : type}
					</button>
				</div>
			</motion.form>
		</section>
	);
}
