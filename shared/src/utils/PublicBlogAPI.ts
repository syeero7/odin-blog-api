import { getItem } from "./localStorage";

class PublicBlogAPI {
  protected apiURL;

  constructor(apiURL: string) {
    this.apiURL = apiURL;
  }

  async registerUser(body: {
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    authorPasscode: string;
  }) {
    const options = {
      method: "POST",
      headers: this.getJSONHeader(),
      body: JSON.stringify(body),
    };

    return fetch(`${this.apiURL}/auth/register`, options);
  }

  async loginUser(body: { email: string; password: string }) {
    const options = {
      method: "POST",
      headers: this.getJSONHeader(),
      body: JSON.stringify(body),
    };

    return fetch(`${this.apiURL}/auth/login`, options);
  }

  async getPublishedPosts() {
    return fetch(`${this.apiURL}/posts/published`);
  }
  async getPublishedPostById(postId: string | number) {
    return fetch(`${this.apiURL}/posts/published/${postId}/comments`);
  }

  async createComment(postId: string | number, body: { comment: string }) {
    const options = {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    };

    fetch(`${this.apiURL}/posts/${postId}/comments`, options);
  }

  async updateComment(commentId: string | number, body: { comment: string }) {
    const options = {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    };

    fetch(`${this.apiURL}/posts/comments/${commentId}`, options);
  }

  async deleteComment(commentId: string | number) {
    const options = {
      method: "DELETE",
      headers: this.getAuthorizationHeader(),
    };
    fetch(`${this.apiURL}/posts/comments/${commentId}`, options);
  }

  protected getJSONHeader() {
    return { "Content-type": "application/json" };
  }

  protected getHeaders() {
    return { ...this.getJSONHeader(), ...this.getAuthorizationHeader() };
  }

  protected getAuthorizationHeader() {
    const { token } = getItem() || {};
    return { Authorization: `Bearer ${token}` };
  }
}

export default PublicBlogAPI;
