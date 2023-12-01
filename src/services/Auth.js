import { Observable } from "rxjs";

import { api } from "boot/axios";

class AuhtService {
  Login(credentials) {
    return Observable.create((observer) => {
      api
        .post("dj-rest-auth/login/", credentials)
        .then((response) => {
          //console.log(response.data);
          localStorage.setItem("token", response.data["token"]);
          observer.complete();
        })
        .catch((error) => {
          console.log(error.response);
          observer.error();
        });
    });
  }

  Register(credentials) {
    return Observable.create((observer) => {
      api
        .post("dj-rest-auth/registration/", credentials)
        .then((response) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error) => {
          console.log(error.response);
          observer.error(error);
        });
    });
  }

  Getme() {
    let token = localStorage.getItem("token");
    return Observable.create((observer) => {
      api
        .get("commons/v100/me", {
          headers: { Authorization: "Token " + token },
        })
        .then((response) => {
          observer.next(response);
        })
        .catch((error) => {
          //console.log(error.response);
          observer.error(error.response);
        });
    });
  }
}

export default new AuhtService();
