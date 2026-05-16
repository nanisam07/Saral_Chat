"use client";

import { useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import {
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const register = async () => {
    if (
      !form.username ||
      !form.email ||
      !form.password
    ) {
      alert("Please fill all fields");

      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:1337/api/auth/local/register",
        form
      );

      router.push("/login");
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center px-6">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* GLOW */}
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-indigo-500/20 rounded-full blur-[120px]" />

        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-purple-500/20 rounded-full blur-[120px]" />

        {/* FLOATING IMAGES */}
        <motion.img
          animate={{
            y: [0, -18, 0],
            rotate: [-8, -4, -8],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
          }}
          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600"
          className="absolute top-28 left-32 w-56 h-56 rounded-[38px] object-cover opacity-25"
        />

        <motion.img
          animate={{
            y: [0, 18, 0],
            rotate: [8, 4, 8],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600"
          className="absolute bottom-24 right-32 w-64 h-64 rounded-[38px] object-cover opacity-25"
        />
      </div>

      {/* CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative z-10 w-full max-w-lg bg-slate-950/60 border border-white/10 backdrop-blur-2xl rounded-[40px] p-10 shadow-[0_20px_100px_rgba(0,0,0,0.45)]"
      >
        <div className="mb-10">
          <p className="text-indigo-400 text-3xl font-bold mb-3">
            Build your space...
          </p>

          <h1 className="text-5xl font-extrabold">
            Register
          </h1>

          <p className="text-slate-400 mt-4">
            Create your realtime workspace account.
          </p>
        </div>

        {/* INPUTS */}
        <div className="space-y-5">
          <div className="flex items-center gap-4 bg-slate-900/70 border border-slate-800 focus-within:border-indigo-500 rounded-3xl px-5 transition-all">
            <User
              size={20}
              className="text-slate-500"
            />

            <input
              type="text"
              placeholder="Username"
              className="bg-transparent w-full py-5 text-lg"
              onChange={(e) =>
                setForm({
                  ...form,
                  username:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="flex items-center gap-4 bg-slate-900/70 border border-slate-800 focus-within:border-indigo-500 rounded-3xl px-5 transition-all">
            <Mail
              size={20}
              className="text-slate-500"
            />

            <input
              type="email"
              placeholder="Email"
              className="bg-transparent w-full py-5 text-lg"
              onChange={(e) =>
                setForm({
                  ...form,
                  email:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="flex items-center gap-4 bg-slate-900/70 border border-slate-800 focus-within:border-indigo-500 rounded-3xl px-5 transition-all">
            <Lock
              size={20}
              className="text-slate-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="bg-transparent w-full py-5 text-lg"
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          onClick={register}
          className="w-full mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] transition-all duration-300 py-5 rounded-3xl font-semibold flex items-center justify-center gap-2 text-lg"
        >
          {loading
            ? "Creating..."
            : "Create Account"}

          <ArrowRight size={20} />
        </button>

        <p className="text-center text-slate-500 mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-400"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}