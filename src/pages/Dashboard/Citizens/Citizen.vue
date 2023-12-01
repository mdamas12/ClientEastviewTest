<template>
  <q-page class="flex flex-center">
    <h3>Nuevo Ciudadano de Eastview</h3>

    <div
      class="q-pa-md"
      style="width: 80%; border: 1px solid #666; border-radius: 5px"
    >
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="email"
          label="email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type your name']"
        />
        <q-input
          filled
          v-model="first_name"
          label="Primer Nombre"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your first name',
          ]"
        />

        <q-input
          filled
          v-model="last_name"
          label="Apellido"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your last name',
          ]"
        />

        <div>
          <q-btn
            label="Registrar"
            type="button"
            @click="validator()"
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
import DashServices from "../../../services/Dashboard";

export default defineComponent({
  name: "CitezenCreate",
  data() {
    return {
      email: "",
      name: "",
      first_name: "",
      last_name: "",
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

    validator() {
      Loading.show();
      const data = {
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
      };

      let subscription = DashServices.CreateCitizen(data).subscribe({
        complete: () => {
          Loading.hide();
          this.showNotif("Ciudadado Registrado con exito", "green-10");
          email.value.reset();
          first_name.value.reset();
          last_name.value.reset();
        },
        error: () => {
          Loading.hide();
          this.showNotif("Error al registrar Ciudadano", "red-10");
        },
      });
    },
  },
});
</script>
