import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import toast from 'react-hot-toast'

export default function AuthPage({ mode }) {
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Log the form data for debugging

        console.log("Form Data:", formData);
        await login({
          username: formData.username,
          password: formData.password,
        });
      } else {
        await signup(formData);
        toast.success("Account Created Succesfully !")
      }
      navigate("/");
      console.log("Success");
    } catch (error) {
      const message = error.response.data.message
      setError(message);
      console.error(message);
      
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  const isLogin = mode === "login";
  const title = isLogin ? "Welcome back" : "Create your account";
  const subtitle = isLogin
    ? "Sign in to manage bookings, host listings, and traveler history."
    : "Join as a traveler or host with a single account.";

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
      <div className="rounded-[2rem] bg-[#111827] p-8 text-white shadow-2xl shadow-black/20">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-rose-300">
          Authentication
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-4 max-w-lg text-white/70">{subtitle}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-white/60">Traveler mode</div>
            <div className="mt-2 text-xl font-semibold">
              Browse, book, review
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-white/60">Host mode</div>
            <div className="mt-2 text-xl font-semibold">List, manage, earn</div>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} type="submit" className="grid gap-5">
          {!isLogin ? (
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400"
                placeholder="you@example.com"
              />
            </label>
          ) : null}

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Username</span>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400"
              placeholder="Enter username"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400"
              placeholder="Enter password"
            />
          </label>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            {isLogin ? "Log in" : "Create account"}
          </button>

          <p className="text-sm text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              to={isLogin ? "/signup" : "/login"}
              className="font-medium text-rose-500 hover:text-rose-600"
            >
              {isLogin ? "Sign up" : "Log in"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
