import { useTranslation } from "react-i18next";

export default function ToggleButtons({ value, changeChecked }) {
  const { t, i18n } = useTranslation();
  const buttons = [
    { key: "notCompleted", label: t("not_completed") },
    { key: "completed", label: t("completed") },
    { key: "all", label: t("all") },
  ];
  return (
    <div
      className={`flex justify-center gap-2 md:gap-4 my-8 ${
        i18n.language === "ar" ? "flex-row-reverse" : ""
      }`}
    >
      {buttons.map((btn) => (
        <button
          key={btn.key}
          onClick={() => changeChecked(btn.key)}
          className={`px-3 py-1.5 text-sm md:px-6 md:py-2 md:text-base rounded-full font-semibold shadow-md border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300
            ${
              value === btn.key
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent scale-105 dark:from-blue-700 dark:to-purple-800"
                : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50 hover:border-blue-500 dark:bg-gray-800 dark:text-blue-100 dark:border-blue-700 dark:hover:bg-gray-900"
            }
          `}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
