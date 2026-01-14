import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Por defecto: SIEMPRE tema claro
  const [theme, setTheme] = useState<Theme>("light");

  // Cada vez que cambia el tema, actualizamos <html> y localStorage
  useEffect(() => {
    const root = document.documentElement; // <html>

    // Primero nos aseguramos de limpiar cualquier rastro
    root.classList.remove("dark");

    if (theme === "dark") {
      root.classList.add("dark");
    }

    // Guardamos la preferencia (para usarla luego si queremos)
    localStorage.setItem("ahorrape-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};
