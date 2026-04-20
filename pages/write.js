import { useState } from "react";
import { db, auth } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_PRESET");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const submit = async () => {
    const user = auth.currentUser;
    if (!user) return alert("로그인 필요");

    let imageUrl = "";
    if (file) imageUrl = await uploadImage();

    await addDoc(collection(db, "posts"), {
      title,
      content,
      imageUrl,
      authorId: user.uid,
      createdAt: new Date(),
    });

    alert("작성 완료");
  };

  return (
    <div>
      <h1>Write</h1>
      <input onChange={(e) => setTitle(e.target.value)} placeholder="title" />
      <textarea onChange={(e) => setContent(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={submit}>작성</button>
    </div>
  );
}
