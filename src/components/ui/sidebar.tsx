import clsx from "clsx";
import { useEffect } from "react";

type SidebarProps = {
	isOpen: boolean;
} & React.ComponentProps<"div">;

export default function Sidebar({ isOpen, children, ...rest }: SidebarProps) {
	return (
		<div
			className={clsx(
				"flex fixed inset-0 z-20 shadow-md transform transition-transform duration-300 ease-in-out",
				isOpen ? "translate-x-0" : "-translate-x-full",
			)}
		>
			<div {...rest}>{children}</div>
		</div>
	);
}
