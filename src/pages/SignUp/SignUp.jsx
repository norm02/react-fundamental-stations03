import axios from "axios";
import { useState } from "react";
import Compressor from "compressorjs";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { signIn } from "../../authSlice";
import { Header } from "../../components/Header";
import { url } from "../../const";
import { Link } from "react-router-dom";
import "./SignUp.scss";
import { useForm } from "react-hook-form";

export const SignUp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessge] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //ユーザー作成ができてから、トークンを取得し、Cookieに保存する
  //そうでないと、Cookieにトークンが保存されない上に、画像のUploadsへのリクエストが401エラーになる
  const onSubmit = async (data) => {
    //APIのusersにPOSTリクエストを送る
    await axios
      .post(`${url}/users`, {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        //POSTリクエストのレスポンスからトークンを取得
        const token = res.data.token;
        //dispatchし、authSliceのisSignInをtrueにする（ログイン状態にする）
        dispatch(signIn());
        //Cookieにトークンを保存
        setCookie("token", token);
        console.log(image);
        if (!image) {
          return;
        }
        // 画像を圧縮して送信
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
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
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
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      });
  };
  //ユーザーが既にログインしていたら、トップページにリダイレクト
  if (auth) return <Navigate to="/" replace />;

  return (
    <div>
      <Header />
      <main className="signup">
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <label>メールアドレス</label>
          <br />
          <input
            type="email"
            className="email-input"
            {...register("email", { required: true })}
          />
          {errors.email && <span>メールアドレスを入力してください。</span>}
          <br />
          <label>ユーザ名</label>
          <br />
          <input
            type="text"
            className="name-input"
            {...register("name", { required: true })}
          />
          {errors.name && <span>ユーザ名を入力してください。</span>}
          <br />
          <label>パスワード</label>
          <br />
          <input
            type="password"
            className="password-input"
            {...register("password", { required: true })}
          />
          {errors.password && <span>パスワードを入力してください。</span>}
          <br />
          <label>ユーザーアイコン</label>
          <br />
          <input
            className="icon-input"
            accept="image/png,image/jpg"
            type="file"
            onChange={handleImageChange}
          />
          <button type="submit" className="signup-button">
            作成
          </button>
        </form>
        <p className="login-link">
          アカウントをお持ちですか？
          <Link to="/login">ログインはこちら</Link>
        </p>
      </main>
    </div>
  );
};
