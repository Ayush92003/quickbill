import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, FilePlus, FileText, User, Menu, X } from "lucide-react";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0";
    toast.success("Logout Successfully");
    navigate("/");
  };

  const navItems = [
    {
      path: "/create-invoice",
      label: "Create Invoice",
      icon: <FilePlus size={18} />,
    },
    { path: "/invoices", label: "Invoices", icon: <FileText size={18} /> },
    { path: "/profile", label: "Profile", icon: <User size={18} /> },
  ];

  return (
    <nav className="bg-gray-900 shadow-md text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard">
          <h1 className="text-xl font-bold text-yellow-400 tracking-wide">
            QuickBill
          </h1>
        </Link>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "bg-yellow-500 text-black font-semibold"
                    : "hover:bg-gray-800 hover:text-yellow-400"
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="cursor-pointer flex items-center gap-1 px-2 py-1 rounded-md text-red-400 hover:bg-red-800 hover:text-white transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block flex items-center gap-2 px-3 py-2 rounded-md transition
                ${
                  location.pathname === item.path
                    ? "bg-yellow-500 text-black font-semibold"
                    : "hover:bg-gray-800 hover:text-yellow-400"
                }
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="cursor-pointer w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-red-400 hover:bg-red-800 hover:text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
