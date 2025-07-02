import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // Adjust path as needed
import PageLayout from "@/components/common/layout/PageLayout"; // Adjust path as needed

function LoginPage() {
  const [username, setUsername] = useState(""); // Changed from email to username to match useAuth implementation
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { login, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!username || !password) {
      setFormError("Please enter both username and password");
      return;
    }

    try {
      // Using the login function from useAuth hook
      await login({ username, password });
      navigate("/dashboard");
    } catch (err) {
      // Form error is managed separately from auth error
      setFormError(err.message || "Login failed");
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-12">
        <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>

          {(formError || authError) && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {formError || authError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default LoginPage;
