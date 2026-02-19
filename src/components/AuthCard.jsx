import { useState } from "react";
import EmailSection from "./EmailSection";
import PassSection from "./PassSection";

export default function AuthCard() {

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");

  return (
    <>
      {step === "email" && (
        <EmailSection setStep={setStep} setEmail={setEmail} />
      )}

      {step === "password" && <PassSection email={email} />}
    </>
  );
}
