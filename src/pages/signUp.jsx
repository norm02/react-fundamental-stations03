import axios from "axios";
import { useState } from "react";
import Compressor from "compressorjs";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { signIn } from "../authSlice";
import { Header } from "../components/Header";
import { url } from "../const";
import { Link } from "react-router-dom";
import "./SignUp.scss";
import { useForm } from "react-hook-form";

export const SignUp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessge] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${url}/users`, {
        name: data.email,
        email: data.name,
        password: data.password,
      })
      .then((res) => {
        const token = res.data.token;
        dispatch(signIn());
        setCookie("token", token);
        navigate("/");
      });

    const image = selectedFile[0];
    if (!image) {
      return;
    }
    new Compressor(image, {
      quality: 0.8,
      success: (compressedResult) => {
        console.log("compressedResult", compressedResult);
        const formData = new FormData();
        formData.append("icon", selectedFile);
        axios
          .post(`${url}/uploads`, formData, {
            headers: {
              Authorization: `Bearer ` + cookies.token,
            },
          })
          .then(() => {
            console.log("Upload success");
            axios
              .post(`${url}/users`, {
                name: data.name,
                email: data.email,
                password: data.password,
              })
              .then((res) => {
                const token = res.data.token;
                dispatch(signIn());
                setCookie("token", token);
                navigate("/");
              });
          })
          .catch((err) => {
            setErrorMessge(`サインアップに失敗しました。 ${err}`);
          });
      },
    });
  };
  if (auth) return <Navigate to="/" replace />;

  const fileset = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

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
            accept=".jpg, .png"
            type="file"
            onChange={fileset}
          />
          <button type="submit" className="signup-button">
            作成
          </button>
        </form>
        <p>
          アカウントをお持ちですか？
          <Link to="/login">ログインはこちら</Link>
        </p>
      </main>
    </div>
  );
};
