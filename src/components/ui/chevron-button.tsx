import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ChevronButtonProps = {
	isOpen: boolean;
	setIsOpen: (value: React.SetStateAction<boolean>) => void;
} & React.ComponentProps<"button">;

export default function ChevronButton({
	isOpen,
	setIsOpen,
	...rest
}: ChevronButtonProps) {
	return (
		<button type="button" onClick={() => setIsOpen((prev) => !prev)} {...rest}>
			{isOpen ? <FaChevronLeft size={24} /> : <FaChevronRight size={24} />}
		</button>
	);
}
