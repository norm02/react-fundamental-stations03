import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../../const";
import { Header } from "../../components/Header";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { pageQuery } from "../../paginationSlice";
import { Link } from "react-router-dom";
import "./Home.scss";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [cookies] = useCookies();
  //useSelectorでstoreのstateを取得する
  const pagination = useSelector((state) => state.pagination.offset);
  const dispatch = useDispatch();

  //書籍レビュー一覧を取得する
  useEffect(() => {
    axios
      .get(`${url}/books?offset=${pagination}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pagination]);

  //paginationSliceのpageQueryをdispatchする
  //この時のpageはreact-paginateのpageオブジェクト
  const handlePaginate = (page) => {
    try {
      dispatch(pageQuery(page.selected));
    } catch (err) {
      console.log(err);
    }
  };

  //書籍レビューの詳細ページに遷移する際に、ログを送信する
  const sendLog = async (logid) => {
    const selectID = { selectBookId: logid };
    await axios
      .post(`${url}/logs`, selectID, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <Header />
      <button className="home-post-review--button">
        <Link to="/new" className="post-review--link">
          書籍レビュー登録
        </Link>
      </button>
      <br />
      <label className="home-label">書籍レビュー一覧</label>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={5}
        marginPagesDisplayed={4}
        pageRangeDisplayed={2}
        onPageChange={handlePaginate}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        previousClassName={"pagination__previous"}
        nextClassName={"pagination__next"}
        disabledClassName={"pagination__disabled"}
      />
      <ul className="book-review--lists">
        {books.map((book) => (
          <li className="book-review_id--border" key={book.id}>
            <Link
              onClick={() => sendLog(book.id)}
              to={`/detail/${book.id}`}
              state={{ selectBookID: book.id }}
              className="book-review--link"
            >
              <p className="book-review_title--18px">タイトル：{book.title}</p>
              {/*
              <p className="book-review_url--12px">URL:{book.url}</p>
              */}
              <p className="book-review_reviewer--16px">
                レビュワー：{book.reviewer}
              </p>
              <p className="book-review_review--16px">
                レビュー概要：{book.review}
              </p>
              {/*
              <p className="book-review_detail--16px">
                レビュー詳細：{book.detail}
              </p>
              */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
