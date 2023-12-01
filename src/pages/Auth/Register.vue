<template>
  <q-page class="flex flex-center">
    <h3>Registrar Usuario</h3>

    <div class="q-pa-md" style="max-width: 600px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="name *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type your name']"
        />

        <q-input
          filled
          v-model="email"
          label="email *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your email',
          ]"
        />

        <q-input
          filled
          type="password"
          v-model="password1"
          label="Contraseña *"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please type your password',
          ]"
        />

        <q-input
          filled
          type="password"
          v-model="password2"
          label="Repetir Contraseña"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please type your password',
          ]"
        />
        <div>
          <q-btn
            label="Registrar"
            type="button"
            @click="Register()"
            color="primary"
          />
          <q-btn
            label="Cancelar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { Notify } from "quasar";
import { Loading } from "quasar";
import { ref } from "vue";
import AuthService from "../../services/Auth";

export default defineComponent({
  name: "DashboardHome",
  data() {
    return {
      name: "",
      email: "",
      password1: "",
      password2: "",
      profile: "",
      //isPwd: true,
      isPwd: ref(true),
      rememberme: false,
      user: "",
    };
  },

  methods: {
    showNotif(message, color) {
      this.$q.notify({
        message: message,
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

    Register() {
      if (this.password1 != this.password2) {
        this.showNotif("Las Contraseñas deben coincidir", "red-8");
        return;
      }
      Loading.show();
      let credentials = {
        name: this.name,
        email: this.email,
        password: this.password,
        profile: "",
      };

      let subscription = AuthService.Register(credentials).subscribe({
        complete: () => {
          Loading.hide();
          this.showNotif("Usuario Registrado", "green-5");
          this.$router.push("/");
        },
        error: (err) => {
          Loading.hide();
          console.log(err);
          this.showNotif("Error al intentar Registarse ", "red-10");
        },
      });
    },
  },
});
</script>
