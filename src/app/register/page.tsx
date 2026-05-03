"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Sprout, UserPlus, Eye, EyeOff } from "lucide-react";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("buyer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "farmer" || roleParam === "buyer") {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name,
          email,
          role,
          createdAt: new Date().toISOString()
        });
      } catch (firestoreError) {
        console.warn("Firestore save failed.", firestoreError);
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to create an account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-border">
      <form className="space-y-5" onSubmit={handleRegister}>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-200">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-foreground">
            Saya ingin bergabung sebagai
          </label>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole("farmer")}
              className={`py-3 px-4 rounded-lg border text-sm font-bold transition-all ${
                role === "farmer"
                  ? "bg-brand-600 border-brand-600 text-white shadow-md"
                  : "bg-background border-border text-foreground/70 hover:border-brand-300"
              }`}
            >
              Petani
            </button>
            <button
              type="button"
              onClick={() => setRole("buyer")}
              className={`py-3 px-4 rounded-lg border text-sm font-bold transition-all ${
                role === "buyer"
                  ? "bg-brand-500 border-brand-500 text-white shadow-md"
                  : "bg-background border-border text-foreground/70 hover:border-brand-300"
              }`}
            >
              Pembeli
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground">
            Nama Lengkap
          </label>
          <div className="mt-1">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full appearance-none rounded-lg border border-border px-3 py-2 placeholder-foreground/40 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm bg-background"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">
            Alamat Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full appearance-none rounded-lg border border-border px-3 py-2 placeholder-foreground/40 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm bg-background"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">
            Kata Sandi
          </label>
          <div className="mt-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full appearance-none rounded-lg border border-border px-3 py-2 pr-10 placeholder-foreground/40 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm bg-background"
              minLength={6}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/50 hover:text-foreground/80 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center items-center gap-2 mt-4 rounded-lg border border-transparent bg-brand-600 py-3 px-4 text-sm font-bold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-70 transition-colors"
          >
            {loading ? "Mendaftarkan..." : <><UserPlus className="h-4 w-4" /> Daftar Sekarang</>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-brand-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center mb-6">
          <img src="/logo.png" alt="FARMELO Logo" className="h-16 w-auto object-contain" />
        </Link>
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
          Buat akun baru
        </h2>
        <p className="mt-2 text-center text-sm text-foreground/70">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-medium text-brand-600 hover:text-brand-500">
            Masuk di sini
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense fallback={<div className="text-center py-4">Memuat...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
