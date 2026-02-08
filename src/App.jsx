import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { pageThemes } from "./config/pageThemes.js";


import Home from "./pages/Home";
import Emulator from "./pages/Emulator";
import Nintendo from "./pages/Nintendo";
import Ps2 from "./pages/Ps2";
import Ps3 from "./pages/Ps3";
import Psp from "./pages/Psp";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

function PageBackground({ children }) {
  const { pathname } = useLocation();

  const path = (pathname || "/").toLowerCase().replace(/\/+$/, "") || "/";

  const key =
    path === "/" ? "home" :
    path.startsWith("/emulator") ? "emulator" :
    path.startsWith("/nintendo") ? "nintendo" :
    path.startsWith("/ps2") ? "ps2" :
    path.startsWith("/ps3") ? "ps3" :
    path.startsWith("/psp") ? "psp" :
    path.startsWith("/admin") ? "admin" :
    path.startsWith("/login") || path.startsWith("/register") ? "auth" :
    "home";

  const background = pageThemes[key] || pageThemes.home;

  return (
    <div
      className="min-h-screen bg-zinc-950 text-zinc-100 relative overflow-hidden"
      style={{ backgroundImage: background }}
    >
      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.5))]" />

      {/* top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/25 to-transparent" />

      <div className="relative">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <PageBackground>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Emulator" element={<Emulator />} />
          <Route path="/Nintendo" element={<Nintendo />} />
          <Route path="/Ps2" element={<Ps2 />} />
          <Route path="/Ps3" element={<Ps3 />} />
          <Route path="/Psp" element={<Psp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </PageBackground>
  );
}
