"use client";

import { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "kawazoe-crew-2026";

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const authed = sessionStorage.getItem("admin_auth") === "true";
    setIsAuthed(authed);
  }, []);

  const handleLogin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthed(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthed(false);
  };

  if (isAuthed === null) return null;

  if (!isAuthed) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
