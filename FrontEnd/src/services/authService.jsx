import API from "../api/axios";

const signup = async (userData) => {
  const { data } = await API.post("/auth/signup", userData);
  return data.user;
};

const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  console.log("Login response:", response.data.user);
  return response.data.user;
};

const logout = async () => {
  const response = await API.post("/auth/logout");
  return response.data;
};

const getCurrentUser = async () => {
  const { data } = await API.get("/auth/me");

  return data.user;
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
