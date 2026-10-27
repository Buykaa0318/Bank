
"use client";

import Link from "next/link";

import {
  Search,
  SlidersHorizontal,
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  CalendarDays,
  House,
  Send,
  ReceiptText,
  UserRound,
  Bell,
} from "lucide-react";


const transactions = [

  {
    time: "17:37",
    title: "y004321309, 99976289",
    subtitle: "Gantsatsral",
    amount: "-671,500.00 ₮",
    balance: "Үлдэгдэл: 200.00 ₮",
    type: "expense",
  },

  {
    time: "17:36",
    title: "ХААНААС: 150000 БУЯНХИШИГ",
    subtitle: "ДОРЖГОТОВ SOCIALPAY ГҮЙЛГЭЭ",
    amount: "+671,700.00 ₮",
    balance: "Үлдэгдэл: 671,700.00 ₮",
    type: "income",
  },

  {
    time: "16:13",
    title: "2025 ТӨЛБӨР",
    subtitle: "Төлбөрийн гүйлгээ",
    amount: "-217,000.00 ₮",
    balance: "Үлдэгдэл: 0.00 ₮",
    type: "expense",
  },

  {
    time: "15:40",
    title: "Данс хоорондын шилжүүлэг",
    subtitle: "Өөрийн данс",
    amount: "-50,000.00 ₮",
    balance: "Үлдэгдэл: 217,000.00 ₮",
    type: "expense",
  },

  {
    time: "14:21",
    title: "Цалин",
    subtitle: "Дансанд орлого",
    amount: "+1,200,000.00 ₮",
    balance: "Үлдэгдэл: 267,000.00 ₮",
    type: "income",
  },

  {
    time: "12:15",
    title: "CU Mongolia",
    subtitle: "Худалдан авалт",
    amount: "-18,500.00 ₮",
    balance: "Үлдэгдэл: 37,500.00 ₮",
    type: "expense",
  },

];


export default function TransactionsPage() {

  return (

    <main className="web-app">


      {/* SIDEBAR */}

      <aside className="sidebar">

        <Link
          href="/"
          className="brand"
        >
          BANK<span>3</span>
        </Link>


        <div className="sidebar-section">

          <p className="sidebar-label">
            ҮНДСЭН
          </p>


          <Link
            href="/"
            className="side-link"
          >

            <House size={18} />

            <span>
              Нүүр
            </span>

          </Link>


          <Link
            href="/transfer"
            className="side-link"
          >

            <Send size={18} />

            <span>
              Шилжүүлэг
            </span>

          </Link>


          <Link
            href="/transactions"
            className="side-link active"
          >

            <ReceiptText size={18} />

            <span>
              Гүйлгээний хуулга
            </span>

          </Link>

        </div>


        <div className="sidebar-section">

          <p className="sidebar-label">
            ТОХИРГОО
          </p>


          <Link
            href="/profile"
            className="side-link"
          >

            <UserRound size={18} />

            <span>
              Профайл
            </span>

          </Link>

        </div>

      </aside>


      {/* MAIN */}

      <div className="main-area">


        {/* TOPBAR */}

        <header className="topbar">

          <div className="mobile-brand">
            BANK<span>3</span>
          </div>


          <div className="topbar-search">

            <Search size={19} />

            <input
              placeholder="Гүйлгээ хайх..."
            />

          </div>


          <div className="topbar-right">

            <button className="icon-button">

              <Bell size={19} />

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


        {/* CONTENT */}

        <section className="web-content">


          <div className="page-heading">

            <p>
              Санхүү
            </p>

            <h1>
              Гүйлгээний хуулга
            </h1>

            <span>
              Таны бүх орлого, зарлагын мэдээлэл
            </span>

          </div>


          {/* SUMMARY */}

          <div className="transfer-summary">


            <div>

              <span>
                Нийт орлого
              </span>

              <strong className="summary-income">
                +4,250,000 ₮
              </strong>

            </div>


            <div>

              <span>
                Нийт зарлага
              </span>

              <strong className="summary-expense">
                -1,750,000 ₮
              </strong>

            </div>


            <div>

              <span>
                Нийт гүйлгээ
              </span>

              <strong>
                24
              </strong>

            </div>


            <div>

              <span>
                Үлдэгдэл
              </span>

              <strong>
                12,500,000 ₮
              </strong>

            </div>


          </div>


          {/* FILTER */}

          <div className="transaction-toolbar">


            <div className="toolbar-search">

              <Search size={18} />

              <input
                placeholder="Гүйлгээ хайх"
              />

            </div>


            <button>

              <CalendarDays size={17} />

              2026.10.06

            </button>


            <button>

              <SlidersHorizontal size={17} />

              Шүүлтүүр

            </button>


          </div>


          {/* HISTORY */}

          <div className="transaction-panel">


            <div className="panel-header">

              <div>

                <h2>
                  Гүйлгээний хуулга
                </h2>

                <p>
                  2026 оны 10 сарын 6
                </p>

              </div>

            </div>


            <div className="transaction-table">


              {transactions.map(
                (transaction, index) => (

                  <div
                    className="web-transaction"
                    key={index}
                  >


                    <div
                      className={
                        `transaction-symbol ${transaction.type}`
                      }
                    >

                      {transaction.type === "income" ? (

                        <ArrowUpRight
                          size={20}
                        />

                      ) : (

                        <ArrowDownLeft
                          size={20}
                        />

                      )}

                    </div>


                    <div className="transaction-description">

                      <strong>
                        {transaction.title}
                      </strong>

                      <span>
                        {transaction.subtitle}
                      </span>

                    </div>


                    <div className="transaction-date">

                      {transaction.time}

                    </div>


                    <div>

                      <strong
                        className={
                          transaction.type === "income"
                            ? "transaction-income"
                            : "transaction-expense"
                        }
                      >
                        {transaction.amount}
                      </strong>


                      <small className="balance-text">
                        {transaction.balance}
                      </small>

                    </div>


                    <ChevronRight
                      size={18}
                      className="transaction-next"
                    />

                  </div>

                )
              )}

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}