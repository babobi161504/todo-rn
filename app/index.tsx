import React from 'react';
import Profile from './page/profile';
import TodoView from './page/todoView';
export interface Todo {
  id: number;
  text: string;
}

interface TodoState {
  todos: Todo[];
}

interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

const todosInitalState = {
  todos: [
    {
      id: 1,
      text: 'Learn Typescript',
    },
    {
      id: 2,
      text: 'Learn React Native',
    },
  ],
};

interface TodoAction {
  type: string;
  payload?: any;
}

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'delete':
      const filteredTodos = state.todos.filter(
        todo => todo.id !== action.payload,
      );
      return {...state, todos: filteredTodos};
    case 'add':
      return {...state, todos: [action.payload, ...state.todos]};
    case 'update':
      const index = state.todos.findIndex(
        todo => todo.id === action.payload.id,
      );

      const newState = [
        ...state.todos.slice(0, index),
        action.payload,
        ...state.todos.slice(index + 1),
      ];
      return {...state, todos: newState};

    default:
      return todosInitalState;
  }
}

export const TodoContext = React.createContext<TodoContextType>({
  state: todosInitalState,
  dispatch: () => {},
});
export default function App() {
  const [state, dispatch] = React.useReducer(todoReducer, todosInitalState);

  return (
    <TodoContext.Provider value={{state, dispatch}}>
      <TodoView />
    </TodoContext.Provider>
  );
}
