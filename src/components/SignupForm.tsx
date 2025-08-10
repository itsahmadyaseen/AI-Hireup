"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [userType, setUserType] = useState("candidate");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthText, setPasswordStrengthText] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData((prev) => ({ ...prev, company: "" }));
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, password: value });
    const strength = getPasswordStrength(value);
    setPasswordStrength(strength);
    setPasswordStrengthText(
      ["Very weak", "Weak", "Fair", "Strong"][Math.max(0, strength - 1)] || ""
    );
    if (formData.confirmPassword) {
      setPasswordMatch(
        value === formData.confirmPassword ? "match" : "no-match"
      );
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, confirmPassword: value });
    setPasswordMatch(
      formData.password === value ? "match" : value.length > 0 ? "no-match" : ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      (userType === "company" && !formData.company) ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return setError("All fields are required");
    }
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setIsLoading(true);

    try {
      const role = userType === "candidate" ? "candidate" : "recruiter";

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role, // sending role explicitly
          marketing,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push(`/dashboard/${data.user.role}`);
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => handleUserTypeChange("candidate")}
            className={`flex-1 py-2 rounded ${
              userType === "candidate"
                ? "bg-indigo-100 border border-indigo-500"
                : "bg-gray-100"
            }`}
          >
            Candidate
          </button>
          <button
            type="button"
            onClick={() => handleUserTypeChange("company")}
            className={`flex-1 py-2 rounded ${
              userType === "company"
                ? "bg-indigo-100 border border-indigo-500"
                : "bg-gray-100"
            }`}
          >
            Recruiter
          </button>
        </div>

        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
          className="w-full p-3 border rounded"
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
          className="w-full p-3 border rounded"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="w-full p-3 border rounded"
        />
        {userType === "company" && (
          <input
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company Name"
            required
            className="w-full p-3 border rounded"
          />
        )}

        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
            className="w-full p-3 border rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-3 right-3 text-gray-500"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex space-x-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded ${
                passwordStrength > i
                  ? strengthColors[passwordStrength - 1]
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-600">{passwordStrengthText}</p>

        <div className="relative">
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm Password"
            required
            className="w-full p-3 border rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-3 right-3 text-gray-500"
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <p
          className={`text-xs ${
            passwordMatch === "match"
              ? "text-green-600"
              : passwordMatch === "no-match"
              ? "text-red-600"
              : "text-gray-500"
          }`}
        >
          {passwordMatch === "match"
            ? "Passwords match"
            : passwordMatch === "no-match"
            ? "Passwords do not match"
            : ""}
        </p>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            required
          />
          <span className="text-sm text-gray-700">
            I agree to the Terms and Privacy Policy
          </span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
          />
          <span className="text-sm text-gray-700">
            Send me updates and tips
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-indigo-600 hover:underline"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
}
