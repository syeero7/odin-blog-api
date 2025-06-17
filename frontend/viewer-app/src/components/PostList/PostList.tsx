import Post from "@shared/components/Post";
import { type Post as PostData } from "@shared/utils/types";
import { useLoaderData } from "react-router-dom";
import styles from "./PostList.module.css";

function PostList() {
  const { posts } = useLoaderData<{ posts: PostData[] }>();

  return (
    <main className={styles.container}>
      {posts.length ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className={styles.listItem}>
              <Post {...post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noPost}>No posts available</p>
      )}
    </main>
  );
}

export default PostList;
