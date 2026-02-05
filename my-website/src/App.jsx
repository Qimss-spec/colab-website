// src/App.jsx
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

import Protected from "./pages/Protected";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emulator" element={<Emulator />} />
          <Route path="/nintendo" element={<Nintendo />} />
          <Route path="/ps2" element={<Ps2 />} />
          <Route path="/ps3" element={<Ps3 />} />
          <Route path="/psp" element={<Psp />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* protected routes */}
          <Route element={<Protected />}>
            {/* letak route yang perlu login di sini */}
          </Route>

          {/* admin only */}
          <Route element={<Protected adminOnly />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
