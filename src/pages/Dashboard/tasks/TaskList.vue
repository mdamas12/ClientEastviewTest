<template>
  <q-page class="flex flex-center">
    <h3>Lista de Tareas de Eastview</h3>

    <div class="q-pa-md" style="width: 90%">
      <q-banner dense class="bg-primary text-white">
        puedes buscar dia de la semana .

        <template v-slot:action>
          <q-select v-model="FilterDay" :options="days" label="Dia" />

          <q-btn
            flat
            color="white"
            label="Listar tareas"
            @click="ListarCuston()"
          />
        </template>
      </q-banner>

      <q-table
        flat
        bordered
        title="Lsita de Ciudadanos de Eastview"
        :rows="taskList"
        :columns="columns"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr v-for="col in taskList" :key="col.title">
            <q-td auto-width>
              <q-btn
                v-if="col.user == 'No Asignada'"
                color="secondary"
                glossy
                label="Asignar"
                @click="GotoAsig(col)"
              />
              <q-btn
                v-else
                color="deep-orange"
                glossy
                label="No Asignar"
                @click="GotoDeletTaskToCi(col)"
              />
            </q-td>
            <q-td>
              {{ col.title }}
            </q-td>
            <q-td>
              {{ col.day }}
            </q-td>
            <q-td>
              {{ col.user }}
            </q-td>
            <q-td auto-width>
              <q-btn
                color="red"
                glossy
                label="Eliminar Tarea"
                @click="GoToDelete(col)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="asigTaskModal" persistent>
      <q-card style="min-width: 40%">
        <h5>Asignar una tarea</h5>
        <q-card-section>
          <div class="text-h6">Selecciona un ciudadano</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            v-model="citezenselect"
            :options="citizensLis"
            option-value="id"
            option-label="full_name"
            map-options
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Debe seleccionar un ciudadano',
            ]"
          ></q-select>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Selecciona una Tarea</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select v-model="taskOption" :options="tasks" label="Tarea" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Asignar Tarea" @click="AsignTask()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="DeleteTaskToci" persistent>
      <q-card style="min-width: 40%">
        <h5>Seguro de Eliminar Asignacion?</h5>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Eliminar" @click="DeleteTaskService()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="ModalDeleteTask" persistent>
      <q-card style="min-width: 40%">
        <h5>Seguro que deseas eliminar Tarea?</h5>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Eliminar" @click="DeleteTask()" />
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
    name: "title",
    align: "center",
    label: "Titulo",
    field: "title",
    sortable: true,
  },
  {
    name: "day",
    align: "center",
    label: "Dia",
    field: "day",
    sortable: true,
  },
  {
    name: "user",
    align: "center",
    label: "Ciudadano",
    field: "user",
    sortable: true,
  },
];

export default defineComponent({
  name: "TaskList",
  setup() {
    return {
      columns,

      dayOption: ref(null),
      tasks: ref(null),
      days: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
        "todos",
      ],
    };
  },
  data() {
    return {
      title: "",
      days: "",
      first_name: "",
      last_name: "",
      taskData: [],
      taskList: [],

      citizensdata: [],
      citizensLis: [],

      asigTaskModal: false,
      DeleteTaskToci: false,
      ModalDeleteTask: false,
      taskSelect: "",

      citezenselect: null,

      FilterDay: "",
    };
  },

  mounted() {
    this.TaskGetlist();
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
    TaskGetlist() {
      Loading.show();
      let task_user = "";
      let subscription = DashServices.LisTask().subscribe({
        next: (res) => {
          Loading.hide();
          this.taskData = res.results;
          this.taskData.forEach((item, index) => {
            if (item.user === null) {
              item.user = "No Asignada";
            } else item.user = item.user.first_name + +item.user.last_name;
            let itemdata = {
              id: item.id,
              uuid: item.uuid,
              title: item.title,
              day: item.day,
              user: item.user,
            };
            this.taskList.push(itemdata);
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

    ListarCuston() {
      Loading.show();
      let task_user = "";
      let subscription = DashServices.LisTask().subscribe({
        next: (res) => {
          Loading.hide();
          this.taskData = res.results;
          this.taskData.forEach((item, index) => {
            if (item.day == this.FilterDay) {
              if (item.user === null) {
                item.user = "No Asignada";
              } else item.user = item.user.first_name + +item.user.last_name;
              let itemdata = {
                id: item.id,
                uuid: item.uuid,
                title: item.title,
                day: item.day,
                user: item.user,
              };
              this.taskList.push(itemdata);
            }
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

    GotoAsig(data) {
      this.taskSelect = data;
      let subscription = DashServices.LisCitizens().subscribe({
        next: (res) => {
          Loading.hide();
          this.citizensdata = res.results;
          this.citizensdata.forEach((item, index) => {
            let full_name = item.first_name + " " + item.last_name;

            this.citizensLis.push({
              id: item.id,
              full_name: full_name,
            });
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

      this.asigTaskModal = true;
    },

    GotoDeletTaskToCi(data) {
      this.taskSelect = data;
      this.DeleteTaskToci = true;
    },

    DeleteTaskService() {
      let data = {
        title: this.taskSelect.title,
        day: this.taskSelect.day,
        user_id: null,
      };
      console.log(data);

      let taskid = this.taskSelect.id;

      let subscription = DashServices.AsigTask(data, taskid).subscribe({
        next: (res) => {
          Loading.hide();
          this.showNotif("Tarea Cancelada con exito", "green-10");
          this.DeleteTaskToci = false;
          this.TaskGetlist();
        },
        error: () => {
          Loading.hide();
          this.showNotif("Error al cancelar Tarea", "red-10");
        },
      });

      return;
    },

    AsignTask() {
      let data = {
        title: this.taskSelect.title,
        day: this.taskSelect.day,
        user_id: this.citezenselect.id,
      };
      console.log(data);

      let taskid = this.taskSelect.id;

      let subscription = DashServices.AsigTask(data, taskid).subscribe({
        next: (res) => {
          Loading.hide();
          this.showNotif("Tarea Asignada con exito", "green-10");
          this.asigTaskModal = false;
          this.TaskGetlist();
        },
        error: () => {
          Loading.hide();
          this.showNotif("Error al Asignar Tarea", "red-10");
          this.asigTaskModal = false;
        },
      });

      return;
    },
    GoToDelete(data) {
      this.taskSelect = data;
      this.ModalDeleteTask = true;
    },

    DeleteTask() {
      let task = this.taskSelect.id;
      let subscription = DashServices.DeleteTask(task).subscribe({
        next: (res) => {
          Loading.hide();
          this.showNotif("Tarea Eliminada con exito", "green-10");
          this.ModalDeleteTask = false;
          this.TaskGetlist();
        },
        error: () => {
          Loading.hide();
          this.showNotif("Error al Eliminar Tarea", "red-10");
          this.asigTaskModal = false;
        },
      });
    },
  },
});
</script>
