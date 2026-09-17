import { useState } from "react";
import { Shield, Lock, User, Eye, EyeOff, X, ArrowRight } from "lucide-react";

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-navy-900/30 rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-[#0f172a] px-6 py-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">BhumiPredict</h1>
              <p className="text-slate-400 text-xs">AI Land Acquisition Delay Intelligence Portal</p>
            </div>
          </div>
          <p className="text-slate-500 text-[10px] mt-3 tracking-wider uppercase">SIH 2026 · PS 26017 · Government of Tamil Nadu</p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">Official Email</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="name@tn.gov.in"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-10 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-950/50 border border-red-800 rounded-lg px-3 py-2 text-red-400 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            Secure Login <ArrowRight className="w-4 h-4" />
          </button>

          <div className="border-t border-slate-700 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-xs uppercase tracking-wider">Demo Credentials</span>
              <button
                type="button"
                onClick={fillDemo}
                className="text-blue-400 text-xs hover:text-blue-300 font-medium transition-colors"
              >
                Autofill
              </button>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Email</span>
                <span className="text-slate-300 font-mono">collector@tn.gov.in</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Password</span>
                <span className="text-slate-300 font-mono">sih2026</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <button
        onClick={fillDemo}
        className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
