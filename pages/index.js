import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "posts"));
      setPosts(snapshot.docs.map((doc) => doc.data()));
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog</h1>
      {posts.map((p, i) => (
        <div key={i}>
          <h2>{p.title}</h2>
          <p>{p.content}</p>
          {p.imageUrl && <img src={p.imageUrl} width="200" />}
        </div>
      ))}
    </div>
  );
}
