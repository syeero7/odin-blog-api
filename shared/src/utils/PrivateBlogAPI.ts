import PublicBlogAPI from "./PublicBlogAPI";
import { type Post } from "./types";

class PrivateBlogAPI extends PublicBlogAPI {
  constructor(apiUrl: string) {
    super(apiUrl);
  }

  async getPosts() {
    const options = { headers: this.getAuthorizationHeader() };
    return fetch(`${this.apiURL}/posts`, options);
  }

  async getPostById(postId: string | number) {
    const options = { headers: this.getAuthorizationHeader() };
    return fetch(`${this.apiURL}/posts/${postId}/comments`, options);
  }

  async createPost(body: Omit<Post, "id">) {
    const options = {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    };

    return fetch(`${this.apiURL}/posts/`, options);
  }

  async updatePostStatus(
    postId: string | number,
    body: Pick<Post, "published">
  ) {
    const options = {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    };

    return fetch(`${this.apiURL}/posts/${postId}/status`, options);
  }

  async updatePost(
    postId: string | number,
    body: Omit<Post, "id" | "published" | "createdAt">
  ) {
    const options = {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    };

    return fetch(`${this.apiURL}/posts/${postId}/`, options);
  }

  async deletePost(postId: string | number) {
    const options = {
      method: "DELETE",
      headers: this.getAuthorizationHeader(),
    };
    fetch(`${this.apiURL}/posts/${postId}`, options);
  }
}

export default PrivateBlogAPI;
