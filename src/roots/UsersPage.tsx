import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px;
  gap: 20px;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #121212;
  gap: 20px;
  padding-block: 20px;
`;

const Btn = styled.button`
  padding: 10px;
  & .link {
    text-decoration: none;
    color: #121212;
  }
`;

export const usersLoader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return users;
};

function UsersPage() {
  const users = useLoaderData() as UserProps[];

  return (
    <>
      <Wrapper>
        {users.map((user) => (
          <Card key={user.id}>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <Btn>
              <Link className="link" to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </Btn>
          </Card>
        ))}
      </Wrapper>
    </>
  );
}

export default UsersPage;
