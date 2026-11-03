
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./register.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bank-3uq1.onrender.com";

interface RegisterResponse {
  resultCode: number;
  resultMessage: string;
  data: Array<Record<string, unknown>>;
  dataSize: number;
}

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setMessage("");

    if (Object.values(form).some((value) => !value.trim())) {
      setMessage("Бүх талбарыг бөглөнө үү.");
      return;
    }

    if (form.password.length < 8) {
      setMessage("Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Нууц үгнүүд таарахгүй байна.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "register",
          firstname: form.firstname.trim(),
          lastname: form.lastname.trim(),
          email: form.email.trim().toLowerCase(),
          passwordhash: form.password,
        }),
      });

      const data: RegisterResponse = await response.json();

      console.log("REGISTER RESPONSE:", data);

      if (!response.ok) {
        setMessage("Серверийн алдаа гарлаа. Дахин оролдоно уу.");
        return;
      }

      if (data.resultCode === 200) {
        setMessage("Бүртгэл амжилттай үүслээ. Нэвтрэх хуудас руу шилжиж байна.");

        setForm({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          router.push("/");
        }, 1200);

        return;
      }

      if (data.resultCode === 1008) {
        setMessage("Энэ имэйл хаяг өмнө нь бүртгэгдсэн байна.");
        return;
      }

      setMessage(
        data.resultMessage || "Бүртгэл үүсгэхэд алдаа гарлаа."
      );
    } catch (error) {
      console.error("REGISTER API ERROR:", error);
      setMessage("Сервертэй холбогдож чадсангүй.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="register-page">
      <div className="register-card">

        <Link href="/" className="register-brand">
          <span className="register-brand-mark">B</span>
          BANK3
        </Link>

        <div className="register-heading">
          <h1>Бүртгэл үүсгэх</h1>
          <p>Шинэ хэрэглэгчээр бүртгүүлнэ үү.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="register-name-row">
            <div className="register-field">
              <label htmlFor="firstname">Нэр</label>
              <input
                id="firstname"
                name="firstname"
                placeholder="Нэр"
                value={form.firstname}
                onChange={updateField}
                autoComplete="given-name"
                disabled={loading}
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="lastname">Овог</label>
              <input
                id="lastname"
                name="lastname"
                placeholder="Овог"
                value={form.lastname}
                onChange={updateField}
                autoComplete="family-name"
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="register-field">
            <label htmlFor="email">Имэйл хаяг</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={updateField}
              autoComplete="email"
              disabled={loading}
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="password">Нууц үг</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="8-аас дээш тэмдэгт"
              value={form.password}
              onChange={updateField}
              autoComplete="new-password"
              disabled={loading}
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="confirmPassword">Нууц үг давтах</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Нууц үгээ дахин оруулна уу"
              value={form.confirmPassword}
              onChange={updateField}
              autoComplete="new-password"
              disabled={loading}
              required
            />
          </div>

          {message && (
            <p className="register-message" role="alert">
              {message}
            </p>
          )}

          <button
            className="register-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Бүртгэж байна..." : "Бүртгүүлэх →"}
          </button>
        </form>

        <div className="register-bottom">
          Бүртгэлтэй юу?{" "}
          <Link href="/" className="register-link">
            Нэвтрэх
          </Link>
        </div>

      </div>
    </main>
  );
}
