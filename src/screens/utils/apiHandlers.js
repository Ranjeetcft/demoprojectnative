import axios from "axios";
// import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';
import { API_URL } from "./env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Error fetching token: ", error);
    return null;
  }
};

export const showErrorMessage = (message) => {
  if (message instanceof Array) {
    message.forEach((msg) => toast.error(msg));
  } else {
    toast.error(message);
  }
};

const responseFormatter = (status, data, error) => {
  return { status, data: data || null, error };
};

const handleApiError = (err) => {
  return responseFormatter(false, null, err.response.data);
};

export const postReq = async (endpoint, data) => {
  const url = API_URL + endpoint;

  const token = await getToken();
  return await axios
    .post(url, data, { withCredentials: true })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
      // return err?.response.data;
    });
};

export const patchReq = async (endpoint, data) => {
  const url = API_URL + endpoint;
  const token = await getToken();
  return await axios
    .patch(url, data, { withCredentials: true })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const getReq = async (endpoint) => {
  const url = API_URL + endpoint;

  return await axios
    .get(url, { withCredentials: true })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};
