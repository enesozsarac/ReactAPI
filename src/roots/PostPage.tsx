import { useLoaderData } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useFavoritePostsStore } from "../stores/favorites";
import styled from "styled-components";

interface PostProps {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
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

const Btn = styled.button`
  padding: 10px 20px;
`;

export const postLoader = async ({ params }: any) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`
  );
  const post = await response.json();
  console.log(post);
  return post;
};

function PostPage() {
  const posts = useLoaderData() as PostProps[];

  const favoritePost = useFavoritePostsStore((state) => state.favoritePost);
  const addFavoritePosts = useFavoritePostsStore(
    (state) => state.addFavoritePosts
  );

  const removeFavoritePosts = useFavoritePostsStore(
    (state) => state.removeFavoritePosts
  );

  const addFav = (post: any) => {
    const favListPost = {
      postId: post.postId,
      id: post.id,
      name: post.name,
      email: post.email,
      body: post.body,
    };

    const existingFavorite = favoritePost.find((item) => item.id === post.id);

    if (existingFavorite) {
      removeFavoritePosts(post.id);
    } else {
      addFavoritePosts(favListPost);
    }
  };

  return (
    <>
      {posts.map((post) => (
        <Card key={post.id}>
          <p>{post.id}</p>
          <p>{post.name}</p>
          <p>{post.email}</p>
          <p>{post.body}</p>
          <Btn onClick={() => addFav(post)}>
            {favoritePost.some((fav) => fav.id === post.id) ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}
          </Btn>
        </Card>
      ))}
    </>
  );
}

export default PostPage;
