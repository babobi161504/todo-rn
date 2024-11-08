import React, { useEffect } from "react";
import TodoView from "./page/todoView";
import { getTaskListAPI } from "@/API/task";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
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
  todos: [],
};

interface TodoAction {
  type: string;
  payload?: any;
}

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "delete":
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return { ...state, todos: filteredTodos };
    case "add":
      return { ...state, todos: [action.payload, ...state.todos] };
    case "update":
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );

      const newState = [
        ...state.todos.slice(0, index),
        action.payload,
        ...state.todos.slice(index + 1),
      ];
      return { ...state, todos: newState };
    case "get":
      return { ...state, todos: action.payload };
    default:
      return todosInitalState;
  }
}

export const TodoContext = React.createContext<TodoContextType>({
  state: todosInitalState,
  dispatch: () => {},
});

const fetchAndDispatchTasks = async (dispatch: React.Dispatch<TodoAction>) => {
  const todos = await getTaskListAPI();
  dispatch({ type: "get", payload: todos });
};

export function HomeScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Todos"
        onPress={() => navigation.navigate("Todos")}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer(todoReducer, todosInitalState);
  useEffect(() => {
    fetchAndDispatchTasks(dispatch);
  }, [dispatch]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Todos" component={TodoView} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoContext.Provider>
  );
}
