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
    set(() => ({ data: data })),
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false, data: null })),
}));
