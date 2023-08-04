import http from "../utils/http-common";

class UserServiceClass {
  constructor() {
    this.route_url = "api/users";
  }

  login(username, password) {
    return http.post("/api/login", { username, password });
  }

  loginWithToken(user_token) {
    return http.get("/api/login/token", {
      headers: { authorization: user_token },
    });
  }

  getPsychologistInfo(id_user) {
    return http.get(`/${this.route_url}/${id_user}`);
  }

  createUser(profile) {
    return http.post(`/${this.route_url}/create-user`, profile);
  }

  updateProfile(newProfile, user_token) {
    return http.put(`/${this.route_url}/update-profile`, newProfile, {
      headers: { authorization: user_token },
    });
  }

  uploadFile(filesObject, field, user_token) {
    console.log(filesObject, "uploadFile");
    return http.post(`/${this.route_url}/upload/${field}`, filesObject, {
      headers: {
        authorization: user_token,
        "content-type": "multipart/form-data",
      },
    });
  }

  deleteUser(user_token) {
    return http.delete(`/${this.route_url}/delete-user`, {
      headers: {
        authorization: user_token,
      },
    });
  }
}

export default new UserServiceClass();
