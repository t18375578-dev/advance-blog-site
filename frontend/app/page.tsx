"use client";

import { useState } from "react";

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const savePost = () => {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");

    const newPost = {
      id: Date.now(),
      title,
      content,
    };

    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("저장 완료!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>글쓰기</h1>

      <input
        placeholder="제목"
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <textarea
        placeholder="내용"
        onChange={(e) => setContent(e.target.value)}
      />

      <br />

      <button onClick={savePost}>저장</button>
    </div>
  );
}