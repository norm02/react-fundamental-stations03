
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../const";
import { signOut } from "../authSlice";
import "./Header.scss";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userName,setUserName] = useState();
  const [iconUrl,setIconUrl] = useState();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/login");
  };
  const handleSignIn = () => {
    navigate("/login");
  };
useEffect(() => {
  if(auth==true){
    axios
      .get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setUserName(res.data.name);
        setIconUrl(res.data.iconUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }},[]);
  return (
    <header className="header">
      <h1>書籍レビューアプリ</h1>
      {auth ? (
        <div className="user-status">
          <Link className="profile-link" to="/profile">プロフィール編集</Link>
          <p className="user-name">ユーザー名：{userName}</p>
          <button onClick={handleSignOut} className="sign-out-button">
            サインアウト
          </button>
          <img src = {iconUrl} className="user-icon"></img>
        </div>  
      ) : (
        <div>
        <div className="user-status">
        <button onClick={handleSignIn} className="sign-in-button">
          サインイン
        </button>
        </div>
        </div>
      )}
    </header>
  );
};
