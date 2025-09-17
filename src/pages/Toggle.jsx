import React from "react";

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">☀️</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="sr-only"
        />
        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer transition-colors duration-300"></div>
        <div
          className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
            theme === "dark" ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </label>
      <span className="text-sm">🌙</span>
    </div>
  );
};

export default Toggle;




