"use client";

import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Link from "next/link";
import Loader from "@/elements/Loader";

const SignUpPage = () => {
  // ============ Router ==========
  const router = useRouter();

  // ============ State ==========
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ============ Function ==========
  const signUpHandler = async (event) => {
    event.preventDefault();
    if (password !== rePassword) {
      toast.error("password and RePassword is not match");
      return;
    }
    setLoading(true);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setLoading(false);
    if (response.status === 201) router.push("signin");
    else toast.error(data.error);
  };

  // ============ Redndering ==========
  return (
    <form className="mx-auto max-w-screen-md">
      <Toaster />
      <h1 className="mb-4 text-xl">Register</h1>
      <div className="mb-4">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="w-full"
          placeholder="Name..."
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoFocus
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="w-full"
          placeholder="Email..."
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoFocus
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="w-full"
          placeholder="Password..."
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoFocus
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rePassword">RePassword</label>
        <input
          type="password"
          className="w-full"
          placeholder="RePassword..."
          id="rePassword"
          value={rePassword}
          onChange={(event) => setRePassword(event.target.value)}
          autoFocus
        />
      </div>
      <div className="mb-4">
        {loading ? (
          <Loader />
        ) : (
          <button className="primary-button" onClick={signUpHandler}>
            Register
          </button>
        )}
      </div>
      <div className="mb-4">
        have an account?
        <Link href={"/signin"}>Sign In</Link>
      </div>
    </form>
  );
};

export default SignUpPage;
