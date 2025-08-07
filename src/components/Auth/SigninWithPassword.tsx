"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { RiErrorWarningLine } from "@remixicon/react";
import ErrorElement from "../ui-elements/ErrorElement";

export default function SigninWithPassword() {

  const searchParams = useSearchParams();

  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!data.email || !data.password) {
      setError("Please fill required fields.");
      return;
    }

    // You can remove this code block
    setLoading(true);

    await signIn("email", {
      email: data.email,
      password: data.password,
      callbackUrl: "/app",
    });

  };

  useEffect(() => {
    const loginError = searchParams.get('error');
    console.log(loginError)

    if (loginError) {
      setError("Incorrect login credentials!");
    }

  }, [searchParams])

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="text"
        label="Username or Email address"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="Enter your email or username"
        name="email"
        handleChange={handleChange}
        value={data.email}
        icon={<EmailIcon />}
      />

      <InputGroup
        type={showPassword ? "text" : "password"}
        label="Password"
        className="mb-5 [&_input]:py-[15px]"
        placeholder="Enter your password"
        name="password"
        handleChange={handleChange}
        value={data.password}
        icon={<PasswordIcon />}
      />

      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="Show password"
          name="show-password"
          withIcon="check"
          minimal
          radius="md"
          onChange={(e) =>
            setShowPassword(e.target.checked)
          }
        />
        
        <Checkbox
          label="Remember me"
          name="remember"
          withIcon="check"
          minimal
          radius="md"
          onChange={(e) =>
            setData({
              ...data,
              remember: e.target.checked,
            })
          }
        />
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          {loading ? "Verifying..." : "Sign In"}
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
      {
        error &&
        <ErrorElement
          message={error}
        />
      }
    </form>
  );
}
