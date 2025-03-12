"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AuthService } from "@/services/auth/auth.service";

interface ForgotPasswordState {
  email: string;
  token: string;
  password: string;
  confirm_password: string;
  step: 'email' | 'reset';
  loading: boolean;
  success: boolean;
  error: string | null;
}

const ForgotPassword = () => {
  const [state, setState] = useState<ForgotPasswordState>({
    email: "",
    token: "",
    password: "",
    confirm_password: "",
    step: "email",
    loading: false,
    success: false,
    error: null,
  });

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state.email) {
      setState({ ...state, error: "Please enter your email address" });
      return;
    }

    try {
      setState({ ...state, loading: true, error: null });
      
      await AuthService.forgotPassword({ email: state.email });
      
      setState({
        ...state,
        loading: false,
        step: "reset",
        error: null
      });
    } catch (error: any) {
      setState({
        ...state,
        loading: false,
        error: error.message || "Failed to send reset email. Please try again."
      });
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!state.token) {
      setState({ ...state, error: "Please enter the token from your email" });
      return;
    }
    
    if (!state.password) {
      setState({ ...state, error: "Please enter a new password" });
      return;
    }
    
    if (state.password !== state.confirm_password) {
      setState({ ...state, error: "Passwords do not match" });
      return;
    }
    
    try {
      setState({ ...state, loading: true, error: null });
      
      await AuthService.resetPassword({
        email: state.email,
        token: state.token,
        password: state.password,
        confirm_password: state.confirm_password
      });
      
      setState({
        ...state,
        loading: false,
        success: true,
        error: null
      });
    } catch (error: any) {
      setState({
        ...state,
        loading: false,
        error: error.message || "Password reset failed. Please try again."
      });
    }
  };

  const renderEmailForm = () => (
    <form onSubmit={handleEmailSubmit} className="space-y-10 mt-10 w-full">
      <div className="space-y-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border-b shadow-none outline-none rounded-md focus:ring-2 focus:ring-blue-500"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          disabled={state.loading}
          required
        />
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
      </div>
      <button
        type="submit"
        className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 ${
          state.loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={state.loading}
      >
        {state.loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );

  const renderResetForm = () => (
    <form onSubmit={handleResetSubmit} className="space-y-6 mt-6 w-full">
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Enter token from email"
          className="w-full p-3 border-b shadow-none outline-none rounded-md focus:ring-2 focus:ring-blue-500"
          value={state.token}
          onChange={(e) => setState({ ...state, token: e.target.value })}
          disabled={state.loading}
          required
        />
      </div>
      <div className="space-y-2">
        <input
          type="password"
          placeholder="New password"
          className="w-full p-3 border-b shadow-none outline-none rounded-md focus:ring-2 focus:ring-blue-500"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
          disabled={state.loading}
          required
        />
      </div>
      <div className="space-y-2">
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full p-3 border-b shadow-none outline-none rounded-md focus:ring-2 focus:ring-blue-500"
          value={state.confirm_password}
          onChange={(e) => setState({ ...state, confirm_password: e.target.value })}
          disabled={state.loading}
          required
        />
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
      </div>
      <button
        type="submit"
        className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 ${
          state.loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={state.loading}
      >
        {state.loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );

  const renderSuccessModal = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
      <div className="text-green-500 mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Password Reset Successful!</h2>
      <p className="text-gray-600 mb-6">Your password has been successfully reset. You can now log in with your new password.</p>
      <Link 
        href="/portal/login" 
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md inline-block transition-colors"
      >
        Back to Login
      </Link>
    </div>
  );

  return (
    <div className="min-w-screen min-h-screen flex">
      <div className="w-full min-h-full bg-[#080825] p-10">
        <div className="max-w-fit bg-[#080825] text-white p-2 rounded-md">
          <Link href="/portal/login" className="flex items-center gap-x-2 text-sm md:text-base">
            <ArrowLeft />
            Back
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center max-w-md h-full m-auto space-y-5">
          {state.success ? (
            renderSuccessModal()
          ) : (
            <>
              <div className="text-white space-y-3">
                <div className="flex justify-center">
                  <Image src="/logo.png" alt="Logo" width={100} height={100} />
                </div>
                {state.step === "email" ? (
                  <>
                    <h1 className="text-[2rem] md:text-[2.5rem] text-start font-semibold">
                      Enter your Email
                    </h1>
                    <p>You will receive an email to reset your password</p>
                  </>
                ) : (
                  <>
                    <h1 className="text-[2rem] md:text-[2.5rem] text-start font-semibold">
                      Reset Password
                    </h1>
                    <p>Enter the token sent to your email and your new password</p>
                  </>
                )}
              </div>
              {state.step === "email" ? renderEmailForm() : renderResetForm()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;