from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# DB 초기화
def init_db():
    conn = sqlite3.connect("blog.db")
    c = conn.cursor()

    c.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT
    )
    """)

    conn.commit()
    conn.close()

init_db()

# 회원가입
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    conn = sqlite3.connect("blog.db")
    c = conn.cursor()

    c.execute(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        (data["email"], data["password"])
    )

    conn.commit()
    conn.close()

    return jsonify({"ok": True})


# 글쓰기
@app.route("/posts", methods=["POST"])
def create_post():
    data = request.json

    conn = sqlite3.connect("blog.db")
    c = conn.cursor()

    c.execute(
        "INSERT INTO posts (title, content) VALUES (?, ?)",
        (data["title"], data["content"])
    )

    conn.commit()
    conn.close()

    return jsonify({"ok": True})


# 글 목록
@app.route("/posts", methods=["GET"])
def get_posts():
    conn = sqlite3.connect("blog.db")
    c = conn.cursor()

    c.execute("SELECT * FROM posts")
    rows = c.fetchall()

    conn.close()

    return jsonify([
        {"id": r[0], "title": r[1], "content": r[2]}
        for r in rows
    ])


if __name__ == "__main__":
    app.run(debug=True)