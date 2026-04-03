import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../firebase/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginAdmin(email, password);
      navigate("/admin");
    } catch (err) {
      setError("Невірний email або пароль");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrapper}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Вхід в адмінку</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Вхід..." : "Увійти"}
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "14px 16px",
    border: "none",
    borderRadius: "10px",
    background: "#111",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "crimson",
    margin: 0,
  },
};