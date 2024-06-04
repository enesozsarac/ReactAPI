import { useLoaderData } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

interface PostProps {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

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


  const addFav = (post: any) => {
    console.log(post.id)
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.id}</p>
          <p>{post.name}</p>
          <p>{post.email}</p>
          <p>{post.body}</p>
          <button onClick={() => addFav(post)}>
            <FaRegHeart />
          </button>
        </div>
      ))}
    </>
  );
}

export default PostPage;
