<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Dashboad Eastview</q-toolbar-title>

        <div>
          Hola, {{ name }}
          <q-btn
            color="white"
            v-if="token != ''"
            text-color="black"
            @click="Logout()"
            label="Cerrar Sesion"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu</q-item-label>

        <q-btn
          color="primary"
          label="Ciudadanos"
          style="width: 90%; border: none"
        >
          <q-menu content-class="bg-purple text-white" auto-close>
            <q-list style="min-width: 100px">
              <q-item
                clickable
                @click="this.$router.push({ name: 'citizens' })"
              >
                <q-item-section>Agregar Ciudadano</q-item-section>
              </q-item>
              <q-item
                clickable
                @click="this.$router.push({ name: 'citizensList' })"
              >
                <q-item-section>Listar Ciudadanos</q-item-section>
              </q-item>
              <q-separator dark />
            </q-list>
          </q-menu>
        </q-btn>
        <q-separator dark />
        <q-btn
          color="primary"
          label="Tareas"
          style="width: 90%; border: none; margin: 0 auto; padding: 0 20px"
        >
          <q-menu content-class="bg-purple text-white" auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable @click="this.$router.push({ name: 'tasks' })">
                <q-item-section>Agregar Tareas</q-item-section>
              </q-item>
              <q-item
                clickable
                @click="this.$router.push({ name: 'tasksList' })"
              >
                <q-item-section>Listar Tareas</q-item-section>
              </q-item>
              <q-separator dark />
              <q-item clickable>
                <q-item-section>Asignar Tarea</q-item-section>
              </q-item>
              <q-separator dark />
            </q-list>
          </q-menu>
        </q-btn>
        <q-separator dark />
        <q-btn
          color="primary"
          label="Usiarios"
          style="width: 90%; border: none; margin: 0 auto; padding: 0 20px"
        >
          <q-menu content-class="bg-purple text-white" auto-close>
            <q-list style="min-width: 100px">
              <q-item
                clickable
                @click="this.$router.push({ name: 'registerUser' })"
              >
                <q-item-section>Agregar \usuario</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Listar Usuarios</q-item-section>
              </q-item>
              <q-separator dark />
            </q-list>
          </q-menu>
        </q-btn>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";
import { Notify } from "quasar";
import AuthService from "../services/Auth";

const linksList = [
  {
    title: "Ciudadanos",
    caption: "Ciudadanos de EastView",
    icon: "school",
    link: "citizens",
  },
  {
    title: "tareas",
    caption: "Tareas ",
    icon: "code",
    link: "tasks",
  },
  {
    title: "Usuarios",
    caption: "Usuarios",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  data() {
    return {
      token: "",
      name: "",
    };
  },

  setup() {
    //const leftDrawerOpen = ref(false);
    const router = useRouter();

    return {};
  },

  mounted() {
    if (localStorage.getItem("token")) {
      this.panelLoad();
      this.name = "";
    } else {
      this.goToLogin();
    }
  },
  methods: {
    showNotif(message, color) {
      this.$q.notify({
        message: message,
        timeout: 4000,
        color: color,
        actions: [
          {
            label: "",
            color: "white",
            handler: () => {},
          },
        ],
      });
    },
    panelLoad() {
      console.log("Recuerda la funcion load");
      this.token = localStorage.getItem("token");

      let subscription = AuthService.Getme().subscribe({
        complete: (data) => {
          this.name = data.email;
        },
        error: () => {
          console.log("hay un error");
        },
      });
    },
    Logout() {
      localStorage.removeItem("token");
      this.showNotif("La sesion se ha cerrado", "green-6");
      this.$router.push({ name: "login" });
    },
    goToLogin() {
      this.$router.push({ name: "login" });
    },
  },
});
</script>
