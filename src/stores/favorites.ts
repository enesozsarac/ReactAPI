import { create } from "zustand";

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
  // removeFavoriteAlbums: (albumId : number) => void;
}

const useFavoriteAlbumsStore = create<FavoritesState>((set) => ({
  favoriteAlbums: [],
  addFavoriteAlbums: (favorite) =>
    set((state) => ({
      favoriteAlbums: [...state.favoriteAlbums, favorite],
    })),
  // removeFavoriteAlbums: (albumId) => ({
  //     favoriteAlbums: state.favoriteAlbums.filter(favorite => favorite.albumId !== albumId)
  // })
}));

export default useFavoriteAlbumsStore;
