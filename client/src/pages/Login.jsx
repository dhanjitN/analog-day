import { useState, useEffect } from "react";
import z from "zod"
import { toast, Toaster } from "sonner";
import { Moon, Sun } from "lucide-react";

const usernameSchema = z
  .string()
  .min(1, "Username is required.")
  .regex(/^[a-zA-Z0-9_]{3,20}$/, "Username must be 3-20 characters, letters/numbers/underscore only.");

const passwordSchema = z
  .string()
  .min(1, "Password is required.")
  .regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, "Password must be at least 6 characters and include a letter and a number.");

const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

const registerSchema = loginSchema
  .extend({ confirmPassword: z.string() })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

function useDarkMode() {
  const [dark, setDark] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return [dark, setDark];
}

const inputClass =
  "w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export default function AuthForm() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [dark, setDark] = useDarkMode();

  // stale password/confirm across mode switches is a bug, not a feature
  useEffect(() => {
    setForm({ username: "", password: "", confirmPassword: "" });
  }, [mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const schema = mode === "login" ? loginSchema : registerSchema;
    const result = schema.safeParse(form);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    // Replace with real API call
    toast.success(mode === "login" ? "Logged in successfully." : "Account created.");
  };

  const isLogin = mode === "login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950  transition-colors">
      <Toaster richColors position="top-right" />
      <div className="w-full max-w-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="p-6 pb-4">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {isLogin ? "Sign in" : "Create an account"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isLogin ? "Enter your credentials to continue." : "Fill in the details below to register."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 space-y-4">
            <div>
              <label htmlFor="username" className={labelClass}>Username</label>
              <input
                id="username"
                name="username"
                autoComplete="username"
                placeholder="jane_doe"
                value={form.username}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className={labelClass}>Confirm password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            )}
          </div>

          <div className="p-6 pt-5 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 transition-colors"
            >
              {isLogin ? "Log in" : "Register"}
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode(isLogin ? "register" : "login")}
                className="underline underline-offset-2 text-gray-900 dark:text-gray-100 hover:text-indigo-600"
              >
                {isLogin ? "Register" : "Log in"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}