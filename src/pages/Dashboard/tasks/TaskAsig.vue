<template>
  <q-page class="flex flex-center">
    <h3>Nueva Tarea en Eastview</h3>

    <div
      class="q-pa-md"
      style="width: 80%; border: 1px solid #666; border-radius: 5px"
    >
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-select
          v-model="dayOption"
          :options="days"
          label="Dia"
          @blur="TaskLoad(dayOption)"
        />
        <q-input
          filled
          v-model="title"
          label="Titulo"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your title',
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
  name: "TaskAsig",
  data() {
    return {
      title: "",
      day: "",
      dayOption: "",
    };
  },

  setup() {
    return {
      days: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
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
        title: this.title,
        day: this.dayOption,
      };

      let subscription = DashServices.CreateTask(data).subscribe({
        complete: () => {
          Loading.hide();
          this.showNotif("Tarea Registrada con exito", "green-10");
          day.value.reset();
          title.value.reset();
        },
        error: () => {
          Loading.hide();
          this.showNotif("Error al registrar Tarea", "red-10");
        },
      });
    },
  },
});
</script>
