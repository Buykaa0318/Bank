
"use client";

import { useState } from "react";
import Link from "next/link";
import "./login.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Имэйл болон нууц үгээ оруулна уу.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || "Нэвтрэхэд алдаа гарлаа.");
        return;
      }

      sessionStorage.setItem("bank3_user", JSON.stringify(data.user));
      window.location.href = "/home";
    } catch (error) {
  console.error("LOGIN API ERROR:", error);

  setMessage(
    error instanceof Error
      ? error.message
      : "Тодорхойгүй алдаа гарлаа."
  );
} finally {
  setLoading(false);
}
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <Link href="/" className="brand">
          <span className="brand-mark">B</span>
          BANK3
        </Link>

        <div className="login-heading">
          <h1>Тавтай морил!</h1>
          <p>Өөрийн бүртгэлээр нэвтэрнэ үү.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Имэйл хаяг</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Нууц үг</label>
            <input
              id="password"
              type="password"
              placeholder="Нууц үгээ оруулна уу"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {message && (
            <p className="login-message" role="alert">{message}</p>
          )}

          <button className="primary-button" disabled={loading}>
            {loading ? "Нэвтэрч байна..." : "Нэвтрэх →"}
          </button>
        </form>

        <div className="auth-bottom">
          Шинэ хэрэглэгч үү?{" "}
          <Link href="/register" className="text-link">
            Бүртгүүлэх
          </Link>
        </div>
      </div>
    </main>
  );
}
