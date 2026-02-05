import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Emulator from "./pages/Emulator";
import Nintendo from "./pages/Nintendo";
import Ps2 from "./pages/Ps2";
import Ps3 from "./pages/Ps3";
import Psp from "./pages/Psp";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* subtle background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.10),transparent_45%)]" />

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emulator" element={<Emulator />} />
          <Route path="/nintendo" element={<Nintendo />} />
          <Route path="/ps2" element={<Ps2 />} />
          <Route path="/ps3" element={<Ps3 />} />
          <Route path="/psp" element={<Psp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="border-t border-zinc-800/70 bg-zinc-950/60">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-zinc-400 sm:px-6">
          © {new Date().getFullYear()} My Website • Built with React + Tailwind
        </div>
      </footer>
    </div>
  );
}
