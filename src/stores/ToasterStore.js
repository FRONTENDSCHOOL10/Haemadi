import create from 'zustand';

export const ToasterStore = create((set) => ({
  toasts: [],
  addToast: (type, message) => {
    const newToast = {
      id: Date.now(),
      type,
      message,
    };
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));
    setTimeout(
      () =>
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== newToast.id),
        })),
      2000
    );
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
