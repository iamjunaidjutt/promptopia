export default function Tooltip({ message, children }) {
	return (
		<div className="group relative flex">
			{children}
			<span className="absolute top-10 left-1/2 transform -translate-x-1/2 scale-0 transition-all origin-top rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-30">
				{message}
			</span>
		</div>
	);
}
