"use client";

import { useState } from "react";
import { Droplets, Mail, Phone, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { validateMobile, validateEmail } from "@/lib/utils";

type Tab = "admin" | "agent";

export default function LoginPage() {
  const { login } = useAuth();
  const [tab, setTab] = useState<Tab>("admin");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotMobile, setForgotMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleTestLogin = async (role: "admin" | "agent") => {
    setIsLoading(true);
    setError("");
    try {
      await login(role, {
        email: role === "admin" ? "admin@test.com" : undefined,
        mobile: role === "agent" ? "9999999999" : undefined,
        password: "test@123",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Test login failed");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (tab === "admin") {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }
    } else {
      if (!validateMobile(mobile)) {
        setError("Please enter a valid 10-digit mobile number");
        return;
      }
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setIsLoading(true);
    try {
      await login(tab, {
        email: tab === "admin" ? email : undefined,
        mobile: tab === "agent" ? mobile : undefined,
        password,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
    if (!validateMobile(forgotMobile)) {
      setForgotError("Please enter a valid 10-digit mobile number");
      return;
    }
    setForgotLoading(true);
    try {
      // In production this would call the backend API
      await new Promise((r) => setTimeout(r, 1000));
      setForgotStep(2);
    } catch {
      setForgotError("Failed to send OTP. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
    if (otp.length < 4) {
      setForgotError("Please enter a valid OTP");
      return;
    }
    if (newPassword.length < 6) {
      setForgotError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setForgotError("Passwords do not match");
      return;
    }
    setForgotLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setForgotSuccess("Password reset successfully! Please log in with your new password.");
      setTimeout(() => {
        setShowForgot(false);
        setForgotStep(1);
        setForgotMobile("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setForgotSuccess("");
      }, 3000);
    } catch {
      setForgotError("Failed to reset password. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  if (showForgot) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
              <Droplets className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {forgotStep === 1
                ? "Enter your registered mobile number to receive an OTP"
                : "Enter the OTP and your new password"}
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            {forgotSuccess && (
              <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">
                {forgotSuccess}
              </div>
            )}
            {forgotError && (
              <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {forgotError}
              </div>
            )}
            {forgotStep === 1 ? (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="forgot-mobile" className="mb-1.5 block text-sm font-medium text-foreground">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="forgot-mobile"
                      type="tel"
                      maxLength={10}
                      value={forgotMobile}
                      onChange={(e) => setForgotMobile(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter 10-digit mobile number"
                      className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {forgotLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Send OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="otp" className="mb-1.5 block text-sm font-medium text-foreground">
                    OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter OTP"
                    className="w-full rounded-lg border bg-background py-2.5 px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="mb-1.5 block text-sm font-medium text-foreground">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full rounded-lg border bg-background py-2.5 px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-medium text-foreground">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full rounded-lg border bg-background py-2.5 px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {forgotLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Reset Password
                </button>
              </form>
            )}
            <button
              type="button"
              onClick={() => {
                setShowForgot(false);
                setForgotStep(1);
                setForgotError("");
              }}
              className="mt-4 w-full text-center text-sm text-primary hover:underline"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-12">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <Droplets className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Aerocity</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to the management portal</p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          {/* Tabs */}
          <div className="mb-6 flex rounded-lg bg-muted p-1">
            <button
              type="button"
              onClick={() => { setTab("admin"); setError(""); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                tab === "admin"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Admin Login
            </button>
            <button
              type="button"
              onClick={() => { setTab("agent"); setError(""); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                tab === "agent"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Agent Login
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {process.env.NEXT_PUBLIC_BYPASS_AUTH === "true" && (
            <div className="mb-4 rounded-lg bg-blue-50 p-3">
              <p className="mb-2 text-xs font-medium text-blue-700">🧪 Test Mode - Quick Login:</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleTestLogin("admin")}
                  disabled={isLoading}
                  className="flex-1 rounded bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? "..." : "Test Admin"}
                </button>
                <button
                  type="button"
                  onClick={() => handleTestLogin("agent")}
                  disabled={isLoading}
                  className="flex-1 rounded bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? "..." : "Test Agent"}
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tab === "admin" ? (
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@aerocity.com"
                    autoComplete="email"
                    className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="mobile" className="mb-1.5 block text-sm font-medium text-foreground">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="mobile"
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 10-digit mobile number"
                    autoComplete="tel"
                    className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-10 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {tab === "agent" && (
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="self-end text-xs text-primary hover:underline"
              >
                Forgot Password?
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign In
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {"This portal is for authorized personnel only."}
        </p>
      </div>
    </div>
  );
}
