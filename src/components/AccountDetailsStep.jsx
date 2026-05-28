import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AccountDetailsStep({
  register,
  errors,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (
    <div className="form-section">
      <div className="input-group">
        <label>Email Address</label>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />

        {errors.email && (
          <p className="error-text">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="input-group">
        <label>Password</label>

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            {...register("password")}
          />

          <button
            type="button"
            className="toggle-btn"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="error-text">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="input-group">
        <label>Confirm Password</label>

        <div className="password-field">
          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />

          <button
            type="button"
            className="toggle-btn"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="error-text">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </div>
  );
}