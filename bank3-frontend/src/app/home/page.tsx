
import Link from "next/link";
import "./home.css";

const actions = [
  { icon: "↗", title: "Шилжүүлэг", href: "/transfer" },
  { icon: "▣", title: "Төлбөр төлөх", href: "/payments" },
  { icon: "▤", title: "Карт", href: "/cards" },
  { icon: "◷", title: "Гүйлгээний түүх", href: "/transactions" },
];

export default function HomePage() {
  return (
    <main className="dashboard">

      <header className="dashboard-header">
        <Link href="/home" className="brand">
          <span className="brand-mark">B</span>
          BANK3
        </Link>

        <div className="user-chip">
          👤 Хэрэглэгчийн бүртгэл
        </div>
      </header>

      <div className="dashboard-title">
        <h1>Сайн байна уу! 👋</h1>
        <p className="muted">
          Таны санхүүгийн мэдээлэл нэг дор.
        </p>
      </div>

      <section className="balance-card">
        <p>Нийт дансны үлдэгдэл</p>
        <div className="amount">— ₮</div>
        <p className="muted">
          Дансны үлдэгдлийг API холболтын дараа харуулна.
        </p>
      </section>

      <h2 className="section-title">Түргэн үйлдлүүд</h2>

      <section className="dashboard-grid">
        {actions.map((action) => (
          <Link
            href={action.href}
            className="action-card"
            key={action.title}
          >
            <span className="action-icon">{action.icon}</span>
            <strong>{action.title}</strong>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="section-title">
          Сүүлийн гүйлгээнүүд
        </h2>

        <div className="empty-state">
          <div style={{ fontSize: 30, marginBottom: 10 }}>
            ◷
          </div>

          <strong>Гүйлгээний мэдээлэл алга</strong>

          <p className="muted">
            API холболт хийсний дараа таны сүүлийн
            гүйлгээнүүд энд харагдана.
          </p>
        </div>
      </section>

      <section>
        <h2 className="section-title">Дансны мэдээлэл</h2>

        <div className="empty-state">
          Дансны мэдээлэл API-аас ачаалагдана.
        </div>
      </section>

      <footer className="auth-bottom">
        BANK3 © 2026 · Дижитал банкны систем
      </footer>

    </main>
  );
}
