import { useLoaderData } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useFavoriteAlbumsStore } from "../stores/favorites";
import styled from "styled-components";

interface AlbumProps {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #121212;
  gap: 20px;
  padding-block: 20px;
  text-align: center;
  margin: 20px 20px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Btn = styled.button`
  padding: 10px 20px;
`;

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
        <Card key={album.id}>
          <div>{album.id}</div>
          <div>{album.title}</div>
          <CardBody>
            <img src={album.thumbnailUrl} />
            <Btn onClick={() => addFav(album)}>
              {favoriteAlbums.some((fav) => fav.id === album.id) ? (
                <FaHeart />
              ) : (
                <FaRegHeart />
              )}
            </Btn>
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default AlbumPage;
