import PrivateBlogAPI from "./PrivateBlogAPI";
import PublicBlogAPI from "./PublicBlogAPI";

const apiURL = import.meta.env.VITE_API_URL;

export const privateBlogAPI = new PrivateBlogAPI(apiURL);
export const publicBlogAPI = new PublicBlogAPI(apiURL);
