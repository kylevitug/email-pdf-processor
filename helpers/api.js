import axios from 'axios';
import config from '../config.js';

const sendDataToAPI = async (data) => {
  try {
    const response = await axios.post(config.api.url, data, {
      headers: {
        Authorization: `Bearer ${config.api.token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      console.log('Data posted successfully');
    }
  } catch (error) {
    console.error('Failed to post data:', error.message);
  }
};

export { sendDataToAPI };
