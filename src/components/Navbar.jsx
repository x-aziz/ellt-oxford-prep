import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useProfile } from "../hooks/useProfile.js";
import { useAdmin } from "../hooks/useAdmin.js";

const LINKS = [{ to: "/", label: "Dashboard", end: true }];

export default function Navbar() {
  const { displayName } = useProfile();
  const { isAdmin } = useAdmin();

  return (
    <header className="navbar">
      <span className="brand">
        <b>ELLT</b> Oxford Prep
      </span>
      <nav>
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            {l.label}
          </NavLink>
        ))}
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            ⚙ Admin
          </NavLink>
        )}
      </nav>
      <div className="user">
        <span>{displayName}</span>
        <button className="signout" onClick={() => signOut(auth)}>
          Sign out
        </button>
      </div>
    </header>
  );
}
