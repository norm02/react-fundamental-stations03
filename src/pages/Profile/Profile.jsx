import { useEffect,useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate} from "react-router-dom";
import { Header } from "../../components/Header";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../authSlice";
import { url } from "../../const";
import { useForm } from "react-hook-form";

export const EditProfile = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(()=>{
    axios
      .get(`${url}/users`,{
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "multipart/form-data",
}}
      )
      .then((res)=>{
        reset({"name":res.data.name})
      })
      .catch((err)=>{
        console.log(err)
      })
  },[])

  const onSubmit = async (data) => {
    await axios
      .put(`${url}/users`,data ,{
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "multipart/form-data",
  }})
      .then((res) => {
        setCookie("token", res.data.token);
        dispatch(signIn());
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`編集に失敗しました${err}`);
      });
  };

  return (
    <div>
      <Header />
      <main className="profile-edit">
        <h2>サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="profile-input">ユーザー名</label>
          <br />
          <input
            id="profile-input"
            type="text"
            className="profile-input"
            {...register("name", { required: true })}
          />
          {errors.name && <span>ユーザー名を入力してください</span>}
          <br />
          <label htmlFor="password-input">パスワード</label>
          <br />
          <button type="submit" className="profile-button">
            更新
          </button>
        </form>
      </main>
    </div>
  );
};
