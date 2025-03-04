import { useEffect, useState } from "react";

export function useDevice() {
	const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">(
		"desktop",
	);

	useEffect(() => {
		const ua = navigator.userAgent.toLowerCase();

		if (/(ipad|android(?!.*mobi)|tablet)/i.test(ua)) {
			setDevice("tablet");
			return;
		}

		if (/(iphone|ipod|android.*mobi)/i.test(ua)) {
			setDevice("mobile");
			return;
		}

		setDevice("desktop");
	}, []);

	return {
		device,
		isDesktop: device === "desktop",
		isTablet: device === "tablet",
		isMobile: device === "mobile",
	};
}
