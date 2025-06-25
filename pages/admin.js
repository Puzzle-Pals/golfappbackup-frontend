import { useState, useEffect } from "react";
import AdminDashboard from "./admin/dashboard";
import AdminLogin from "../components/AdminLogin";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    // Validate token with backend
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://bp-golf-app-backend.vercel.app/api"}/admin/check-auth`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("adminToken");
          setIsLoggedIn(false);
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  if (!isLoggedIn) {
    return <AdminLogin setIsLoggedIn={setIsLoggedIn} />;
  }
  return <AdminDashboard setIsLoggedIn={setIsLoggedIn} />;
}