"use client";
import { useActionState } from "react";
import { ResetPasswordAction } from "../../lib/actions";
import Link from "next/link";

export default function ResetPasswordForm({ token }) {
  const [formState, formAction, isPending] = useActionState(
    ResetPasswordAction.bind(null, token),
    undefined
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-dark-blue">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below.
          </p>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          {/* Display General Errors */}
          {formState?.fieldData?.message && (
            <p className="text-red-600 text-sm mb-1 text-center">
              {formState?.fieldData?.message}
            </p>
          )}

          <div className="text-center">
            {formState?.errors?.passwordConfirm && (
              <p className="text-red-600 text-sm mb-2">
                {formState?.errors?.passwordConfirm?.join(", ")}
              </p>
            )}
          </div>

          {/* Password Fields */}
          <div className="rounded-md shadow-sm space-y-4">
            {/* New Password */}
            <div>
              <label htmlFor="new-password" className="sr-only">
                New Password
              </label>

              <input
                id="new-password"
                name="password"
                type="password"
                required
                className={`relative block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-light-blue focus:outline-none focus:ring-light-blue sm:text-sm ${
                  formState?.errors?.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="New Password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>

              <input
                id="confirm-password"
                name="passwordConfirm"
                type="password"
                required
                className={`relative block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-light-blue focus:outline-none focus:ring-light-blue sm:text-sm `}
                placeholder="Confirm New Password"
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
              {isPending ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>

        {/* Back to Sign In */}
        <div className="text-center mt-4">
          <a
            href="/signin"
            className="font-medium text-teal hover:text-dark-blue"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
