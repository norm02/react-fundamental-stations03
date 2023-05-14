import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Header } from "../../components/Header";
import "./SignIn.scss";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../authSlice";
import { url } from "../../const";
import { useForm } from "react-hook-form";

export const SignIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post(`${url}/signin`, { email: data.email, password: data.password })
      .then((res) => {
        setCookie("token", res.data.token);
        dispatch(signIn());
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      });
  };

  if (auth) return <Navigate to="/" replace />;

  return (
    <div>
      <Header />
      <main className="signin">
        <h2>サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email-input">メールアドレス</label>
          <br />
          <input
            id="email-input"
            type="email"
            placeholder="email"
            className="email-input"
            {...register("email", { required: true })}
          />
          {errors.email && <span>メールアドレスを入力してください。</span>}
          <br />
          <label htmlFor="password-input">パスワード</label>
          <br />
          <input
            id="password-input"
            type="password"
            placeholder="password"
            className="password-input"
            {...register("password", { required: true })}
          />
          {errors.password && <span>パスワードを入力してください。</span>}
          <br />
          <button type="submit" className="signin-button">
            サインイン
          </button>
        </form>
        <Link to="/signup">新規作成はこちら</Link>
      </main>
    </div>
  );
};
