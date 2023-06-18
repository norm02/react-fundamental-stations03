import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./EditReview.scss";
import { url } from "../../const";

export const EditReview = () => {
  const { id } = useParams();
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessge] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // レビューを取得する
  useEffect(() => {
    axios
      .get(`${url}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        if (res.data.isMine) {
          reset({
            title: res.data.title,
            url: res.data.url,
            detail: res.data.detail,
            review: res.data.review,
          });
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, cookies.token]);

  // レビューを更新する
  const onSubmit = (data) => {
    axios
      .put(`${url}/books/${id}`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        reset({
          title: res.data.title,
          url: res.data.url,
          detail: res.data.detail,
          review: res.data.review,
        });
        console.log(res);
        navigate("/detail/:id");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessge("エラーが発生しました。もう一度お試しください。");
      });
  };
  //書籍レビューを削除する
  const deleteReview = () => {
    axios
      .delete(`${url}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      });
  };

  return (
    <div>
      <Header />
      <main className="edit-review">
        <label className="edit-review--label">書籍レビュー編集</label>
        <p className="edit-review--error-message">{errorMessage}</p>
        <form className="edit-review-form" onSubmit={handleSubmit(onSubmit)}>
          <label>書籍タイトル</label>
          <input
            type="text"
            className="edit-review--title-input"
            {...register("title", { required: true })}
          />
          {errors.title && <span>書籍タイトルを入力してください。</span>}
          <br />
          <label>書籍URL</label>
          <input
            type="text"
            className="edit-review--url-input"
            {...register("url", { required: true })}
          />
          {errors.url && <span>書籍URLを入力してください。</span>}
          <br />
          <label>書籍レビュー概要</label>
          <input
            type="text"
            className="edit-review--review-input"
            {...register("review", { required: true })}
          />
          {errors.review && <span>書籍レビュー概要を入力してください。</span>}
          <br />
          <label>書籍レビュー詳細</label>
          <input
            type="text"
            className="edit-review--detail-input"
            {...register("detail", { required: true })}
          />
          {errors.detail && <span>書籍レビュー詳細を入力してください。</span>}
          <br />
          <button type="submit" className="edit-review--submit-button">
            更新
          </button>
          <button
            type="button"
            className="edit-review--delete-button"
            onClick={deleteReview}
          >
            削除
          </button>
        </form>
      </main>
    </div>
  );
};
