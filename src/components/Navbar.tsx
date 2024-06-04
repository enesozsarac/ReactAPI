import { Link } from "react-router-dom";
import styled from "styled-components";
import useFavoriteAlbumsStore from "../stores/favorites";

const Nav = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  border-bottom: 2px solid #121212;
  & .link {
    text-decoration: none;
    font-weight: 600;
    color: #121212;
    border: 1px solid #121212;
    padding: 10px;
  }
`;

function Navbar() {
  const favoriteAlbums = useFavoriteAlbumsStore(
    (state) => state.favoriteAlbums
  );
  return (
    <>
      <Nav>
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/users">
          Users
        </Link>
        <Link className="link" to="/favorites">
          Favorites ({favoriteAlbums.length})
        </Link>
      </Nav>
    </>
  );
}

export default Navbar;
