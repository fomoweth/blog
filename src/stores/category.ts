import { create } from "zustand";

export type CategoryState = {
	category: "all" | string;
};

export type CategoryActions = {
	select: (state: "all" | string) => void;
	reset: () => void;
};

export type CategoryStore = CategoryState & CategoryActions;

export const useCategoryStore = create<CategoryStore>((set) => ({
	category: "all",
	select: (category) =>
		set((state) => ({
			category: state.category === category ? "all" : category,
		})),
	reset: () => set({ category: "all" }),
}));
