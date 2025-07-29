import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ToastContext } from "./Contexts/ToastContext";

export default function Todo({
  todoArray,
  checkFunction,
  openUpdatePopup,
  openDeletePopup,
}) {
  const toast = useContext(ToastContext);
  const { t, i18n } = useTranslation();

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="bg-gray-50 border border-blue-100 rounded-xl shadow-md p-4 flex justify-between items-center gap-4 hover:shadow-lg transition-all duration-200 my-4 dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex-1 min-w-0">
        <h2
          className={`text-xl md:text-2xl break-words font-bold mb-2 ${
            todoArray.completed
              ? "line-through text-gray-400 dark:text-gray-500"
              : "text-blue-900 dark:text-blue-100"
          }`}
        >
          {todoArray.title}
        </h2>
        <p className="text-gray-600 text-sm break-words dark:text-gray-300">
          {todoArray.details}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <button
          onClick={() => {
            checkFunction(todoArray.id);
            toast.showToast(
              `${
                todoArray.completed ? t("toastNotComplete") : t("toastComplete")
              }`
            );
            toast.background("#2e7d32");
          }}
          className={`w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-300
            ${
              todoArray.completed
                ? "bg-green-500 border-green-500 text-white"
                : "bg-white border-green-400 text-green-500 hover:bg-green-50 dark:bg-gray-900 dark:border-green-700 dark:text-green-400"
            }`}
          title={t("mark_completed")}
        >
          <CheckOutlinedIcon fontSize="small" />
        </button>
        <button
          onClick={() => {
            openUpdatePopup(todoArray.id);
          }}
          className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-blue-400 bg-white text-blue-500 hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-900 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-gray-800"
          title={t("edit_task")}
        >
          <EditOutlinedIcon fontSize="small" />
        </button>
        <button
          onClick={() => {
            openDeletePopup(todoArray.id);
          }}
          className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-red-400 bg-white text-red-500 hover:bg-red-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-gray-900 dark:border-red-700 dark:text-red-400 dark:hover:bg-gray-800"
          title={t("delete_task")}
        >
          <DeleteOutlineOutlinedIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}
