import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../../const";
import { Header } from "../../components/Header";
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import { pageQuery } from "../../paginationSlice";
import "./Home.scss";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [cookies] = useCookies();
  //useSelectorでstoreのstateを取得する
  const pagination = useSelector((state) => state.pagination.offset)
  const dispatch = useDispatch()
  //書籍レビュー一覧を取得する
  useEffect(()=>{
  axios
    .get(`${url}/books?offset=${pagination}`, {
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
    })},[pagination])

    //paginationSliceのpageQueryをdispatchする
    //この時のpageはreact-paginateのpageオブジェクト
    const handlePaginate = (page) =>{
      try{
        dispatch(pageQuery(page.selected))
      }catch(err){
        console.log(err)
      }
    }

  return (
    <div>
      <Header />
      <label className="home-label">書籍レビュー一覧</label>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={5}
        marginPagesDisplayed={4}
        pageRangeDisplayed={2}
        onPageChange={handlePaginate}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        previousClassName={'pagination__previous'}
        nextClassName={'pagination__next'}
        disabledClassName={'pagination__disabled'}
      />
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
          </li>)
)}
      </ul>
    </div>
  );
};