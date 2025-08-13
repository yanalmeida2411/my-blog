import axios from "axios";

export const userLogout = async () => {
    await axios.post('https://my-blog-back-dzcr.onrender.com/logout', {}, { withCredentials: true })
};
