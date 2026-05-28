import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import PersonalInfoStep from "./components/PersonalInfoStep";
import AccountDetailsStep from "./components/AccountDetailsStep";
import ReviewSubmitStep from  "./components/ReviewSubmitStep";

import "./styles/registration.css";

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dob: z.string().min(1, "Date of birth is required"),
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email"),
    password: z.string().min(8, "Minimum 8 characters required"),
    confirmPassword: z.string().min(1, "Please confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const steps = [
  "Personal Information",
  "Account Details",
  "Review & Submit",
];

export default function RegistrationWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const nextStep = async () => {
    let fields = [];

    if (step === 1) {
      fields = ["firstName", "lastName", "dob"];
    }

    if (step === 2) {
      fields = ["email", "password", "confirmPassword"];
    }

    const valid = await trigger(fields);

    if (valid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="wizard-container success-container">
        <div className="success-icon">✓</div>

        <h2>Registration Successful</h2>

        <p>
          Account created for <strong>{getValues("email")}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="wizard-container">
      <div className="wizard-header">
        <p className="step-label">
          Step {step} of 3
        </p>

        <h1>{steps[step - 1]}</h1>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <PersonalInfoStep register={register} errors={errors} />
        )}

        {step === 2 && (
          <AccountDetailsStep register={register} errors={errors} />
        )}

        {step === 3 && <ReviewSubmitStep data={getValues()} />}

        <div className="button-group">
          {step > 1 ? (
            <button
              type="button"
              className="secondary-btn"
              onClick={prevStep}
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              className="primary-btn"
              onClick={nextStep}
            >
              Next
            </button>
          ) : (
            <button type="submit" className="primary-btn">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}