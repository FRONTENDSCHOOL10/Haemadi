import { create } from 'zustand';

export const ToasterStore = create((set) => ({
  toasts: [],
  addToast: (type, message) => {
    const newToast = {
      id: Date.now(),
      type,
      message,
    };

    set((state) => {
      // 토스트 최대 개수를 3으로 제한
      let updatedToasts = [...state.toasts, newToast];

      if (updatedToasts.length > 3) {
        updatedToasts.shift(); // 가장 오래된 토스트 제거
      }

      return {
        toasts: updatedToasts,
      };
    });

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== newToast.id),
      }));
    }, 2000); // 2초 후 자동 삭제
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export function useToaster() {
  const { addToast } = ToasterStore((state) => ({
    addToast: state.addToast,
  }));

  return addToast;
}
