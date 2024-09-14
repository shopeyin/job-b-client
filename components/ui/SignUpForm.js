"use client";
import { useActionState } from "react";
import { SignupAction } from "@/lib/actions";

function SignUpForm() {
  const [formState, formAction, isPending] = useActionState(
    SignupAction,
    undefined
  );

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Create an Account
        </h1>

        {formState?.errors?.err && (
          <p className="text-red-600 text-sm mb-2">{formState?.errors?.err}</p>
        )}
        <form action={formAction} className="space-y-6">
          {/* Name Field */}
          <div>
            {formState?.errors?.name && (
              <p className="text-red-600 text-sm mb-2">
                {formState?.errors?.name?.join(", ")}
              </p>
            )}
            <input
              type="text"
              name="name"
              defaultValue={formState?.fieldData?.name}
              placeholder="Full Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            />
          </div>

          {/* Email Field */}
          <div>
            {formState?.errors?.email && (
              <p className="text-red-600 text-sm mb-2">
                {formState?.errors?.email?.join(", ")}
              </p>
            )}
            <input
              type="email"
              name="email"
              defaultValue={formState?.fieldData?.email}
              placeholder="Email Address"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            />
          </div>

          {/* Password Field */}
          <div>
            {formState?.errors?.password && (
              <p className="text-red-600 text-sm mb-2">
                {formState?.errors?.password?.join(", ")}
              </p>
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            {formState?.errors?.passwordConfirm && (
              <p className="text-red-600 text-sm mb-2">
                {formState?.errors?.passwordConfirm?.join(", ")}
              </p>
            )}
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            />
          </div>

          {/* Role Selection */}
          <div>
            <select
              name="role"
              defaultValue={formState?.fieldData?.role}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            >
              <option value="job_seeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isPending}
              aria-disabled={isPending}
              className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
            >
              {isPending ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignUpForm;
