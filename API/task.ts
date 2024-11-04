import api from "./api";

export const getTaskListAPI = async () => {
  try {
    const response = await api.get("/task");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createTaskAPI = async (task: { text: string }) => {
  try {
    const response = await api.post("/task", task);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTaskAPI = async (task: { id: number; text: string }) => {
  try {
    const response = await api.put(`/task/${task.id}`, task);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
