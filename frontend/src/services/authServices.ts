import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.message || "Error while login";
      throw new Error(message);
    }
    throw new Error("Server error");
  }
};

export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
  total_points?: number;
}) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/add`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.error || "Error while creating user";
      throw new Error(message);
    }
    throw new Error("Server error");
  }
};
