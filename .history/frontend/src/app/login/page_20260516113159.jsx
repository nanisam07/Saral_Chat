"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault(); // Prevents page reload on form submit

    if (!form.identifier || !form.password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:1337/api/auth/local",
        form
      );

      localStorage.setItem("token", res.data.jwt);
      localStorage.setItem("username", res.data.user.username);

      router.push("/chat");
    } catch (error) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center px-6 text-white bg-slate-950">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-purple-500/20 rounded-full blur-[120px]" />

        <motion.img
          animate={{ y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600"
          className="absolute top-28 left-32 w-56 h-56 rounded-[38px] object-cover opacity-25 hidden lg:block"
        />

        <motion.img
          animate={{ y: [0, 18, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600"
          className="absolute bottom-24 right-32 w-64 h-64 rounded-[38px] object-cover opacity-25 hidden lg:block"
        />
      </div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg bg-slate-950/60 border border-white/10 backdrop-blur-2xl rounded-[40px] p-10 shadow-[0_20px_100px_rgba(0,0,0,0.45)]"
      >
        <div className="mb-10">
          <p className="text-indigo-400 text-3xl font-bold mb-3">
            Welcome back...
          </p>
          <h1 className="text-5xl font-extrabold">Login</h1>
          <p className="text-slate-400 mt-4">
            Continue your realtime workspace.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={login} className="space-y-5">
          {/* IDENTIFIER INPUT */}
          <div className="flex items-center gap-4 bg-slate-900/70 border border-slate-800 focus-within:border-indigo-500 rounded-3xl px-5 transition-all">
            <Mail size={20} className="text-slate-500 shrink-0" />
            <input
              type="text"
              placeholder="Username or Email"
              value={form.identifier}
              className="bg-transparent w-full py-5 text-lg outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  identifier: e.target.value,
                })
              }
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="flex items-center gap-4 bg-slate-900/70 border border-slate-800 focus-within:border-indigo-500 rounded-3xl px-5 transition-all">
            <Lock size={20} className="text-slate-500 shrink-0" />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              className="bg-transparent w-full py-5 text-lg outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 bg-gradient-to-r from-indigo-500 to-purple-600 enabled:hover:scale-[1.02] transition-all duration-300 py-5 rounded-3xl font-semibold flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? "Authenticating..." : "Login"}
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center text-slate-500 mt-8">
          New here?{" "}
          <Link href="/register" className="text-indigo-400 hover:underline">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}