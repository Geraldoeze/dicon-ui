"use client";

import Image from "next/image";
import { useState } from "react";
// import { useRouter } from "next/router";
import { AuthService } from "@/services/auth/auth.service";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface LoginFormData {
  username: string;
  password: string;
}

interface Err {
  error: string;
}
const LogIn = () => {
  // const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate input
      if (!formData.username || !formData.password) {
        setError("Please enter both email and password");
        setIsLoading(false);
        return;
      }

      // Attempt login
      const user = await AuthService.login({
        username: formData.username,
        password: formData.password,
      });
console.log(user)
      // Redirect to appropriate dashboard
      AuthService.redirectToDashboard(user.accountType);
    } catch (err) {
      // Handle login error
      setError(err instanceof Error ? err.message : "Login failed");
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="min-w-screen min-h-screen flex">
        <div className="w-full min-h-full bg-[#080825] p-10">
          <div className="max-w-fit bg-[#080825] text-white p-2 rounded-md">
            <Link
              href="/home"
              className="flex items-center gap-x-2 text-sm md:text-base"
            >
              <ArrowLeft />
              Back
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center max-w-md h-full m-auto space-y-7">
            <Image
              src="/logo.png"
              alt=""
              width={100}
              height={100}
              className=""
            />

            <h1 className="text-[2rem] md:text-[2.5rem] text-white text-start font-semibold">
              {" "}
              Log In to the Portal{" "}
            </h1>

            <form
              action=""
              className="space-y-7"
              onSubmit={handleSubmit}
              noValidate
            >
              <input
                value={formData.username.trim()}
                onChange={handleChange}
                type="username"
                id="username"
                name="username"
                autoComplete="username"
                required
                placeholder="Enter your E-mail"
                className="w-full p-2 border-b outline-none rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                value={formData.password.trim()}
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="Enter your Password"
                className="w-full p-2 border-b outline-none rounded-md focus:ring-2 focus:ring-blue-500"
              />

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <p className="text-white">
                forgot password? Click this
                <a
                  href="/portal/forgot-password"
                  className="text-blue-500 text-underline"
                >
                  {" "}
                  link.
                </a>
              </p>
              <button
                type="submit"
                value="Log In"
                disabled={isLoading}
                className="w-full bg-[#2D2F93] text-white p-2 rounded-md hover:bg-blue-600"
              >
                {" "}
                {isLoading ? "Signing In..." : "Sign In"}{" "}
              </button>
            </form>
          </div>
        </div>
        {/* <div className="w-1/2 hidden md:block bg-[url('/11074101.jpg')] bg-cover bg-center"> </div> */}
      </div>
    </div>
  );
};

export default LogIn;
