import styled from "styled-components";
import { useFavoriteAlbumsStore } from "../stores/favorites";
import { Link } from "react-router-dom";

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

function FavoritesDetail() {
  const favoriteAlbums = useFavoriteAlbumsStore(
    (state) => state.favoriteAlbums
  );

  const removeFavoriteAlbums = useFavoriteAlbumsStore(
    (state) => state.removeFavoriteAlbums
  );

  const removeFav = (id: number) => {
    removeFavoriteAlbums(id);
  };

  return (
    <>
      {favoriteAlbums.map((item) => (
        <Card key={item.albumId}>
          <div>{item.id}</div>
          <div>{item.albumId}</div>
          <div>{item.title}</div>
          <div>
            <Link to={`/users/${item.albumId}/albums/${item.albumId}`}>
              <img src={item.thumbnailUrl} />
            </Link>
          </div>
          <button onClick={() => removeFav(item.id)}>Remove</button>
        </Card>
      ))}
    </>
  );
}

export default FavoritesDetail;
