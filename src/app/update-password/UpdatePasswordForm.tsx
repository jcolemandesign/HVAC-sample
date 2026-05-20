"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type PageStatus = "checking" | "ready" | "updating" | "success" | "error";

function getHashValue(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return new URLSearchParams(window.location.hash.replace(/^#/, "")).get(key);
}

function clearRecoveryTokensFromUrl() {
  window.history.replaceState(null, "", "/update-password");
}

function getRecoveryErrorMessage(error: { message: string; name?: string }) {
  const message = error.message.toLowerCase();

  if (error.name === "AuthPKCECodeVerifierMissingError" || message.includes("code verifier")) {
    return "This reset link is missing its browser verification state. Request a new reset link from the login page, then open the newest email link.";
  }

  return error.message;
}

export function UpdatePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<PageStatus>("checking");
  const [message, setMessage] = useState("Checking your recovery link...");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    let isMounted = true;

    const prepareRecoverySession = async () => {
      const supabase = createClient();
      const code = searchParams.get("code");
      const accessToken = getHashValue("access_token");
      const refreshToken = getHashValue("refresh_token");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!isMounted) {
          return;
        }

        if (error) {
          setStatus("error");
          setMessage(getRecoveryErrorMessage(error));
          return;
        }

        clearRecoveryTokensFromUrl();
      } else if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (!isMounted) {
          return;
        }

        if (error) {
          setStatus("error");
          setMessage(error.message);
          return;
        }

        clearRecoveryTokensFromUrl();
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (!session) {
        setStatus("error");
        setMessage("This recovery link is invalid or expired. Request a new reset link from the login page.");
        return;
      }

      setStatus("ready");
      setMessage("Enter a new password for your account.");
    };

    prepareRecoverySession();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("updating");
    setMessage("");

    if (password.length < 8) {
      setStatus("ready");
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("ready");
      setMessage("Passwords do not match.");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("ready");
      setMessage(error.message);
      return;
    }

    setStatus("success");
    setMessage("Password updated. Redirecting to login...");
    window.setTimeout(() => router.push("/login"), 1400);
  };

  const isBusy = status === "checking" || status === "updating" || status === "success";
  const isError = status === "error";

  return (
    <form
      className="rounded-[5px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-7 shadow-[0_18px_36px_rgba(21,36,53,0.08)] sm:p-9"
      onSubmit={handleSubmit}
    >
      <p className="type-eyebrow uppercase text-[#273c5b]">Password recovery</p>
      <h1 className="type-card-header mt-3 text-[#273c5b]">Create a new password</h1>

      {message ? (
        <p
          className={`type-small mt-4 rounded-[5px] border px-4 py-3 ${
            isError
              ? "border-[#cc0d0d]/30 bg-[#cc0d0d]/10 text-[#cc0d0d]"
              : "border-[#169bd5]/30 bg-[#169bd5]/10 text-[#273c5b]"
          }`}
        >
          {message}
        </p>
      ) : null}

      <div className="mt-8 grid gap-5">
        <label className="type-small grid gap-2 font-semibold uppercase tracking-[0.08em] text-[#273c5b]">
          New password
          <input
            autoComplete="new-password"
            className="type-regular h-12 rounded-[5px] border border-[#273c5b]/24 bg-white/80 px-4 text-[#152435] outline-none transition placeholder:text-[#273c5b]/45 focus:border-[#169bd5] focus:ring-4 focus:ring-[#169bd5]/15 disabled:opacity-65"
            disabled={isBusy || isError}
            minLength={8}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter new password"
            required
            type="password"
            value={password}
          />
        </label>

        <label className="type-small grid gap-2 font-semibold uppercase tracking-[0.08em] text-[#273c5b]">
          Confirm password
          <input
            autoComplete="new-password"
            className="type-regular h-12 rounded-[5px] border border-[#273c5b]/24 bg-white/80 px-4 text-[#152435] outline-none transition placeholder:text-[#273c5b]/45 focus:border-[#169bd5] focus:ring-4 focus:ring-[#169bd5]/15 disabled:opacity-65"
            disabled={isBusy || isError}
            minLength={8}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm new password"
            required
            type="password"
            value={confirmPassword}
          />
        </label>
      </div>

      <button
        className="hero-primary-cta mt-8 inline-flex h-12 w-full items-center justify-center rounded-[5px] bg-[#cc0d0d] px-6 text-base font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#e11212] disabled:cursor-wait disabled:opacity-70"
        disabled={isBusy || isError}
        type="submit"
      >
        {status === "updating" ? "Updating" : "Update Password"}
      </button>
    </form>
  );
}
