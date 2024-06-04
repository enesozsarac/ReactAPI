import { useLoaderData } from "react-router-dom";
import useFavoriteAlbumsStore from "../stores/favorites";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

interface AlbumProps {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const albumLoader = async ({ params }: any) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`
  );
  const albums = await response.json();
  console.log(albums);
  return albums;
};

function AlbumPage() {
  const albums = useLoaderData() as AlbumProps[];

  const favoriteAlbums = useFavoriteAlbumsStore(
    (state) => state.favoriteAlbums
  );
  const addFavoriteAlbums = useFavoriteAlbumsStore(
    (state) => state.addFavoriteAlbums
  );

  const removeFavoriteAlbums = useFavoriteAlbumsStore(
    (state) => state.removeFavoriteAlbums
  );

  const addFav = (album: any) => {
    const favList = {
      albumId: album.albumId,
      id: album.id,
      title: album.title,
      url: album.url,
      thumbnailUrl: album.thumbnailUrl,
    };

    const existingFavorite = favoriteAlbums.find(
      (item) => item.id === album.id
    );

    if (existingFavorite) {
      removeFavoriteAlbums(album.id);
    } else {
      addFavoriteAlbums(favList);
    }
  };

  return (
    <>
      {albums.map((album) => (
        <div key={album.id}>
          <div>{album.albumId}</div>
          <div>{album.title}</div>
          <div>
            <img src={album.thumbnailUrl} />
            <button onClick={() => addFav(album)}>
              {favoriteAlbums.some((fav) => fav.id === album.id) ? (
                <FaHeart />
              ) : (
                <FaRegHeart />
              )}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default AlbumPage;
