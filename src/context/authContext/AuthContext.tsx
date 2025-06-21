import { createContext, useContext,useEffect,useState } from "react";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import type { AuthContextType, User } from "@/types/type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);


  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const res = await fetch(`http://localhost:3000/users?email=${email}`);
      const data = await res.json();
      const role = data[0]?.role || "user";

      localStorage.setItem("role", role);
      setUser({ email: firebaseUser.email!, role });
    } catch (err) {
      console.error("Login error", err);
      throw err;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("role");
  };

     useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser?.email) {
        const res = await fetch(`http://localhost:3000/users?email=${firebaseUser.email}`);
        const data = await res.json();
        const role = data[0]?.role || "user";

        localStorage.setItem("role", role);
        setUser({ email: firebaseUser.email, role });
      } else {
        setUser(null);
        localStorage.removeItem("role");
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
