
"use client";

import Link from "next/link";

import {
  House,
  Send,
  ReceiptText,
  UserRound,
  Bell,
  ArrowDownToLine,
  QrCode,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
} from "lucide-react";


const recentTransactions = [
  {
    title: "Цалин",
    subtitle: "Өнөөдөр · 09:20",
    amount: "+2,500,000 ₮",
    type: "income",
  },
  {
    title: "Батболд",
    subtitle: "Өчигдөр · 18:45",
    amount: "-100,000 ₮",
    type: "expense",
  },
  {
    title: "CU Mongolia",
    subtitle: "Өчигдөр · 14:30",
    amount: "-25,000 ₮",
    type: "expense",
  },
  {
    title: "Найздаа шилжүүлсэн",
    subtitle: "2026.10.06 · 12:20",
    amount: "-50,000 ₮",
    type: "expense",
  },
];


export default function HomePage() {

  return (
    <main className="web-app">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <Link href="/" className="brand">
          BANK<span>3</span>
        </Link>


        <div className="sidebar-section">

          <p className="sidebar-label">
            ҮНДСЭН
          </p>


          <Link
            href="/"
            className="side-link active"
          >
            <House
              size={18}
              strokeWidth={2}
            />

            <span>
              Нүүр
            </span>
          </Link>


          <Link
            href="/transfer"
            className="side-link"
          >
            <Send
              size={18}
              strokeWidth={2}
            />

            <span>
              Шилжүүлэг
            </span>
          </Link>


          <Link
            href="/transactions"
            className="side-link"
          >
            <ReceiptText
              size={18}
              strokeWidth={2}
            />

            <span>
              Гүйлгээний хуулга
            </span>
          </Link>

        </div>


        {/* SETTINGS */}

        <div className="sidebar-section">

          <p className="sidebar-label">
            ТОХИРГОО
          </p>


          <Link
            href="/profile"
            className="side-link"
          >
            <UserRound
              size={18}
              strokeWidth={2}
            />

            <span>
              Профайл
            </span>
          </Link>

        </div>

      </aside>


      {/* =========================
          MAIN
      ========================= */}

      <div className="main-area">


        {/* TOPBAR */}

        <header className="topbar">

          <div className="mobile-brand">
            BANK<span>3</span>
          </div>


          <div className="topbar-right">

            <button className="icon-button">

              <Bell
                size={19}
                strokeWidth={2}
              />

            </button>


            <Link
              href="/profile"
              className="top-profile"
            >

              <div className="top-avatar">
                Б
              </div>


              <div className="top-user">

                <strong>
                  Батболд
                </strong>

                <span>
                  Харилцагч
                </span>

              </div>

            </Link>

          </div>

        </header>


        {/* =========================
            CONTENT
        ========================= */}

        <section className="web-content">


          {/* HEADING */}

          <div className="home-heading">

            <p>
              Тавтай морил
            </p>

            <h1>
              Сайн байна уу, Батболд 👋
            </h1>

          </div>


          {/* =========================
              BALANCE
          ========================= */}

          <section className="home-balance">

            <div className="home-balance-top">

              <span>
                Нийт үлдэгдэл
              </span>

              <span>
                Үндсэн данс
              </span>

            </div>


            <div className="home-balance-number">

              12,500,000

              <span>
                ₮
              </span>

            </div>


            <div className="home-balance-bottom">

              <span>
                1234 **** 5678
              </span>

              <span>
                ₮ Төгрөг
              </span>

            </div>

          </section>


          {/* =========================
              ACTIONS
          ========================= */}

          <section className="home-actions">

            <div className="home-section-title">

              <h2>
                Үйлдэл
              </h2>

            </div>


            <div className="home-action-grid">


              {/* TRANSFER */}

              <Link
                href="/transfer"
                className="home-action-card"
              >

                <div className="home-action-icon">

                  <Send
                    size={23}
                    strokeWidth={2}
                  />

                </div>


                <div>

                  <h3>
                    Шилжүүлэх
                  </h3>

                  <p>
                    Мөнгө шилжүүлэх
                  </p>

                </div>

              </Link>


              {/* MONEY OUT */}

              <Link
                href="/transfer"
                className="home-action-card"
              >

                <div className="home-action-icon">

                  <ArrowDownToLine
                    size={23}
                    strokeWidth={2}
                  />

                </div>


                <div>

                  <h3>
                    Мөнгө авах
                  </h3>

                  <p>
                    Дансаас мөнгө авах
                  </p>

                </div>

              </Link>


              {/* QPAY */}

              <button
                className="home-action-card"
                type="button"
              >

                <div className="home-action-icon qpay-icon">

                  <QrCode
                    size={27}
                    strokeWidth={2}
                  />

                </div>


                <div>

                  <h3>
                    QPay
                  </h3>

                  <p>
                    QR төлбөр хийх
                  </p>

                </div>

              </button>


            </div>

          </section>


          {/* =========================
              RECENT TRANSACTIONS
          ========================= */}

          <section className="home-transactions">


            <div className="home-section-title">

              <h2>
                Сүүлийн гүйлгээ
              </h2>


              <Link
                href="/transactions"
                className="view-all"
              >

                Бүгдийг харах

                <ChevronRight
                  size={16}
                />

              </Link>

            </div>


            <div className="home-transaction-card">


              {recentTransactions.map(
                (transaction, index) => (

                  <div
                    className="home-transaction-row"
                    key={index}
                  >


                    <div className="home-transaction-left">


                      <div
                        className={`home-transaction-icon ${transaction.type}`}
                      >

                        {transaction.type === "income" ? (

                          <ArrowUpRight
                            size={19}
                            strokeWidth={2}
                          />

                        ) : (

                          <ArrowDownLeft
                            size={19}
                            strokeWidth={2}
                          />

                        )}

                      </div>


                      <div>

                        <strong>
                          {transaction.title}
                        </strong>

                        <span>
                          {transaction.subtitle}
                        </span>

                      </div>

                    </div>


                    <strong
                      className={
                        transaction.type === "income"
                          ? "transaction-income"
                          : "transaction-expense"
                      }
                    >
                      {transaction.amount}
                    </strong>


                  </div>

                )
              )}

            </div>

          </section>

        </section>

      </div>

    </main>
  );
}