import { Link } from "react-router-dom";
import { Header } from "components/Header";
import "Home.scss";

export const Home = () => {
  return (
    <>
      <Header />
      <nav>
        <ul>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
