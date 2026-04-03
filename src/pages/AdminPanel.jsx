import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../firebase/auth";
import {
  uploadGalleryImage,
  getGalleryItems,
} from "../firebase/galleryService";

export default function AdminPanel() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogout() {
    await logoutAdmin();
    navigate("/admin-login");
  }

  async function loadGallery() {
    try {
      const data = await getGalleryItems();
      setItems(data);
    } catch (error) {
      console.error("Помилка завантаження галереї:", error);
    }
  }

  useEffect(() => {
    loadGallery();
  }, []);

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      setMessage("Оберіть фото");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await uploadGalleryImage(file, title);

      setTitle("");
      setFile(null);
      e.target.reset();

      setMessage("Фото успішно додано");
      await loadGallery();
    } catch (error) {
      console.error("Помилка завантаження:", error);
      setMessage("Не вдалося завантажити фото");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.topbar}>
        <h1 style={styles.heading}>Адмінка</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Вийти
        </button>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Додати фото в галерею</h2>

          <form onSubmit={handleUpload} style={styles.form}>
            <input
              type="text"
              placeholder="Назва фото"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={styles.input}
            />

            <button type="submit" disabled={loading} style={styles.primaryBtn}>
              {loading ? "Завантаження..." : "Завантажити фото"}
            </button>

            {message ? <p style={styles.message}>{message}</p> : null}
          </form>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Поточна галерея</h2>

          <div style={styles.galleryGrid}>
            {items.map((item) => (
              <div key={item.id} style={styles.galleryItem}>
                <img
                  src={item.image}
                  alt={item.title || "Gallery image"}
                  style={styles.image}
                />
                <p style={styles.imageTitle}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px",
    background: "#0f1115",
    color: "#fff",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  heading: {
    margin: 0,
    fontSize: "40px",
  },
  logoutBtn: {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "1px solid #444",
    background: "#fff",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "24px",
  },
  card: {
    background: "#171a21",
    borderRadius: "20px",
    padding: "24px",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #333",
    background: "#0f1115",
    color: "#fff",
  },
  primaryBtn: {
    padding: "14px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#d7b98e",
    color: "#111",
    fontWeight: 600,
    cursor: "pointer",
  },
  message: {
    margin: 0,
    color: "#d7b98e",
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "16px",
  },
  galleryItem: {
    background: "#0f1115",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    display: "block",
  },
  imageTitle: {
    margin: 0,
    padding: "12px",
    fontSize: "14px",
  },
};