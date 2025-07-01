"use client";
import React, { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ThemeMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDark(savedTheme === "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <label className="cursor-pointer flex items-center gap-2">
      <input
        type="checkbox"
        className="toggle"
        checked={isDark}
        onChange={toggleTheme}
      />
      {isDark ? <MdDarkMode data-testid="MdDarkMode" size={20} color="yellow" /> : <MdLightMode data-testid="MdLightMode" size={20} color="orange" />}
    </label>
  );
};

export default ThemeMode;
