import React, { useState } from "react";
import axios from "axios";
import { url } from "../../const";
import { Header } from "../../components/Header";
import "./Home.scss";

export const Home = () => {
  const [books, setBooks] = useState([]);

  // 書籍一覧取得APIを呼び出す
  axios
    .get(`${url}/public/books`)
    .then((res) => {
      setBooks(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div>
      <Header />
      <label className="home-label">書籍レビュー一覧</label>
      <ul className="book-review--lists">
        {books.map((book) => (
          <li className="book-review_id--border" key={book.id}>
            <p className="book-review_title--18px">タイトル：{book.title}</p>
            <p className="book-review_url--12px">URL:{book.url}</p>
            <p className="book-review_reviewer--16px">
              レビュワー：{book.reviewer}
            </p>
            <p className="book-review_review--16px">
              レビュー概要：{book.review}
            </p>
            <p className="book-review_detail--16px">
              レビュー詳細：{book.detail}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
