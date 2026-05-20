"use client";

import { useState } from "react";
import { createPasswordResetClient } from "@/utils/supabase/password-reset-client";

type ResetStatus = "idle" | "sending" | "sent" | "error";

export function PasswordResetRequest() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<ResetStatus>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setStatus("error");
      setMessage("Enter your email address.");
      return;
    }

    const supabase = createPasswordResetClient();
    const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("sent");
    setMessage("Check your email for a password reset link. Use the newest email if you requested more than one.");
  };

  return (
    <form className="mt-8 border-t border-[#273c5b]/12 pt-7" onSubmit={handleSubmit}>
      <p className="type-small font-semibold uppercase tracking-[0.08em] text-[#273c5b]">
        Reset password
      </p>
      <label className="type-small mt-4 grid gap-2 font-semibold uppercase tracking-[0.08em] text-[#273c5b]">
        Email address
        <input
          autoComplete="email"
          className="type-regular h-12 rounded-[5px] border border-[#273c5b]/24 bg-white/80 px-4 text-[#152435] outline-none transition placeholder:text-[#273c5b]/45 focus:border-[#169bd5] focus:ring-4 focus:ring-[#169bd5]/15"
          name="reset-email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin@example.com"
          type="email"
          value={email}
        />
      </label>

      {message ? (
        <p
          className={`type-small mt-4 rounded-[5px] border px-4 py-3 ${
            status === "sent"
              ? "border-[#169bd5]/30 bg-[#169bd5]/10 text-[#273c5b]"
              : "border-[#cc0d0d]/30 bg-[#cc0d0d]/10 text-[#cc0d0d]"
          }`}
        >
          {message}
        </p>
      ) : null}

      <button
        className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-[5px] border border-[#273c5b]/24 px-5 text-sm font-semibold uppercase tracking-[0.04em] text-[#273c5b] transition hover:border-[#273c5b] hover:bg-white/55 disabled:cursor-wait disabled:opacity-70"
        disabled={status === "sending"}
        type="submit"
      >
        {status === "sending" ? "Sending" : "Send Reset Link"}
      </button>
    </form>
  );
}
