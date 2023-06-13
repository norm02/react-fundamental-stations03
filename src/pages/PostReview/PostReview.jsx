import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { url } from "../../const";
import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";
import "./PostReview.scss";

export const PostReview = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [errorMessage, setErrorMessge] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    axios
      .post(`${url}/books`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessge(`書籍レビュー投稿に失敗しました。 ${err}`);
      });
  };

  return (
    <div>
      <Header />
      <main className="post-review">
        <label className="new-post-review-label">書籍レビュー登録</label>
        <p className="new-post-review-error-message">{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>書籍タイトル</label>
          <input
            type="text"
            className="new-post-review-title-input"
            {...register("title", { required: true })}
          />
          {errors.title && <span>書籍タイトルを入力してください。</span>}
          <br />
          <label>書籍URL</label>
          <input
            type="text"
            className="new-post-review-url-input"
            {...register("url", { required: true })}
          />
          {errors.url && <span>書籍URLを入力してください。</span>}
          <br />
          <label>書籍レビュー概要</label>
          <input
            type="text"
            className="new-post-review-review-input"
            {...register("review", { required: true })}
          />
          {errors.review && <span>書籍レビュー概要を入力してください。</span>}
          <label>書籍レビュー詳細</label>
          <input
            type="text"
            className="new-post-review-detail-input"
            {...register("detail", { required: true })}
          />
          {errors.detail && <span>書籍レビュー詳細を入力してください。</span>}
          <br />
          <button className="new-post-review-button" type="submit">
            投稿
          </button>
        </form>
      </main>
    </div>
  );
};
