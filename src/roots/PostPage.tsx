import { useLoaderData } from "react-router-dom";

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

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.postId}</p>
          <p>{post.name}</p>
          <p>{post.email}</p>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  );
}

export default PostPage;
