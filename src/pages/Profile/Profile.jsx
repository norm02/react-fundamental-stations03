import { useEffect, useState } from "react";
import Compressor from "compressorjs";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import "./Profile.scss";
import { url } from "../../const";
import { useForm } from "react-hook-form";

export const EditProfile = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        reset({ name: res.data.name });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = async (data) => {
    if (image === null || data.name === cookies.name) {
      setErrorMessage("ユーザー名またはアイコン画像を変更してください");
      return;
    }
    new Compressor(image, {
      quality: 0.4,
      success: (result) => {
        // 送信用のフォームデータを作成
        const formData = new FormData();
        formData.append("icon", result);
        console.log(formData.get("icon"));
        // フォームデータをAPIのuploadsに送信
        axios
          .post(`${url}/uploads`, formData, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          })
          .then(() => {
            console.log("Upload Success");
            navigate("/");
          });
      },
      error(err) {
        console.log(err.message);
      },
    });
    //APIのusersにPUTリクエストを送る
    await axios
      .put(`${url}/users`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        reset({ name: res.data.name });
        navigate("/");
        console.log(res.data);
      })
      .catch((err) => {
        setErrorMessage(`編集に失敗しました${err}`);
      });
  };
  return (
    <div>
      <Header />
      <main className="profile-edit">
        <h2>プロフィール編集</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
          <br />
          <label htmlFor="profile-username">ユーザー名</label>
          <br />
          <input
            id="profile-input"
            type="text"
            className="profile-input"
            {...register("name", { required: true })}
          />
          {errors.name && <span>ユーザー名を入力してください</span>}
          <br />
          <label htmlFor="profile-image">アイコン画像</label>
          <br />
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button type="submit" className="profile-button">
            更新
          </button>
        </form>
      </main>
    </div>
  );
};
