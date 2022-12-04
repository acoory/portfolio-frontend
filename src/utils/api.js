import axios from "axios";
const API_URL = "http://localhost:3000/api";

export const getAllProjet = async () => {
  const config = axios({
    method: "get",
    url: `${API_URL}/projet`,
  });
  return await config;
};

export const getUploadProjetById = async (id) => {
  const config = axios({
    method: "get",
    url: `${API_URL}/upload/` + id,
  });
  return await config;
};

export const Auth = async (email, password) => {
  const config = axios({
    method: "post",
    url: `${API_URL}/auth`,
    data: {
      email: email,
      password: password,
    },
  });
  return await config;
};

export const getConfig = async () => {
  const config = axios({
    method: "get",
    url: `${API_URL}/config`,
  });
  return await config;
};

export const updateConfig = async (github, cv) => {
  const config = axios({
    method: "put",
    url: `${API_URL}/config`,
    data: {
      github: github,
      cv: cv,
    },
  });
  return await config;
};

export const uploadfile = async (id, file) => {
  var data = new FormData();
  data.append("projet_id", id);
  data.append("uri", file);
  const config = axios({
    method: "post",
    url: `${API_URL}/upload/`,
    data: data,
  });
  return await config;
};

export const addProjet = async (title, github, type) => {
  const config = axios({
    method: "post",
    url: `${API_URL}/projet`,
    data: {
      name: title,
      github: github,
      type: type,
    },
  });
  return await config;
};
