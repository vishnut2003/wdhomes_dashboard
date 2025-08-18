'use client';

import {
  CallIcon,
  EmailIcon,
  PasswordIcon,
  PencilSquareIcon,
  UserIcon,
} from "@/assets/icons";
import { Checkbox } from "@/components/FormElements/checkbox";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { handleMyAccountFormSubmit } from "./handleFormSubmit";
import { RiLoaderLine } from "@remixicon/react";
import ErrorElement from "@/components/ui-elements/ErrorElement";
import SuccessElement from "@/components/ui-elements/SuccessElement";

export function PersonalInfoForm(user: {
  fullname: string,
  nickname: string,
  username: string,
  email: string,
  userId: string,
}) {

  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(false)

  const [formData, setFormData] = useState<{
    username: string,
    nickname: string,
    fullname: string,
    email: string,
    password: string,
  }>({
    ...user,
    password: "",
  });

  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <ShowcaseSection title="Personal Information" className="!p-7">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleMyAccountFormSubmit({
            resetPassword,
            setError,
            setInProgress,
            setSuccess,
            userId: user.userId,
            ...formData,
          });
        }}
      >
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="fullname"
            label="Full Name"
            placeholder="David Jhon"
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
            value={formData.fullname}
            handleChange={handleInputChange}
          />

          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="nickname"
            label="Nickname"
            placeholder="David"
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
            value={formData.nickname}
            handleChange={handleInputChange}
          />
        </div>

        <InputGroup
          className="mb-5.5"
          type="email"
          name="email"
          label="Email Address"
          placeholder="devidjond45@gmail.com"
          icon={<EmailIcon />}
          iconPosition="left"
          height="sm"
          value={formData.email}
          handleChange={handleInputChange}
        />

        <InputGroup
          className="mb-5.5"
          type="text"
          name="username"
          label="Username"
          placeholder="devidjhon24"
          icon={<UserIcon />}
          iconPosition="left"
          height="sm"
          value={formData.username}
          handleChange={handleInputChange}
        />

        {/* Reset Password */}

        <div
          className="flex items-end gap-3 mb-5.5"
        >
          <InputGroup
            label="Reset Password"
            placeholder="Enter new password"
            name="password"
            type={showPassword ? "text" : "password"}
            disabled={!resetPassword}
            icon={<PasswordIcon />}
            iconPosition="left"
            className="w-full"
            value={formData.password}
            handleChange={handleInputChange}
          />

          <Button
            variant={"primary"}
            shape={"rounded"}
            size={"small"}
            label={resetPassword ? "Disable" : "Reset"}
            type="button"
            onClick={() => setResetPassword(prev => !prev)}
          />
        </div>

        <div
          className="mb-5.5"
        >
          <Checkbox
            label="Show Password"
            onChange={(event) => setShowPassword(event.target.checked)}
          />
        </div>

        {
          error &&
          <ErrorElement
            message={error}
          />
        }

        {
          success &&
          <SuccessElement
            message="Changed saved"
          />
        }

        <div className="flex justify-end gap-3 mt-5.5">
          <button
            className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
            onClick={() => router.push('/app')}
          >
            Cancel
          </button>

          <Button
            label="Save"
            type="submit"
            shape={"rounded"}
            size={"small"}
            icon={
              inProgress &&
              <RiLoaderLine
                size={20}
                className="animate-spin"
              />
            }
          />
        </div>
      </form>
    </ShowcaseSection>
  );
}
