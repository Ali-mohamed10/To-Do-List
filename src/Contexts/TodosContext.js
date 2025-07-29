import { createContext, useReducer } from "react";
import todoReducer from "../Reducers/todoReducer";
import { data } from "../TodoList";

export const TodosContext = createContext([]);

export default function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, data);
  return (
    <TodosContext.Provider
      value={{ todosList: todos, todosDispatch: dispatch }}
    >
      {children}
    </TodosContext.Provider>
  );
}
