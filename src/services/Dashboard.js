import { Observable } from "rxjs";

import { api } from "boot/axios";

class DashServices {
  CreateCitizen(data) {
    let token = localStorage.getItem("token");
    return Observable.create((observer) => {
      api({
        method: "post",
        url: "admins/v100/citizens",
        data,
        headers: { Authorization: "Token " + token },
      })
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

  LisCitizens() {
    let token = localStorage.getItem("token");
    return Observable.create((observer) => {
      api
        .get("/commons/v100/citizens", {
          headers: { Authorization: "Token " + token },
        })
        .then((response) => {
          //console.log(response.data);
          observer.next(response.data);
        })
        .catch((error) => {
          //console.log(error.response);
          observer.error(error.response);
        });
    });
  }

  UpdateCitizen(data, uuid) {
    let token = localStorage.getItem("token");
    return Observable.create((observer) => {
      api({
        method: "put",
        url: "/admins/v100/citizens/" + uuid,
        data,
        headers: { Authorization: "Token " + token },
      })
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

  DeleteCitizen(uuid) {
    let token = localStorage.getItem("token");
    return Observable.create((observer) => {
      api({
        method: "delete",
        url: "/admins/v100/citizens/" + uuid,
        headers: { Authorization: "Token " + token },
      })
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

  CreateTask(data) {
    let token = localStorage.getItem("token");
    return Observable.create((observer) => {
      api({
        method: "post",
        url: "/admins/v100/tasks",
        data,
        headers: { Authorization: "Token " + token },
      })
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

  LisTask() {
    let token = localStorage.getItem("token");
    return Observable.create((observer) => {
      api
        .get("/admins/v100/tasks/list", {
          headers: { Authorization: "Token " + token },
        })
        .then((response) => {
          //console.log(response.data);
          observer.next(response.data);
        })
        .catch((error) => {
          //console.log(error.response);
          observer.error(error.response);
        });
    });
  }

  AsigTask(data, taskid) {
    let token = localStorage.getItem("token");
    return Observable.create((observer) => {
      api({
        method: "put",
        url: "/mirandas/v100/tasks/" + taskid,
        data,
        headers: { Authorization: "Token " + token },
      })
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

  DeleteTask(id) {
    let token = localStorage.getItem("token");
    return Observable.create((observer) => {
      api({
        method: "delete",
        url: "/admins/v100/tasks/" + id,
        headers: { Authorization: "Token " + token },
      })
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
}

export default new DashServices();
