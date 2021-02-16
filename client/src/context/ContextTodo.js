import { createContext, useContext, useReducer } from 'react';

const ContextTodo = createContext();

const initialState = {
  data: [],
};

export const INIT = {
  SELECT: 'SELECT',
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case INIT.SELECT:
      return {
        data: action.payload,
      };
    case INIT.ADD:
      return {
        data: [action.payload, ...state.data],
      };
    case INIT.DELETE:
      return {
        data: state.data.filter((val) => {
          if (
            val.todo_id === action.payload.id &&
            val.source === action.payload.source
          ) {
            return false;
          }
          return true;
        }),
      };
    case INIT.UPDATE:
      const newData = [...state.data];
      const index = state.data.findIndex(
        (todo) => todo.todo_id === action.payload.todo_id
      );
      // console.log(newData);
      newData[index] = action.payload;
      return {
        data: newData,
      };
    default:
      return state;
  }
};

function ContextTodoWrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextTodo.Provider value={{ state, dispatch }}>
      {children}
    </ContextTodo.Provider>
  );
}

export default ContextTodoWrapper;

export const useContextTodos = () => useContext(ContextTodo);
