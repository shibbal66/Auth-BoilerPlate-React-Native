import axios from "axios";
import { Platform } from "react-native";
import mime from "mime";
export const instance = axios.create({
  // baseURL: "",
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      error.message = error.response.data.message;
    }
    return Promise.reject(error);
  }
);


const uploadProfilePicture = async (fileUri: string) => {
  // const state = store.getState();
  // const authToken = state.auth.token; 
  const formData = new FormData();
  const fileType = mime.getType(fileUri) || 'application/octet-stream';
  const fileName = fileUri.split('/').pop();
  formData.append('profilePic', {
    uri: Platform.OS === 'android' ? fileUri : fileUri.replace('file://', ''), 
    type: fileType,
    name: fileName
  });
  const config = {
    method: 'patch',
    // url: '',
    headers: {
      // 'Authorization': `Bearer ${authToken}`, 
      'Content-Type': 'multipart/form-data', 
      ...formData
    },
    data: formData,
    maxBodyLength: Infinity,
  };

  try {
    const response = await axios(config);
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error message:', error.message);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Response headers:', error.response?.headers);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error; 
  }
};






const api = {
    apiUserCollection: {
    uploadProfilePicture,
  },
};

export default api;
