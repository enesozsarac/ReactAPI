import { useFavoriteAlbumsStore } from "../stores/favorites";

function FavoritesDetail() {
  const favoriteAlbums = useFavoriteAlbumsStore(
    (state) => state.favoriteAlbums
  );
  return (
    <>
      {favoriteAlbums.map((item) => (
        <div key={item.albumId}>
          <div>{item.id}</div>
          <div>{item.albumId}</div>
          <div>
            <img src={item.thumbnailUrl} />
          </div>
        </div>
      ))}
    </>
  );
}

export default FavoritesDetail;
