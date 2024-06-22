import styled from "styled-components";
import { useFavoriteAlbumsStore } from "../stores/favorites";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Card = styled.div`
  color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #eee;
  gap: 20px;
  padding-block: 20px;
  text-align: center;
  margin: 20px 20px;
  border-radius: 10px;
`;

const Btn = styled.div`
  padding: 10px 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  &:hover {
    background-color: #eee;
    & .trash {
      color: #131313;
      background-color: #eee;
    }
  }
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
          <Btn onClick={() => removeFav(item.id)}>
            <FaTrash className="trash" />
          </Btn>
        </Card>
      ))}
    </>
  );
}

export default FavoritesDetail;
