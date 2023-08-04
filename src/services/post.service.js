import http from "../utils/http-common";

class PostServiceClass {
  constructor() {
    this.post_route_url = "api/posts";
    this.comment_route_url = "api/comments";
  }

  getTags() {
    return http.get("/api/tags/all");
  }

  /*------------------ Posts Tools --------------------*/
  getAllPosts(user_token) {
    return http.get(`/${this.post_route_url}/all-posts`, {
      headers: { authorization: user_token },
    });
  }

  getPostByID(id_post) {
    return http.get(`/${this.post_route_url}/post/${id_post}`);
  }

  getUserPosts(user_token) {
    return http.get(`/${this.post_route_url}/my-posts`, {
      headers: { authorization: user_token },
    });
  }

  getAllPostsWithTag(id_tag, user_token) {
    return http.get(`/${this.post_route_url}/tag/${id_tag}`, {
      headers: {
        authorization: user_token,
      },
    });
  }

  createPost(post, user_token) {
    return http.post(`/${this.post_route_url}/create-post`, post, {
      headers: { authorization: user_token },
    });
  }

  editPost(postID, post, user_token) {
    return http.patch(`/${this.post_route_url}/edit-post/${postID}`, post, {
      headers: { authorization: user_token },
    });
  }

  deletePost(postID, user_token) {
    return http.delete(`/${this.post_route_url}/delete-post/${postID}`, {
      headers: { authorization: user_token },
    });
  }

  /*------------------ Comments Tools --------------------*/
  getPostComments(id_post) {
    return http.get(`/${this.comment_route_url}/${id_post}`);
  }

  createComment(id_post, comment, user_token) {
    return http.post(`/${this.comment_route_url}/post/${id_post}`, comment, {
      headers: { authorization: user_token },
    });
  }

  deleteComment(id_comment, user_token) {
    return http.delete(
      `/${this.comment_route_url}/delete-comment/${id_comment}`,
      { headers: { authorization: user_token } }
    );
  }
}

export default new PostServiceClass();
