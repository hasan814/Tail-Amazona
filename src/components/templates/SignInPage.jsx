"use client";

import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

import Link from "next/link";
import Loader from "@/elements/Loader";

const SignUpPage = () => {
  // ============ Router ==========
  const router = useRouter();

  // ============ State ==========
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ============ Function ==========
  const signUpHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (response.error) router.push(response.error);
    else router.push("/");
  };

  // ============ Redndering ==========
  return (
    <form className="mx-auto max-w-screen-md">
      <Toaster />
      <h1 className="mb-4 text-xl">Login page</h1>
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
        {loading ? (
          <Loader />
        ) : (
          <button className="primary-button" onClick={signUpHandler}>
            Sign In
          </button>
        )}
      </div>
      <div className="mb-4">
        Don&nbsp;t have an account?
        <Link href={"/signup"}>Register</Link>
      </div>
    </form>
  );
};

export default SignUpPage;
