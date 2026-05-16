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
    e.preventDefault();

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
    <div className="relative min-h-screen w-screen flex items-center justify-center px-4 text-white box-border">
      {/* BACKGROUND FLOATING IMAGES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.img
          animate={{ y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600"
          className="absolute top-24 left-24 w-52 h-52 rounded-3xl object-cover opacity-20 hidden lg:block"
        />

        <motion.img
          animate={{ y: [0, 18, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600"
          className="absolute bottom-24 right-24 w-56 h-56 rounded-3xl object-cover opacity-20 hidden lg:block"
        />
      </div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md bg-slate-900/40 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <p className="text-indigo-400 text-2xl font-bold tracking-wide">
            Welcome back...
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight">Login</h1>
          <p className="text-slate-400 text-sm mt-1">
            Continue your realtime workspace.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={login} className="flex flex-col gap-4">
          {/* IDENTIFIER INPUT CONTAINER */}
          <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800/80 focus-within:border-indigo-500 rounded-2xl px-4 py-4 transition-all h-14 min-h-[56px]">
            <Mail size={20} className="text-slate-500 shrink-0" />
            <input
              type="text"
              placeholder="Username or Email"
              value={form.identifier}
              className="bg-transparent w-full text-base outline-none text-white placeholder-slate-500 border-none p-0 focus:ring-0"
              onChange={(e) =>
                setForm({
                  ...form,
                  identifier: e.target.value,
                })
              }
            />
          </div>

          {/* PASSWORD INPUT CONTAINER */}
          <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800/80 focus-within:border-indigo-500 rounded-2xl px-4 py-4 transition-all h-14 min-h-[56px]">
            <Lock size={20} className="text-slate-500 shrink-0" />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              className="bg-transparent w-full text-base outline-none text-white placeholder-slate-500 border-none p-0 focus:ring-0"
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
            className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 enabled:hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 h-14 min-h-[56px] rounded-2xl font-semibold flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-50 disabled:pointer-events-none text-white"
          >
            {loading ? "Authenticating..." : "Login"}
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-2">
          New here?{" "}
          <Link href="/register" className="text-indigo-400 hover:underline font-medium ml-1">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}