import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useContext } from "react";
import { Todo, TodoContext } from "@/app/index";

export default function TodoView() {
  const { state, dispatch } = useContext(TodoContext);
  const [todoText, setTodoText] = React.useState("");
  const [editMode, setEditMode] = React.useState(false);
  const [todoToUpdate, setTodoToUpdate] = React.useState<Todo>();
  const TextInputRef = React.useRef<TextInput>(null);

  const handleTodoDelete = (todo: Todo) => {
    dispatch({ type: "delete", payload: todo.id });
  };

  const handleAddTodo = () => {
    const newTodoItem = {
      id: new Date().valueOf() / Math.random(),
      text: todoText,
    };
    dispatch({ type: "add", payload: newTodoItem });
    setTodoText("");
    Keyboard.dismiss();
  };

  const handleEditButton = (todo: Todo) => {
    TextInputRef.current?.focus();
    setEditMode(true);
    setTodoText(todo.text);
    setTodoToUpdate(todo);
  };
  const handleTodoUpdate = () => {
    const newTodoItem = {
      id: todoToUpdate?.id,
      text: todoText,
    };
    dispatch({ type: "update", payload: newTodoItem });
    setTodoText("");
    Keyboard.dismiss();
    setEditMode(false);
  };

  const renderItem = ({ item }: { item: Todo }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderWidth: 1,
          padding: 20,
          marginVertical: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flex: 0.9,
          }}
        >
          <Text>{item.text}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => handleEditButton(item)}>
            <Text style={{ marginRight: 10, color: "blue" }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => handleTodoDelete(item)}
          >
            <Text style={{ marginLeft: 10, color: "red" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          paddingHorizontal: 15,
          fontSize: 35,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Todo List
      </Text>

      <View
        style={{
          flexDirection: "row",
          marginTop: "auto",
          marginBottom: 30,
          backgroundColor: "#f7f8fa",
          alignItems: "center",
        }}
      >
        <TextInput
          ref={TextInputRef}
          style={{
            flex: 0.8,
            height: 42,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.2)",
            color: "#000000",
            fontSize: 15,
            textAlignVertical: "center",
          }}
          placeholder="I want to..."
          value={todoText}
          onChangeText={setTodoText}
        />
        <TouchableOpacity
          onPress={editMode ? handleTodoUpdate : handleAddTodo}
          style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "blue", fontWeight: "600", fontSize: 15 }}>
            {editMode ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={state.todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
