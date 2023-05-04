import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signUp">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
