const USER_KEY = "user";
const USER_TOKEN_KEY = "userToken";
const ADMIN_KEY = "admin";
const ADMIN_TOKEN_KEY = "adminToken";

export const saveUserSession = ({ user, token }) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(USER_TOKEN_KEY, token);
};

export const saveAdminSession = ({ admin, token }) => {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const getUserToken = () => localStorage.getItem(USER_TOKEN_KEY);
export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);
