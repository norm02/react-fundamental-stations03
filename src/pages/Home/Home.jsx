import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../../const";
import { Header } from "../../components/Header";
import "./Home.scss";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [cookies] = useCookies();
  //書籍レビュー一覧を取得する
  axios
    .get(`${url}/books`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
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
