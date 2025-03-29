import Post from "@common/components/Post";
import styles from "./Homepage.module.css";
import { Suspense, use } from "react";
import { publicBlogAPI } from "@common/utils/blogAPI";
import { Post as PostData } from "@common/utils/types";
import Fallback from "@common/components/Fallback";

function Homepage() {
  const data = fetchPosts();

  return (
    <main className={styles.container}>
      <div>
        <h1>Lorem Ipsum</h1>
        <p>
          A blog about lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptatibus ut maxime maiores fugit numquam cupiditate eum adipisci omnis
          asperiores nemo, illum harum? Aliquid enim molestiae facilis! Molestias
          molestiae officiis perspiciatis.
        </p>
      </div>

      <Suspense fallback={<Fallback />}>
        <PostsSection dataPromise={data} />
      </Suspense>
    </main>
  );
}

interface FetchedData {
  posts: PostData[];
}

function PostsSection({ dataPromise }: { dataPromise: Promise<FetchedData> }) {
  const { posts } = use(dataPromise);

  return (
    <section className={styles.posts}>
      {posts.map((post, i) => (
        <Post {...post} key={i} />
      ))}
    </section>
  );
}

const fetchPosts: () => Promise<FetchedData> = async () => {
  const res = await publicBlogAPI.getPublishedPosts();
  if (!res.ok) throw res;
  return await res.json();
};

export default Homepage;
