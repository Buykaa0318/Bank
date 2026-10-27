"use client";

import Link from "next/link";

import {
  Search,
  Bell,
  UserRound,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Settings,
  ChevronRight,
  LogOut,
  WalletCards,
  House,
  Send,
  ReceiptText,
} from "lucide-react";


export default function ProfilePage() {
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
            className="side-link"
          >
            <ReceiptText size={18} />

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
            className="side-link active"
          >
            <UserRound size={18} />

            <span>
              Профайл
            </span>
          </Link>

        </div>


        {/* LOGOUT */}

        <div className="sidebar-bottom">

          <button className="sidebar-logout">

            <LogOut size={18} />

            <span>
              Гарах
            </span>

          </button>

        </div>

      </aside>


      {/* =========================
          MAIN AREA
      ========================= */}

      <div className="main-area">


        {/* TOPBAR */}

        <header className="topbar">

          <div className="mobile-brand">
            BANK<span>3</span>
          </div>


          <div className="topbar-search">

            <Search size={19} />

            <input
              type="text"
              placeholder="Хайх..."
            />

          </div>


          <div className="topbar-right">

            <button
              className="icon-button"
              type="button"
            >
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


        {/* =========================
            CONTENT
        ========================= */}

        <section className="web-content profile-page">


          {/* PAGE HEADING */}

          <div className="page-heading">

            <p>
              Тохиргоо
            </p>

            <h1>
              Профайл
            </h1>

            <span>
              Таны хувийн мэдээлэл болон тохиргоо
            </span>

          </div>


          {/* =========================
              PROFILE HERO
          ========================= */}

          <section className="profile-hero">


            <div className="profile-big-avatar">

              <UserRound
                size={40}
                strokeWidth={1.8}
              />

            </div>


            <div className="profile-hero-info">

              <h2>
                Д. БУЯНХИШИГ
              </h2>

              <p>
                Баталгаажсан харилцагч
              </p>

              <span>
                Харилцагчийн дугаар: 0005165335557
              </span>

            </div>


            <button
              className="edit-profile"
              type="button"
            >

              <Settings size={16} />

              Засах

            </button>

          </section>


          {/* =========================
              PROFILE GRID
          ========================= */}

          <div className="profile-grid">


            {/* =====================
                PERSONAL INFORMATION
            ====================== */}

            <section className="profile-settings-card">

              <div className="card-title">

                <div className="title-icon">
                  <UserRound size={20} />
                </div>


                <div>

                  <h3>
                    Хувийн мэдээлэл
                  </h3>

                  <p>
                    Таны бүртгэлтэй мэдээлэл
                  </p>

                </div>

              </div>


              <div className="detail-row">

                <span>
                  Овог нэр
                </span>

                <strong>
                  Д. Буянхишиг
                </strong>

              </div>


              <div className="detail-row">

                <span>
                  Утас
                </span>

                <strong>
                  99******
                </strong>

              </div>


              <div className="detail-row">

                <span>
                  И-мэйл
                </span>

                <strong>
                  batbold@email.com
                </strong>

              </div>


              <div className="detail-row">

                <span>
                  Харилцагчийн төрөл
                </span>

                <strong>
                  Хувь хүн
                </strong>

              </div>

            </section>


            {/* =====================
                SECURITY
            ====================== */}

            <section className="profile-settings-card">

              <div className="card-title">

                <div className="title-icon">
                  <ShieldCheck size={20} />
                </div>


                <div>

                  <h3>
                    Аюулгүй байдал
                  </h3>

                  <p>
                    Нууцлал болон хамгаалалт
                  </p>

                </div>

              </div>


              <ProfileSetting
                icon={<ShieldCheck size={18} />}
                title="Нууц үг"
                text="Сүүлд шинэчилсэн: 30 хоногийн өмнө"
              />


              <ProfileSetting
                icon={<Smartphone size={18} />}
                title="Нэвтэрсэн төхөөрөмж"
                text="Windows · Chrome"
              />


              <ProfileSetting
                icon={<Bell size={18} />}
                title="Мэдэгдэл"
                text="Идэвхтэй"
              />

            </section>


            {/* =====================
                ACCOUNT
            ====================== */}

            <section className="profile-settings-card">

              <div className="card-title">

                <div className="title-icon">
                  <WalletCards size={20} />
                </div>


                <div>

                  <h3>
                    Данс
                  </h3>

                  <p>
                    Таны үндсэн дансны мэдээлэл
                  </p>

                </div>

              </div>


              <div className="profile-account">

                <div className="account-mini-icon">
                  ₮
                </div>


                <div className="account-info">

                  <strong>
                    Үндсэн данс
                  </strong>

                  <span>
                    MN81 0005 00 5165335557
                  </span>

                </div>


                <b>
                  12,500,000 ₮
                </b>

              </div>

            </section>


            {/* =====================
                SETTINGS
            ====================== */}

            <section className="profile-settings-card">

              <div className="card-title">

                <div className="title-icon">
                  <Settings size={20} />
                </div>


                <div>

                  <h3>
                    Тохиргоо
                  </h3>

                  <p>
                    Аппликэйшний тохиргоо
                  </p>

                </div>

              </div>


              <ProfileSetting
                icon={<Bell size={18} />}
                title="Push мэдэгдэл"
                text="Идэвхтэй"
              />


              <ProfileSetting
                icon={<CreditCard size={18} />}
                title="Төлбөрийн тохиргоо"
                text="Үндсэн тохиргоо"
              />


              <ProfileSetting
                icon={<Settings size={18} />}
                title="Ерөнхий тохиргоо"
                text="Хэл, харагдах байдал"
              />

            </section>

          </div>


          {/* =========================
              LOGOUT
          ========================= */}

          <button
            className="profile-logout"
            type="button"
          >

            <LogOut size={18} />

            Системээс гарах

          </button>


        </section>

      </div>

    </main>
  );
}


/* =========================================================
   PROFILE SETTING
========================================================= */

function ProfileSetting({
  icon,
  title,
  text,
}) {

  return (

    <button
      className="profile-setting"
      type="button"
    >

      <div className="setting-icon">
        {icon}
      </div>


      <div className="setting-content">

        <strong>
          {title}
        </strong>

        <span>
          {text}
        </span>

      </div>


      <ChevronRight
        size={18}
        className="setting-arrow"
      />

    </button>

  );
}