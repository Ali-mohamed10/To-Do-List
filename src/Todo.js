import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useState } from "react";
import { useTranslation } from "react-i18next";

let indexPost = null;
export default function Todo({
  todoArray,
  deleteFunction,
  checkFunction,
  editFunction,
  edit,
  titleEdit,
  detailsEdit,
}) {
  const { t, i18n } = useTranslation();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);

  const handleClickOpen = () => {
    setOpenDeletePopup(true);
  };
  const handleClose = () => {
    setOpenDeletePopup(false);
  };
  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="bg-gray-50 border border-blue-100 rounded-xl shadow-md p-4 flex justify-between items-center gap-4 hover:shadow-lg transition-all duration-200 my-4 dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex-1 min-w-0">
        <h2
          className={`text-xl md:text-2xl font-bold mb-2 ${
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
      <div className="flex gap-2 items-center">
        <button
          onClick={() => {
            indexPost = todoArray.id - 1;
            checkFunction(indexPost);
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
            setOpenUpdatePopup(true);
            indexPost = todoArray.id - 1;
          }}
          className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-blue-400 bg-white text-blue-500 hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-900 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-gray-800"
          title={t("edit_task")}
        >
          <EditOutlinedIcon fontSize="small" />
        </button>
        <button
          onClick={() => {
            handleClickOpen();
            indexPost = todoArray.id - 1;
          }}
          className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-red-400 bg-white text-red-500 hover:bg-red-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-gray-900 dark:border-red-700 dark:text-red-400 dark:hover:bg-gray-800"
          title={t("delete_task")}
        >
          <DeleteOutlineOutlinedIcon fontSize="small" />
        </button>
      </div>
      {/* Start Delete Popup */}
      {openDeletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xs w-full border border-red-100 text-center dark:bg-gray-900 dark:border-red-700">
            <h2 className="text-2xl font-bold text-red-600 mb-2 dark:text-red-400">
              {t("delete_confirm")}
            </h2>
            <p className="text-gray-700 mb-6 dark:text-gray-200">
              {t("delete_warning")}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-full font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {t("close")}
              </button>
              <button
                onClick={() => {
                  deleteFunction(indexPost);
                  handleClose();
                }}
                className="px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700 transition-all dark:from-red-700 dark:to-red-900"
              >
                {t("confirm_delete")}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* End Delete Popup */}

      {/* Start Update Popup */}
      {openUpdatePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full border border-blue-100 dark:bg-gray-900 dark:border-blue-700">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 dark:text-blue-200">
              {t("edit_task")}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editFunction(indexPost);
                setOpenUpdatePopup(false);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                className="w-full px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50 dark:bg-gray-800 dark:text-blue-100 dark:border-blue-700"
                placeholder={t("title")}
                value={edit.title}
                onChange={(e) => titleEdit(e.target.value)}
                required
              />
              <input
                type="text"
                className="w-full px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50 dark:bg-gray-800 dark:text-blue-100 dark:border-blue-700"
                placeholder={t("details")}
                value={edit.details}
                onChange={(e) => detailsEdit(e.target.value)}
              />
              <div className="flex gap-4 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setOpenUpdatePopup(false)}
                  className="px-4 py-2 rounded-full font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 dark:from-blue-700 dark:to-purple-800"
                  disabled={edit.title === ""}
                >
                  {t("edit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* End Update Popup */}
    </div>
  );
}
