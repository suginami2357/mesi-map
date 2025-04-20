import { useMediaQuery } from "react-responsive";

function getDeviceType(
	isMobile: boolean,
	isDesktop: boolean,
): "mobile" | "tablet" | "desktop" {
	if (isMobile) return "mobile";
	if (isDesktop) return "desktop";
	return "tablet";
}

export function useDevice() {
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const isDesktop = useMediaQuery({ minWidth: 1025 });

	const device = getDeviceType(isMobile, isDesktop);

	return {
		device,
		isMobile,
		isTablet: device === "tablet",
		isDesktop,
	};
}
