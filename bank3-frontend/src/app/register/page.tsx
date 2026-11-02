
"use client";

import { useState } from "react";
import Link from "next/link";
import "./register.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  function updateField(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    setMessage("Бүртгэлийн API холболт хүлээгдэж байна.");
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
              required
            />
          </div>

          {message && (
            <p className="register-message" role="alert">
              {message}
            </p>
          )}

          <button className="register-button" type="submit">
            Бүртгүүлэх →
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
