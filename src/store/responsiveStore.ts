import { create } from "zustand";

type ResponsiveStore = {
  isExpanded: boolean;
  isDesktop: boolean;
  setIsExpanded: (val: boolean) => void;
  setIsDesktop: (val: boolean) => void;
  handleResize: () => void;
};

export const useResponsiveStore = create<ResponsiveStore>((set) => ({
  isDesktop: false,
  isExpanded: false,
  setIsExpanded: (val: boolean) => set({ isExpanded: val }),
  setIsDesktop: (val: boolean) => set({ isDesktop: val }),
  handleResize: () => {
    const isDesktop = window.innerWidth >= 1024;
    set({ isDesktop, isExpanded: isDesktop });
  },
}));
