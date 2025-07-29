import { useState, useEffect, useMemo, useContext } from "react";
import Todo from "./Todo";
import ToggleButtons from "./ToggleButtons";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { ToastContext } from "./Contexts/ToastContext";
import { TodosContext } from "./Contexts/TodosContext";
export const data = [
  {
    id: uuidv4(),
    title: "تعلم البرمجة",
    details: "الانجاز قبل نهاية الشهر",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "العلم نور",
    details: "",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "تعلم الانجليزية",
    details: "الممارسة بأستمرار",
    completed: false,
  },
];
export default function TodoList() {
  const toast = useContext(ToastContext);
  const { t, i18n } = useTranslation();
  const [array2, setArray] = useState(data);
  const [input, setInput] = useState("");
  const [typeTodos, setTypeTodos] = useState("all");
  const [edit, setEdit] = useState({ title: "", details: "" });
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [idDialogDelete, setIdDialogDelete] = useState();
  const [idDialogUpdate, setIdDialogUpdate] = useState();
  const { todosList, todosDispatch } = useContext(TodosContext);

  const handleOpenDelete = (id) => {
    setIdDialogDelete(id);
    setOpenDeletePopup(true);
  };
  const handleCloseDelete = () => {
    setOpenDeletePopup(false);
  };
  const handleOpenUpdate = (id) => {
    setIdDialogUpdate(id);
    setOpenUpdatePopup(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdatePopup(false);
  };
  function changeTypeTodos(value) {
    setTypeTodos(value);
  }

  function titleEdit(value) {
    setEdit({ ...edit, title: value });
  }
  function detailsEdit(value) {
    setEdit({ ...edit, details: value });
  }
  function checked(id) {
    todosDispatch({ type: "check", payload: { todoId: id } });
  }
  function deleteItem() {
    todosDispatch({
      type: "delete",
      payload: { idDialogDelete: idDialogDelete },
    });
    toast.showToast(t("toastDelete"));
    toast.background("red");
  }
  function handleUpdateItem() {
    todosDispatch({
      type: "update",
      payload: { edit: edit, idDialogUpdate: idDialogUpdate },
    });
    setEdit({ ...edit, title: "", details: "" });
    toast.showToast(t("toastUpdate"));
    toast.background("#3b82f6");
  }
  function handleAddItem() {
    todosDispatch({ type: "add", payload: { input: input } });
    setInput("");
    toast.showToast(t("toastAdd"));
    toast.background("#2e7d32");
  }
  useEffect(() => {
    todosDispatch({ type: "get" });
  }, []);

  function resetLocalStorage() {
    localStorage.clear();
    window.location.reload();
    setArray(data);
  }

  const completeTodo = useMemo(() => {
    if (!todosList) return [];
    return todosList.filter((d) => d.completed);
  }, [todosList]);

  const notCompleteTodo = useMemo(() => {
    if (!todosList) return [];
    return todosList.filter((d) => !d.completed);
  }, [todosList]);

  let showTypeTodos = todosList || [];
  if (typeTodos === "completed") {
    showTypeTodos = completeTodo || [];
  } else if (typeTodos === "notCompleted") {
    showTypeTodos = notCompleteTodo || [];
  }
  const contentTodo = showTypeTodos.map((da) => {
    return (
      <Todo
        key={da.id}
        todoArray={da}
        checkFunction={checked}
        openUpdatePopup={handleOpenUpdate}
        openDeletePopup={handleOpenDelete}
      />
    );
  });

  return (
    <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg border border-blue-100 p-8 dark:bg-gray-900 dark:bg-opacity-90 dark:border-gray-800">
      <h1 className="font-bold text-4xl md:text-6xl my-6 text-center text-blue-900 drop-shadow-sm dark:text-blue-100">
        {t("greeting")}
      </h1>
      <ToggleButtons value={typeTodos} changeChecked={changeTypeTodos} />
      <div className="space-y-4 mb-8">{contentTodo}</div>
      <form
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="flex flex-col md:flex-row gap-4 items-center justify-center mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddItem();
        }}
      >
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50 shadow-sm dark:bg-gray-800 dark:text-blue-100 dark:border-gray-700"
          placeholder={t("add_task")}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 text-lg disabled:opacity-50 dark:from-blue-700 dark:to-purple-800"
          disabled={input.length === 0}
        >
          {t("add_task")}
        </button>
      </form>
      <div className="flex justify-center mt-6">
        <button
          onClick={resetLocalStorage}
          className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-red-400 to-red-600 text-white shadow-md hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-300 text-lg dark:from-red-700 dark:to-red-900"
        >
          {t("reset")}
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
                onClick={handleCloseDelete}
                className="px-4 py-2 rounded-full font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {t("close")}
              </button>
              <button
                onClick={() => {
                  deleteItem();
                  handleCloseDelete();
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
                handleUpdateItem();
                handleCloseUpdate();
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
                  onClick={() => handleCloseUpdate()}
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
