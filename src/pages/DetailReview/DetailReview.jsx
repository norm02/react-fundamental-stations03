import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import "./DetailReview.scss";
import { url } from "../../const";

export const DetailReview = () => {
  const { id } = useParams();
  const [cookies] = useCookies();
  const [detailReview, setDetailReview] = useState([]);
  const [loading, setLoading] = useState(true);

  // 書籍レビュー詳細画面に詳細情報を表示
  useEffect(() => {
    setLoading(false);
    axios
      .get(`${url}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setDetailReview(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, cookies.token]);

  return (
    <div className="detail-review">
      <Header />
      <label className="detail-review--label">書籍レビュー詳細</label>
      {loading ? (
        <div className="detail-review--loading">
          <BeatLoader size="20" color="green" />
        </div>
      ) : (
        <ul className="detail-review--lists">
          <li className="detail-review--id" key={detailReview.id}>
            <p className="detail-review--title">
              タイトル：{detailReview.title}
            </p>
            <p className="detail-review--url">URL:{detailReview.url}</p>
            <p className="detail-review--review">
              レビュー概要：{detailReview.review}
            </p>
            <p className="detail-review--detail">
              レビュー詳細：{detailReview.detail}
            </p>
            <p className="detail-review--reviewer">
              レビュワー：{detailReview.reviewer}
            </p>
          </li>
        </ul>
      )}
    </div>
  );
};
