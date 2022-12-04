import React from "react";
import { useEffect, useState } from "react";
import { Auth } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserConsumer, UserContext } from "../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, setUser } = useContext(UserContext);

  let navigate = useNavigate();

  useEffect(() => {}, [email, password]);

  const HandleSubmit = (e) => {
    e.preventDefault();
    Auth(email, password).then((res) => {
      if (res.data?.id) {
        setUser(res.data);
        navigate("/admin");
      } else {
        setError("Email ou mot de passe incorrect");
        EmptyError();
      }
    });
  };

  const EmptyError = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  return (
    <div className="login-container">
      <div className="header"></div>
      <div className="content">
        <main>
          <div className="container-login">
            <div className="container-form">
              <div className="container-title">
                <h1>Connexion</h1>
              </div>
              <div className="container-input">
                {error && <p className="error">{error}</p>}
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Mot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="container-button-login">
                <button
                  type="submit"
                  onClick={(e) => HandleSubmit(e)}
                  style={{
                    backgroundColor:
                      email.length > 0 && password.length > 0
                        ? "#362a89"
                        : null,
                  }}
                >
                  Connexion
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
