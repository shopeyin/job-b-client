"use client";
import { useActionState } from "react";
import { SignupAction } from "@/lib/actions";

function SignUpForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    SignupAction,
    undefined
  );
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Sign Up
        </h1>
        <form action={formAction} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="role"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="employer">Employer</option>
            <option value="job_seeker">Job Seeker</option>
          </select>
          <div>
            <button
              type="submit"
              aria-disabled={isPending}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isPending ? "Signing up..." : "Sign up"}
            </button>
          </div>
          {errorMessage && (
            <p className="mt-2 text-center text-sm text-red-600">
              {errorMessage.message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

export default SignUpForm;
