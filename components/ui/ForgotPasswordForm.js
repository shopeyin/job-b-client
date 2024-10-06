"use client";
import { useActionState } from "react";
import { ForgotPasswordAction } from "../../lib/actions";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [formState, formAction, isPending] = useActionState(
    ForgotPasswordAction,
    undefined
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          {formState?.errors?.email && (
            <p className="text-red-600 text-sm mb-2">
              {formState?.errors?.email?.join(", ")}
            </p>
          )}
        </div>
        {formState?.fieldData?.message && (
          <p className="text-red-600 text-sm mb-1 text-center">
            {formState?.fieldData?.message}
          </p>
        )}
        <div>
          <h2 className="text-center text-3xl font-extrabold text-dark-blue">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            No worries! Enter your email and we'll send you a link to reset your
            password.
          </p>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={formState?.fieldData?.email}
                required
                className={`relative block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-light-blue focus:outline-none focus:ring-light-blue sm:text-sm ${
                  formState?.errors?.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Email address"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              aria-disabled={isPending}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-dark-blue py-2 px-4 text-sm font-medium text-white hover:bg-teal focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-2"
            >
              {isPending ? "Sending reset link..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        {/* Back to Sign In */}
        <div className="text-center mt-4">
          <Link
            href="/login"
            className="font-medium text-teal hover:text-dark-blue"
          >
            {" "}
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
