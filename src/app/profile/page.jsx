"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";

import ProfilePage from "@/templates/ProfilePage";
import axios from "axios";

const Profile = () => {
  // ========== Session ============
  const { data } = useSession();

  // ========== State ============
  const [value, setValue] = useState({ name: "", email: "" });

  // ========== Effect ============
  useEffect(() => {
    if (data?.user) {
      setValue({ name: data.user.name, email: data.user.email });
    }
  }, [data]);

  // ========== Function ============
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put("/api/auth/update", { name, email, password });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.success("Profile Updated Successfully");
      if (result.error) toast.error(result.error);
    } catch (error) {
      toast.error(error);
    }
  };

  // ========== Rendering ============
  return (
    <>
      <Toaster />
      <ProfilePage value={value} submitHandler={submitHandler} />
    </>
  );
};

export default Profile;
