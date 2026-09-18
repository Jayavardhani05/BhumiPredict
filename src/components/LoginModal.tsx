import { useState } from "react";
import { Shield, Lock, User, Eye, EyeOff, ArrowRight, Building2 } from "lucide-react";

interface LoginModalProps {
  onLogin: () => void;
}

export default function LoginModal({ onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("collector@tn.gov.in");
  const [password, setPassword] = useState("sih2026");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "collector@tn.gov.in" && password === "sih2026") {
      onLogin();
    } else {
      setError("Invalid credentials. Use the demo account below.");
    }
  };

  const fillDemo = () => {
    setEmail("collector@tn.gov.in");
    setPassword("sih2026");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#F5F7F9] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#EAF3F8] rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 opacity-60" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#EAF3F8] rounded-full blur-3xl translate-x-1/3 translate-y-1/3 opacity-60" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Top branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#123B5D] mb-3 shadow-sm">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-[#123B5D] font-bold text-xl">BhumiPredict</h1>
          <p className="text-[#64748B] text-sm mt-1">AI Land Acquisition Delay Intelligence Portal</p>
          <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 bg-[#EAF3F8] border border-[#D9E1E7] rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#198754]" />
            <span className="text-[#64748B] text-[10px] font-medium">SIH 2026 · Prototype · PS 26017</span>
          </div>
        </div>

        {/* Login card */}
        <div className="bg-white border border-[#D9E1E7] rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 pt-5 pb-2">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-4 h-4 text-[#1D5D8F]" />
              <span className="text-[#1F2937] text-sm font-semibold">Officer Login</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
            <div>
              <label className="block text-[#1F2937] text-sm font-medium mb-1.5">Official Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#D9E1E7] rounded-md pl-10 pr-3 py-2.5 text-[#1F2937] text-sm focus:outline-none focus:border-[#1D5D8F] focus:ring-1 focus:ring-[#1D5D8F] transition-colors"
                  placeholder="name@tn.gov.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#1F2937] text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#D9E1E7] rounded-md pl-10 pr-10 py-2.5 text-[#1F2937] text-sm focus:outline-none focus:border-[#1D5D8F] focus:ring-1 focus:ring-[#1D5D8F] transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1F2937] transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-[#FDEDEC] border border-[#C0392B]/30 rounded-md px-3 py-2 text-[#C0392B] text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#123B5D] hover:bg-[#1D5D8F] text-white font-semibold py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              Secure Login <ArrowRight className="w-4 h-4" />
            </button>

            <div className="border-t border-[#D9E1E7] pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#64748B] text-xs uppercase tracking-wider font-medium">Demo Credentials</span>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="text-[#1D5D8F] text-xs hover:text-[#123B5D] font-medium transition-colors"
                >
                  Autofill
                </button>
              </div>
              <div className="bg-[#F5F7F9] border border-[#D9E1E7] rounded-md px-3 py-2 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Email</span>
                  <span className="text-[#1F2937] font-mono">collector@tn.gov.in</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Password</span>
                  <span className="text-[#1F2937] font-mono">sih2026</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        <p className="text-center text-[#64748B] text-[10px] mt-4 px-4">
          This is a prototype application for SIH 2026 demonstration purposes.
          Not an official government website.
        </p>
      </div>
    </div>
  );
}
