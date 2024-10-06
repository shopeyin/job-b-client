"use client";
import { useActionState } from "react";
import { LoginAction } from "../../lib/actions";

export default function LoginForm() {
  const [formState, formAction, isPending] = useActionState(
    LoginAction,
    undefined
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <p className="text-red-600 text-sm mb-1 text-center">
          {formState?.errors?.err}
        </p>
        <div>
          <h2 className="text-center text-3xl font-extrabold text-dark-blue">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="/signup"
              className="font-medium text-teal hover:text-light-blue"
            >
              create a new account
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              {formState?.errors?.email && (
                <p className="text-red-600 text-sm mb-1">
                  {formState?.errors?.email?.join(", ")}
                </p>
              )}
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={formState?.fieldData?.email}
                required
                className={`relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-light-blue focus:outline-none focus:ring-light-blue sm:text-sm ${
                  formState?.errors?.email ? "border-red-500" : ""
                }`}
                placeholder="Email address"
              />
            </div>
            <div>
              {formState?.errors?.password && (
                <p className="text-red-600 text-sm mb-1">
                  {formState?.errors?.password?.join(", ")}
                </p>
              )}
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-light-blue focus:outline-none focus:ring-light-blue sm:text-sm ${
                  formState?.errors?.password ? "border-red-500" : ""
                }`}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-teal focus:ring-light-blue border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-teal hover:text-light-blue"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              aria-disabled={isPending}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-dark-blue py-2 px-4 text-sm font-medium text-white hover:bg-teal focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-2"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
