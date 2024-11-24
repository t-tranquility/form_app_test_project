import { create } from "zustand";
import { FavoritesStore } from "@shared/types";

export const useFavoritesStore = create<FavoritesStore>((set) => ({
    favorites: [],
    addFavorite: (postId) => set((state) => ({ favorites: [...state.favorites, postId] })),
    removeFavorite: (postId) => set((state) => ({ favorites: state.favorites.filter((id) => id !== postId) })),
}))

export default useFavoritesStore