
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/login");
  };
  const handleSignIn = () => {
    navigate("/login");
  };
  //users/のAPIを叩いて、nameとiconUrlが取得できるため、nameを表示する
  /*
useEffect(() => {
    axios
      .get(`${url}/users/`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setUserName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  },[cookies.token]);
*/
  return (
    <header className="header">
      <h1>書籍レビューアプリ</h1>
      {auth ? (
        <div>
          <div className="user-name">
          </div>
          <button onClick={handleSignOut} className="sign-out-button">
            サインアウト
          </button>
        </div>
      ) : (
        <button onClick={handleSignIn} className="sign-in-button">
          サインイン
        </button>
      )}
    </header>
  );
};
