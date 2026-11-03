
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bank-3uq1.onrender.com";

interface LoginResponse {
  resultCode: number;
  resultMessage: string;
  data: Array<{
    account_id: number;
    email: string;
    firstname: string;
    lastname: string;
    status: string;
    created_at: string | null;
  }>;
  dataSize: number;
  action: string;
  curdate?: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
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
        body: JSON.stringify({
          action: "login",
          email: email.trim().toLowerCase(),
          passwordhash: password,
        }),
      });

      const data: LoginResponse = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        setMessage("Серверийн алдаа гарлаа. Дахин оролдоно уу.");
        return;
      }

      if (data.resultCode !== 200) {
        setMessage(
          data.resultMessage ||
            "Имэйл эсвэл нууц үг буруу байна."
        );
        return;
      }

      if (!Array.isArray(data.data) || data.data.length === 0) {
        setMessage("Хэрэглэгчийн мэдээлэл олдсонгүй.");
        return;
      }

      const user = data.data[0];

      sessionStorage.setItem(
        "bank3_user",
        JSON.stringify(user)
      );

      router.push("/home");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setMessage(
        "Сервертэй холбогдож чадсангүй. Интернэт холболтоо шалгана уу."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-glow login-glow-one" />
      <div className="login-glow login-glow-two" />

      <section className="login-card">
        <div className="login-brand">
          <div className="brand-icon">B</div>
          <span>BANK3</span>
        </div>

        <div className="login-heading">
          <h1>Тавтай морил!</h1>
          <p>Өөрийн бүртгэлээр нэвтэрнэ үү.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Имэйл хаяг</label>

            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Нууц үг</label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Нууц үгээ оруулна уу"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={loading}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Нууц үг нуух" : "Нууц үг харах"
                }
              >
                {showPassword ? "Нуух" : "Харах"}
              </button>
            </div>
          </div>

          {message && (
            <div className="login-error" role="alert">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="login-spinner" />
                Түр хүлээнэ үү...
              </>
            ) : (
              "Нэвтрэх →"
            )}
          </button>
        </form>

        <div className="login-footer">
          <span>Шинэ хэрэглэгч үү?</span>
          <a href="/register">Бүртгүүлэх</a>
        </div>

        <div className="login-security">
          <span className="security-dot" />
          Таны мэдээлэл хамгаалагдсан
        </div>
      </section>
    </main>
  );
}
