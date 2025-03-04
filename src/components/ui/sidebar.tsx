import clsx from "clsx";
import { useEffect } from "react";

type SidebarProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	showOverlay?: boolean;
} & React.PropsWithChildren;

export default function Sidebar({
	isOpen,
	setIsOpen,
	showOverlay = true,
	children,
}: SidebarProps) {
	useEffect(() => {
		if (!showOverlay) return;
		document.body.style.overflow = isOpen ? "hidden" : "auto";
	}, [showOverlay, isOpen]);

	return (
		<div
			className={clsx(
				"flex fixed inset-0 z-20 transform transition-transform duration-300 ease-in-out",
				isOpen ? "translate-x-0" : "-translate-x-full delay-[50ms]",
			)}
		>
			{/* オーバーレイ */}
			{showOverlay && (
				<button
					className={clsx(
						"fixed inset-0 bg-black transition-opacity",
						isOpen ? "opacity-50 delay-[175ms]" : "opacity-0",
					)}
					onClick={() => setIsOpen(false)}
					type="button"
				/>
			)}

			{/* サイドバー */}
			<div className="flex z-30 w-80 h-full bg-white shadow-lg">
				<div className="text-gray-900">{children}</div>
			</div>
		</div>
	);
}
