"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Sparkles, UserCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Багшийн сессийг хадгалаад Нүүр хуудас руу шилжүүлнэ
      localStorage.setItem("teacher_session", JSON.stringify({ email }));
      router.push("/");
      window.location.href = "/"; // Баталгаажуулж хуудсыг сэргээнэ
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/30 flex items-center justify-center p-4 w-full">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 border border-pink-100 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 mb-2">
            <Sparkles size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Хөгжлийн Хуудас</h1>
          <p className="text-xs text-gray-400">
            Багш бүр өөрийн нэвтрэх эрхээр системд нэвтэрнэ үү
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Багшийн и-мэйл хаяг:
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="teacher@kindergarten.mn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Нууц үг:
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition mt-2"
          >
            <UserCheck size={18} /> Системд нэвтрэх
          </button>
        </form>
      </div>
    </div>
  );
}