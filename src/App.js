import "./App.css";
import TodoList from "./TodoList";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ToastProvider from "./Contexts/ToastContext";
import TodoProvider from "./Contexts/TodosContext";
function App() {
  const { i18n, t } = useTranslation();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
    localStorage.setItem("language", i18n.language);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [i18n]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <TodoProvider>
      <ToastProvider>
        <div
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-950 dark:to-blue-900 transition-all duration-500"
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <div className="w-full max-w-2xl mx-auto p-6 bg-white bg-opacity-90 rounded-3xl shadow-2xl border border-blue-100 dark:bg-gray-900 dark:bg-opacity-90 dark:border-gray-800">
            <div className="flex justify-end mb-6 gap-2">
              <button
                onClick={toggleDarkMode}
                className="px-4 py-2 font-semibold rounded-full shadow-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                title={darkMode ? t("light_mode") : t("dark_mode")}
              >
                {darkMode
                  ? i18n.language === "ar"
                    ? "وضع النهار"
                    : "Light Mode"
                  : i18n.language === "ar"
                  ? "وضع الليل"
                  : "Dark Mode"}
              </button>
              <button
                onClick={toggleLanguage}
                className="px-6 py-2 font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
              >
                {i18n.language === "ar" ? "English" : "العربية"}
              </button>
            </div>
            <TodoList />
          </div>
        </div>
      </ToastProvider>
    </TodoProvider>
  );
}

export default App;
