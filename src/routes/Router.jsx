import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { NotFound } from "../pages/NotFound";

export const AppRouter = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {auth ? (
            <>
              {
                // authがtrueの場合：Homeのルーティングを許可する
              }
              <Route index element={<Home />} />
            </>
          ) : (
            // authがfalseの場合：/loginにリダイレクトする
            <Route
              path="/*"
              element={<Navigate to="/login" replace state={{ from: "*" }} />}
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
