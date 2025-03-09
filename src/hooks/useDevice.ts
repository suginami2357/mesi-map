import { useEffect } from "react";
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

// デバイス判定フック
export function useDevice() {
	const { device, setDevice } = useDeviceStore();

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
	}, [setDevice]);

	return {
		device,
		isDesktop: device === "desktop",
		isTablet: device === "tablet",
		isMobile: device === "mobile",
	};
}
