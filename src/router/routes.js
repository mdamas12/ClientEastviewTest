const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "dashboard",
        name: "home",
        component: () => import("pages/Dashboard/Home.vue"),
      },
      {
        path: "dashboard/citizens",
        name: "citizens",
        component: () => import("src/pages/Dashboard/Citizens/Citizen.vue"),
      },
      {
        path: "dashboard/citizens/list",
        name: "citizensList",
        component: () => import("src/pages/Dashboard/Citizens/CitizenList.vue"),
      },

      {
        path: "dashboard/tasks",
        name: "tasks",
        component: () => import("src/pages/Dashboard/tasks/Task.vue"),
      },
      {
        path: "dashboard/tasks/list",
        name: "tasksList",
        component: () => import("src/pages/Dashboard/tasks/TaskList.vue"),
      },
      {
        path: "dashboard/register-user",
        name: "registerUser",
        component: () => import("pages/Auth/Register.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("pages/Auth/Login.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
