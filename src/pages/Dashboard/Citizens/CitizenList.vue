<template>
  <q-page class="flex flex-center">
    <h3>Lista de Ciudadano de Eastview</h3>
    <div class="q-pa-md" style="width: 90%">
      <q-table
        flat
        bordered
        title="Lsita de Ciudadanos de Eastview"
        :rows="citizensLis"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr v-for="col in citizensLis" :key="col.id">
            <q-td>
              {{ col.first_name }}
            </q-td>
            <q-td>
              {{ col.last_name }}
            </q-td>
            <q-td>
              {{ col.email }}
            </q-td>
            <q-td auto-width>
              <q-btn
                color="primary"
                glossy
                label="Actualizar Ciudadano"
                @click="GoToUpdate(col)"
              />
            </q-td>
            <q-td auto-width>
              <q-btn
                color="red"
                glossy
                label="Eliminar Ciudadano"
                @click="GoToDelete(col)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="MadalUdateCitizen" persistent>
      <q-card style="min-width: 60%">
        <h5>Editar ciudadano</h5>

        <q-card-section>
          <q-input
            filled
            v-model="email"
            label="email"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type your name',
            ]"
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
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Actualizar"
            @click="DeleteCitizeServices()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="asigTaskModal" persistent>
      <q-card style="min-width: 40%">
        <h5>Asignar una tarea</h5>
        <q-card-section>
          <div class="text-h6">Selecciona un Dia</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            v-model="dayOption"
            :options="days"
            label="Dia"
            @blur="TaskLoad(dayOption)"
          />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Selecciona una Tarea</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select v-model="taskOption" :options="tasks" label="Tarea" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add address" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { Notify } from "quasar";
import { Loading } from "quasar";
import { ref } from "vue";
import DashServices from "../../../services/Dashboard";

const columns = [
  {
    name: "first_name",
    align: "center",
    label: "Nombre",
    field: "first_name",
    sortable: true,
  },
  {
    name: "last_name",
    align: "center",
    label: "Apellido",
    field: "last_name",
    sortable: true,
  },
  {
    name: "email",
    align: "center",
    label: "Email",
    field: "email",
    sortable: true,
  },
  {
    name: "actualizar",
    align: "center",
    label: "Actualizar",
    field: "actualizar",
    sortable: true,
  },
  {
    name: "delete",
    align: "center",
    label: "Eliminar",
    field: "delete",
    sortable: true,
  },
];

const rows = [
  {
    first_name: "Daniela",
    last_name: "perez",
    email: "123@gmail.com",
  },
  {
    first_name: "Juan ",
    last_name: "Zamora",
    email: "123@gmail.com",
  },
  {
    first_name: "Pedro",
    last_name: "Alcala",
    email: "123@gmail.com",
  },
  {
    first_name: "Ramiro",
    last_name: "tova",
    email: "123@gmail.com",
  },
];

export default defineComponent({
  name: "CitezenList",
  setup() {
    return {
      columns,
      rows,
      asigTaskModal: ref(false),
      dayOption: ref(null),
      tasks: ref(null),
      days: [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo",
      ],
    };
  },
  data() {
    return {
      email: "",
      name: "",
      first_name: "",
      last_name: "",
      citizenuuid: "",
      citizensdata: [],
      citizensLis: [],
      MadalUdateCitizen: false,
    };
  },

  mounted() {
    this.CitizensGetlist();
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

    //openModal() {},
    TaskLoad(dayOption) {
      this.tasks = ["uno", "dos", "tres"];
    },
    CitizensGetlist() {
      Loading.show();
      let subscription = DashServices.LisCitizens().subscribe({
        next: (res) => {
          Loading.hide();
          this.citizensdata = res.results;
          console.log(this.citizensdata);
          this.citizensdata.forEach((item, index) => {
            let itemdata = {
              id: item.id,
              uuid: item.uuid,
              first_name: item.first_name,
              last_name: item.last_name,
              email: item.email,
            };
            this.citizensLis.push(itemdata);
          });
          return;
        },
        error: (err) => {
          Loading.hide();
          this.showNotif(
            "ERROR: Ocurrio un problema ports, por favor intente nuevamente mas tarde y si persiste, contacte al administrador de la pagina",
            "red-10"
          );
        },
      });
    },

    GoToDelete(data) {
      let uuid = data.uuid;
      let subscription = DashServices.DeleteCitizen(uuid).subscribe({
        next: (res) => {
          Loading.hide();
          this.showNotif("Ciudadano Eliminada con exito", "green-10");
          this.ModalDeleteTask = false;
        },
        error: () => {
          Loading.hide();
          this.showNotif("Error al Eliminar ciudadano", "red-10");
          this.asigTaskModal = false;
        },
      });
      return;
    },

    GoToUpdate(data) {
      console.log(data);
      this.email = data.email;
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.citizenuuid = data.uuid;
      this.MadalUdateCitizen = true;
      return;
    },

    DeleteCitizeServices() {
      let data = {
        first_name: this.first_name,
        last_name: this.lastname,
      };
      let uuid = this.citizenuuid;
      let subscription = DashServices.UpdateCitizen(data, uuid).subscribe({
        next: (res) => {
          Loading.hide();
          this.showNotif("Ciudadano Actualizado", "green-10");
          this.MadalUdateCitizen = false;
        },
        error: () => {
          Loading.hide();
          this.showNotif("Error al Actualizar", "red-10");
          this.asigTaskModal = false;
        },
      });
    },
  },
});
</script>
