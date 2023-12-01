<template>
  <div
    class="q-pa-md"
    style="
      max-width: 600px;
      margin: 20px auto;
      border: 1px solid #666;
      border-radius: 5px;
    "
  >
    <h3>Inicio de Sesion</h3>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="email"
        label="email *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type your email']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Contraseña *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your password',
        ]"
      />
      <div>
        <q-btn label="Iniciar" type="button" @click="Login()" color="primary" />
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
</template>

<script>
import { defineComponent } from "vue";
import { Notify } from "quasar";
import { Loading } from "quasar";
import { ref } from "vue";
import AuthService from "../../services/Auth";
export default defineComponent({
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
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

    Login() {
      //Loading.show();
      const credentials = {
        email: this.email,
        password: this.password,
      };

      let subscription = AuthService.Login(credentials).subscribe({
        complete: () => {
          Loading.hide();
          this.showNotif("Ha iniciado sesión", "green-10");
          this.$router.push("/dashboard");
        },
        error: () => {
          Loading.hide();
          this.showNotif("Los datos proporcionados son incorrectos", "red-10");
        },
      });
    },
  },
});
</script>
