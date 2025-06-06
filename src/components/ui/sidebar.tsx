import clsx from "clsx";

type SidebarProps = {
	isOpen: boolean;
} & React.ComponentProps<"div">;

export default function Sidebar({ isOpen, children, ...rest }: SidebarProps) {
	return (
		<div
			className={clsx(
				"flex fixed inset-0 z-20 shadow-md transform transition-transform duration-300 ease-in-out pointer-events-none",
				isOpen ? "translate-x-0" : "-translate-x-full",
			)}
		>
			<div {...rest} className={clsx(rest.className, "pointer-events-auto")}>
				{children}
			</div>
		</div>
	);
}
