import { Tab, Tabs } from "react-bootstrap";
import { Link, useLoaderData, useParams } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface AlbumProps {
  userId: number;
  id: number;
  title: string;
}

interface TodoProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Wrapper = styled.div`
  color: #eee;

  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Card = styled.div`
  margin-top: 20px;
  text-align: center;
  & p {
    margin-bottom: 10px;
  }
`;

const Btn = styled.div`
  & .link {
    padding: 10px 25px;
    border: 1px solid #eee;
    text-decoration: none;
    color: #eee;
    border-radius: 10px;
  }
  & .link:hover {
    color: #131313;
    background-color: #eee;
  }
`;

const Block = styled.div`
  color: #eee;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #eee;
  margin: 20px;
  border-radius: 10px;
`;

export const userLoader = async ({ params }: any) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const user = await response.json();
  console.log(user);
  return user;
};

function UserDetail() {
  const user = useLoaderData() as UserProps;
  const { userId } = useParams();
  const [postData, setPostData] = useState<PostProps[]>([]);
  const [albumData, setAlbumData] = useState<AlbumProps[]>([]);
  const [todoData, setTodoData] = useState<TodoProps[]>([]);

  async function fetchPostData() {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
    const json = await response.json();
    setPostData(json);
  }

  async function fetchAlbumData() {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/albums`
    );
    const json = await response.json();
    setAlbumData(json);
  }

  async function fetchTodoData() {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
    const json = await response.json();
    setTodoData(json);
  }

  useEffect(() => {
    fetchPostData();
    fetchAlbumData();
    fetchTodoData();
  }, []);

  return (
    <>
      <Wrapper>
        <Card>
          <p>{user.name}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </Card>
      </Wrapper>

      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="post" title="Post">
          {postData.map((item) => (
            <Block key={item.id}>
              <div>
                <div>{item.title}</div>
                <div>{item.body}</div>
              </div>
              <Btn>
                <Link className="link" to={`/users/${userId}/posts/${item.id}`}>
                  Git
                </Link>
              </Btn>
            </Block>
          ))}
        </Tab>
        <Tab eventKey="album" title="Album">
          {albumData.map((item) => (
            <Block key={item.id}>
              <div>{item.title}</div>
              <Btn>
                <Link
                  className="link"
                  to={`/users/${userId}/albums/${item.id}`}
                >
                  Git
                </Link>
              </Btn>
            </Block>
          ))}
        </Tab>
        <Tab eventKey="todos" title="Todos">
          {todoData.map((item) => (
            <Block key={item.id}>
              <div>{item.title}</div>
              <div>{item.completed ? "✓" : "✘"}</div>
            </Block>
          ))}
        </Tab>
      </Tabs>
    </>
  );
}

export default UserDetail;
