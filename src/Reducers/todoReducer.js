import { v4 as uuidv4 } from "uuid";
export default function todoReducer(currentArray, action) {
  const type = action.type;
  const payload = action.payload;
  switch (type) {
    case "add": {
      if (payload.input !== "") {
        const newTodo = {
          id: uuidv4(),
          title: payload.input,
          detalis: "",
        };
        window.localStorage.todos = JSON.stringify([...currentArray, newTodo]);
        return [...currentArray, newTodo];
      }
    }

    case "update": {
      if (payload.edit.title !== "" || payload.edit.details !== "") {
        const newArray = currentArray.map((arr) => {
          if (arr.id === payload.idDialogUpdate) {
            return {
              ...arr,
              title: payload.edit.title,
              details: payload.edit.details,
            };
          } else {
            return arr;
          }
        });
        window.localStorage.todos = JSON.stringify(newArray);
        return newArray;
      }
    }

    case "delete": {
      const newArray2 = currentArray.filter(
        (arr) => arr.id !== payload.idDialogDelete
      );
      window.localStorage.todos = JSON.stringify(newArray2);
      return newArray2;
    }
    case "check": {
      const newArray3 = (currentArray || []).map((d) => {
        if (d.id === payload.todoId) {
          return { ...d, completed: !d.completed };
        }
        return d;
      });
      window.localStorage.todos = JSON.stringify(newArray3);
      console.log(newArray3);

      return newArray3;
    }
    case "get": {
      if (localStorage.todos) {
        return JSON.parse(localStorage.todos);
      } else {
        return currentArray;
      }
    }

    default: {
      throw Error("Undefined " + action.type);
    }
  }
  return [];
}
