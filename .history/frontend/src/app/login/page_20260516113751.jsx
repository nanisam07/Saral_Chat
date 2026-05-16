"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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

  // Stagger variants for smooth element orchestration
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom premium ease-out
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center px-4 text-white box-border bg-[#040816]">
      
      {/* PERSISTENT GRADIENT GLOWS OVER THE GRID */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* BACKGROUND FLOATING IMAGES WITH PARALLAX LOOPS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-48 h-48 rounded-[32px] p-[1px] bg-gradient-to-br from-indigo-500/20 to-transparent hidden lg:block"
        >
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
            className="w-full h-full rounded-[31px] object-cover opacity-15 grayscale hover:grayscale-0 transition-all duration-700"
            alt="Workspace User"
          />
        </motion.div>

        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-52 h-52 rounded-[32px] p-[1px] bg-gradient-to-bl from-purple-500/20 to-transparent hidden lg:block"
        >
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
            className="w-full h-full rounded-[31px] object-cover opacity-15 grayscale hover:grayscale-0 transition-all duration-700"
            alt="Workspace User"
          />
        </motion.div>
      </div>

      {/* CARD CONTEXT CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[440px] bg-slate-900/30 border border-white/[0.08] backdrop-blur-2xl rounded-[32px] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] flex flex-col gap-8"
      >
        {/* HEADER SECTION */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <p className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">
              Welcome back
            </p>
          </div>
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
            Sign In
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Continue your realtime workspace journey.
          </p>
        </motion.div>

        {/* FORM INITIALIZATION */}
        <form onSubmit={login} className="flex flex-col gap-4">
          
          {/* USERNAME / EMAIL INPUT ROW */}
          <motion.div 
            variants={itemVariants}
            className={`flex items-center gap-4 bg-slate-950/40 border rounded-2xl px-4 transition-all duration-300 h-14 min-h-[56px] relative overflow-hidden group ${
              focusedField === "identifier" 
                ? "border-indigo-500/80 shadow-[0_0_20px_rgba(99,102,241,0.15)]" 
                : "border-slate-800/80 hover:border-slate-700"
            }`}
          >
            <Mail 
              size={18} 
              className={`shrink-0 transition-colors duration-300 ${
                focusedField === "identifier" ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-400"
              }`} 
            />
            <input
              type="text"
              placeholder="Username or Email"
              value={form.identifier}
              onFocus={() => setFocusedField("identifier")}
              onBlur={() => setFocusedField(null)}
              className="bg-transparent w-full text-base outline-none text-white placeholder-slate-500 font-medium border-none p-0 focus:ring-0"
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
            />
          </motion.div>

          {/* PASSWORD INPUT ROW */}
          <motion.div 
            variants={itemVariants}
            className={`flex items-center gap-4 bg-slate-950/40 border rounded-2xl px-4 transition-all duration-300 h-14 min-h-[56px] relative overflow-hidden group ${
              focusedField === "password" 
                ? "border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.15)]" 
                : "border-slate-800/80 hover:border-slate-700"
            }`}
          >
            <Lock 
              size={18} 
              className={`shrink-0 transition-colors duration-300 ${
                focusedField === "password" ? "text-purple-400" : "text-slate-500 group-hover:text-slate-400"
              }`} 
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              className="bg-transparent w-full text-base outline-none text-white placeholder-slate-500 font-medium border-none p-0 focus:ring-0"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </motion.div>

          {/* SUBMIT ACTION BUTTON */}
          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={loading}
            whileHover={loading ? {} : { scale: 1.01 }}
            whileTap={loading ? {} : { scale: 0.99 }}
            className="w-full mt-3 bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 transition-all duration-300 h-14 min-h-[56px] rounded-2xl font-semibold flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-white shadow-lg shadow-indigo-500/20 group relative overflow-hidden"
          >
            {/* Glossy shine transition layer on hover */}
            <div className="absolute inset-0 w-full h-full bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 size={18} className="animate-spin" />
                  <span>Authenticating...</span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300 ease-out" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        {/* BOTTOM REDIRECT ACCENT LINK */}
        <motion.p variants={itemVariants} className="text-center text-sm text-slate-500 font-medium m-0">
          New here?{" "}
          <Link href="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 underline underline-offset-4 font-semibold ml-0.5">
            Create account
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}