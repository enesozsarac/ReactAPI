import create from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesPhotos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface FavoritesState {
  favoriteAlbums: FavoritesPhotos[];
  addFavoriteAlbums: (favorite: FavoritesPhotos) => void;
  removeFavoriteAlbums: (albumId: number) => void;
}

export const useFavoriteAlbumsStore = create<FavoritesState>()(
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
      name: "favorites-album",
      getStorage: () => localStorage,
    }
  )
);

interface FavoritesPosts {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface FavoritePostsState {
  favoritePost: FavoritesPosts[];
  addFavoritePosts: (favorite: FavoritesPosts) => void;
  removeFavoritePosts: (id: number) => void;
}

export const useFavoritePostsStore = create<FavoritePostsState>()(
  persist(
    (set) => ({
      favoritePost: [],
      addFavoritePosts: (favorite) =>
        set((state) => ({
          favoritePost: [...state.favoritePost, favorite],
        })),
      removeFavoritePosts: (id) =>
        set((state) => ({
          favoritePost: state.favoritePost.filter(
            (favorite) => favorite.id !== id
          ),
        })),
    }),
    {
      name: "favorites-album", 
      getStorage: () => localStorage, 
    }
  )
);
