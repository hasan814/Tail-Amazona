"use client";
import { useState } from "react";

const ProfilePage = ({ submitHandler, value }) => {
  const [formData, setFormData] = useState({
    ...value,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto max-w-screen-md">
        <h1 className="mb-4 text-xl">Update Profile</h1>
        <div className="mb-4">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            className="w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password:</label>
          <input
            className="w-full"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            className="w-full"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="primary-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
