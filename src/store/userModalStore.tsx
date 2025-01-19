import { create } from "zustand";

interface useModalProps {
  isOpen: boolean;
  data: { message: string; data: any } | null;
  setData: (data: { message: string; data: any }) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useModalState = create<useModalProps>((set) => ({
  isOpen: false,
  data: null,
  setData: (data: { message: string; data: any }) =>
    set((state) => ({ data: data })),
  onOpen: () => set((state) => ({ isOpen: true })),
  onClose: () => set((state) => ({ isOpen: false, data: null })),
}));
