import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import logo from "./logo.png"
const Header = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      setUser(null);
    }).catch((error) => {
      console.log("Error during logout:", error);
    });
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img className="header__icon" src={logo} />
        </Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span>
        </Link>
      </div>
      <div className="headerRight">
        {!user ? (
          <>
            <Link to="/SignUp" style={{ textDecoration: "none" }}>
              <span>Sign Up</span>
            </Link>
            <Link to="/LogIn" style={{ textDecoration: "none" }}>
              <span>Login</span>
            </Link>
          </>
        ) : (
          <>
            {/* <span>{user.email}</span> */}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
