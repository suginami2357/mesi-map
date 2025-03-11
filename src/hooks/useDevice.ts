import { useMediaQuery } from "react-responsive";
import { create } from "zustand";

// Zustand ストア作成
type DeviceType = "desktop" | "tablet" | "mobile";

type DeviceStore = {
	device: DeviceType;
	setDevice: (device: DeviceType) => void;
};

const useDeviceStore = create<DeviceStore>((set) => ({
	device: "desktop",
	setDevice: (device) => set({ device }),
}));

export function useDevice() {
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
	const isDesktop = useMediaQuery({ minWidth: 1025 });

	let device: "desktop" | "tablet" | "mobile" = "desktop";
	if (isMobile) device = "mobile";
	if (isTablet) device = "tablet";

	return {
		device,
		isDesktop,
		isTablet,
		isMobile,
	};
}
