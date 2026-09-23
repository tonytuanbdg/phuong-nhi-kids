import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  size: string;
  color: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string | null;
  placeholderKind: string;
  placeholderTone: string;
  maxStock: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const items = get().items;
        const existing = items.find((i) => i.variantId === item.variantId);
        if (existing) {
          set({
            items: items.map((i) =>
              i.variantId === item.variantId
                ? {
                    ...i,
                    quantity: Math.min(i.quantity + item.quantity, i.maxStock),
                  }
                : i
            ),
          });
        } else {
          set({ items: [...items, item] });
        }
        set({ isOpen: true });
      },
      removeItem: (variantId) =>
        set({ items: get().items.filter((i) => i.variantId !== variantId) }),
      setQuantity: (variantId, quantity) =>
        set({
          items: get()
            .items.map((i) =>
              i.variantId === variantId
                ? { ...i, quantity: Math.max(1, Math.min(quantity, i.maxStock)) }
                : i
            )
            .filter((i) => i.quantity > 0),
        }),
      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    { name: "phuong-nhi-kids-cart" }
  )
);

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
