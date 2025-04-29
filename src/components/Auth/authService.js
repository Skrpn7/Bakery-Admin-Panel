import axios from 'axios';
import Backend_Url from '../../Config/Backendurl';

export const login = async (username, password) => {
  try {
    debugger
    console.log(Backend_Url)
    const response = await axios.post(`${Backend_Url}/admin/login`, {
      Email: username,
      Password: password
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const result = response.data.Result;

    if (result.role === 'Admin') {
      return result.token;
    } else {
      throw new Error('Access denied: User is not an admin');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to authenticate');
  }
};
