
"use client";

import Link from "next/link";

import {
  House,
  Send,
  ReceiptText,
  UserRound,
  Bell,
  User,
  Wallet,
} from "lucide-react";


export default function TransferPage() {

  const handleTransfer = (e) => {
    e.preventDefault();

    alert("Шилжүүлэг амжилттай илгээгдлээ!");
  };


  return (
    <main className="web-app">

      {/* SIDEBAR */}

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
            className="side-link"
          >
            <House size={18} />

            <span>
              Нүүр
            </span>
          </Link>


          <Link
            href="/transfer"
            className="side-link active"
          >
            <Send size={18} />

            <span>
              Шилжүүлэг
            </span>
          </Link>


          <Link
            href="/transactions"
            className="side-link"
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
              Мөнгө шилжүүлэх
            </h1>

            <span>
              Данс руу мөнгө шилжүүлэх
            </span>

          </div>


          {/* TRANSFER BOX */}

          <div className="transfer-box">


            <div className="transfer-box-header">

              <div className="transfer-icon">

                <Send size={22} />

              </div>


              <div>

                <h2>
                  Шинэ шилжүүлэг
                </h2>

                <p>
                  Хүлээн авагчийн мэдээллийг оруулна уу
                </p>

              </div>

            </div>


            <form onSubmit={handleTransfer}>


              {/* NAME */}

              <label>
                Хүлээн авагч
              </label>

              <div className="input-box">

                <User size={18} />

                <input
                  type="text"
                  placeholder="Хүлээн авагчийн нэр"
                  required
                />

              </div>


              {/* ACCOUNT */}

              <label>
                Дансны дугаар
              </label>

              <div className="input-box">

                <Wallet size={18} />

                <input
                  type="text"
                  placeholder="Дансны дугаар"
                  required
                />

              </div>


              {/* AMOUNT */}

              <label>
                Шилжүүлэх дүн
              </label>

              <div className="input-box">

                <input
                  type="number"
                  placeholder="0"
                  min="1"
                  required
                />

                <span>
                  ₮
                </span>

              </div>


              {/* DESCRIPTION */}

              <label>
                Гүйлгээний утга
              </label>

              <div className="input-box">

                <input
                  type="text"
                  placeholder="Жишээ: Номын мөнгө"
                />

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                className="primary-button transfer-submit"
              >

                <Send size={18} />

                Мөнгө шилжүүлэх

              </button>

            </form>

          </div>

        </section>

      </div>

    </main>
  );
}
