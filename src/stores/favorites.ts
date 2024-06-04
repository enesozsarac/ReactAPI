import create from "zustand";
import { persist } from "zustand/middleware";

interface Favorites {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface FavoritesState {
  favoriteAlbums: Favorites[];
  addFavoriteAlbums: (favorite: Favorites) => void;
  removeFavoriteAlbums: (albumId: number) => void;
}

const useFavoriteAlbumsStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoriteAlbums: [],
      addFavoriteAlbums: (favorite) =>
        set((state) => ({
          favoriteAlbums: [...state.favoriteAlbums, favorite],
        })),
      removeFavoriteAlbums: (id) =>
        set((state) => ({
          favoriteAlbums: state.favoriteAlbums.filter(
            (favorite) => favorite.id !== id
          ),
        })),
    }),
    {
      name: "favorites-album", // storage key name
      getStorage: () => localStorage, // configure localStorage as the storage
    }
  )
);

export default useFavoriteAlbumsStore;
