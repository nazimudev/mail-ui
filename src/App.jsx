import { Route, Routes } from "react-router-dom";
import AuthCard from "./components/AuthCard";
import CodeSection from "./components/CodeSection";
import Footer from "./components/Footer";
import TwoStepVerification from "./components/TwoStepVerification.jsx";
import PasscodeVerification from "./components/PasscodeVerification.jsx";

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<AuthCard />} />
          <Route path="/code" element={<CodeSection />} />
          <Route path="mfa" element={<TwoStepVerification/>} />
          <Route path="pass-code" element={<PasscodeVerification/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
