import { useState, useEffect } from "react";
import Todo from "./Todo";
import ToggleButtons from "./ToggleButtons";
import { useTranslation } from "react-i18next";

export default function TodoList() {
  const { t, i18n } = useTranslation();
  const [array, setArray] = useState([
    {
      id: 1,
      title: "تعلم البرمجة",
      details: "الانجاز قبل نهاية الشهر",
      completed: false,
    },
    {
      id: 2,
      title: "العلم نور",
      details: "",
      completed: false,
    },
    {
      id: 3,
      title: "تعلم الانجليزية",
      details: "الممارسة بأستمرار",
      completed: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [typeTodos, setTypeTodos] = useState("all");
  const [edit, setEdit] = useState({ title: "", details: "" });

  function changeTypeTodos(value) {
    setTypeTodos(value);
  }
  function titleEdit(value) {
    setEdit({ ...edit, title: value });
  }
  function detailsEdit(value) {
    setEdit({ ...edit, details: value });
  }
  function checked(index) {
    const newArray = array.map((d, inde) => {
      if (inde === index) {
        d.completed = !d.completed;
      }
      return d;
    });
    setArray(newArray);
    window.localStorage.todos = JSON.stringify(newArray);
  }
  function deleteItem(index) {
    const newArray = array.filter((arr, inde) => inde !== index);
    setArray(newArray);
    window.localStorage.todos = JSON.stringify(newArray);
  }
  function handleUpdateItem(indexPost) {
    if (edit.title !== "" || edit.details !== "") {
      const newArray = [...array];
      newArray[indexPost] = {
        ...newArray[indexPost],
        title: edit.title,
        details: edit.details,
      };
      setArray(newArray);
      window.localStorage.todos = JSON.stringify(newArray);
      setEdit({ ...edit, title: "", details: "" });
    }
  }
  function handleAddItem() {
    if (input !== "") {
      setArray([...array, { id: array.length + 1, title: input, detalis: "" }]);
      setInput("");
      window.localStorage.todos = JSON.stringify([
        ...array,
        { id: array.length + 1, title: input, detalis: "" },
      ]);
    }
  }
  useEffect(() => {
    if (localStorage.todos) {
      setArray(JSON.parse(localStorage.todos));
    }
  }, []);
  function resetLocalStorage() {
    localStorage.clear();
    window.location.reload();
    setArray(array);
  }
  const completeTodo = array.filter((d) => d.completed);
  const notCompleteTodo = array.filter((d) => !d.completed);

  let showTypeTodos = array;
  if (typeTodos === "completed") {
    showTypeTodos = completeTodo;
  } else if (typeTodos === "notCompleted") {
    showTypeTodos = notCompleteTodo;
  }
  const contentTodo = showTypeTodos.map((da, inde) => {
    return (
      <Todo
        key={da.id}
        todoArray={da}
        editFunction={handleUpdateItem}
        deleteFunction={deleteItem}
        checkFunction={checked}
        edit={edit}
        titleEdit={titleEdit}
        detailsEdit={detailsEdit}
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
    </div>
  );
}
