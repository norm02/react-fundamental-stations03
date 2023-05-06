import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { LogIn } from "../pages/LogIn";
import { SignUp } from "../pages/SignUp";
import { NotFound } from "../pages/NotFound";

export const AppRouter = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          {auth ? (
            <>
              {
                // authがtrueの場合：Home, NewTask, NewList, EditTask, EditListのルーティングを許可する
              }
              <Route index element={<Home />} />
            </>
          ) : (
            // authがfalseの場合：/signinにリダイレクトする
            <Route
              path="/*"
              element={<Navigate to="/signin" replace state={{ from: "*" }} />}
            />
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
