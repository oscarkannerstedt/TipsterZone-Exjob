import axios from "axios";

const API_URL = "https://tipsterzone-exjob.onrender.com";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
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
  userName: string;
  email: string;
  password: string;
  total_points?: number;
}) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.error || "Error while creating user";
      throw new Error(message);
    }
    throw new Error("Server error");
  }
};
