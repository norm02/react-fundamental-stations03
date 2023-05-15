import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
import { NotFound } from "../pages/NotFound";

export const AppRouter = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {auth ? (
            // ルートディレクトリはあくまでHomeページ、ただしHomeページにアクセスするにはサインインが必要
            // サインインが成功したら、Homeページにリダイレクトする
            // サインアップが成功したら、(SignUp.jsx内で)サインインをした上でHomeページにリダイレクトする
            <>
              <Route index element={<Home />} />
              <Route path="/login" element={<Navigate replace to={"/"} />} />
              <Route path="/signup" element={<Navigate replace to={"/"} />} />
            </>
          ) : (
            // サインインが成功していない場合、ルートディレクトリにアクセスしてもLoginページにリダイレクトする
            // サインインとサインアップができていない場合、それぞれのページにアクセスする
            <>
              <Route path="/" element={<Navigate replace to={"/login"} />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
          {
            // どのルーティングにも当てはまらない場合：NotFoundページを表示する
          }
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
