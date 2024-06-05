<template>
  <v-app app>
    <v-app-bar :clipped-left="clipped" fixed app elevation="0" class="bg-gradient">
      <v-avatar>
        <img
          src="../static/logo.jpg"
          alt="Circular Image"
          style="border: 2px; max-height: 80px; max-width: 80px;"
        >
      </v-avatar>
      <v-toolbar-title style="color: white; margin-left: 20px;" class="fuente">
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
        large
        plain
        color="white"
        class="fuente"
        @click="handleItemClick(item)"
      >
        {{ item.title }}
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="esConductor == true"
        rounded
        x-large
        elevation="0"
        color="error"
        class="fuente"
        style="color: white;margin-right: 1%;"
        @click="goCrearViaje()"
      >
        Crear Viaje
      </v-btn>
      <v-btn
        rounded
        x-large
        elevation="0"
        color="error"
        class="fuente"
        style="color: white;margin-right: 1%;"
        @click="cardCierraSesión = true"
      >
        Cerrar Sesión
      </v-btn>
      <v-btn
        rounded
        x-large
        elevation="0"
        color="white"
        class="fuente"
        style="color: black;"
        @click="ver_cuenta()"
      >
        Cuenta
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- Botón para cambiar el tema -->
    <v-btn
      icon
      dark
      color="black"
      class="ma-4"
      bottom
      right
      fixed
      elevation="0"
      @click="toggleDarkTheme"
    >
      <v-icon color="grey">
        mdi-lightbulb-outline
      </v-icon>
    </v-btn>
    <v-dialog v-model="abrirHistorial" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-app-bar :clipped-left="clipped" fixed app elevation="0" class="bg-gradient">
          <v-btn icon dark @click="abrirHistorial = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title style="color: white;" class="fuente">
            Historial
          </v-toolbar-title>
          <v-spacer />
        </v-app-bar>
        <!--Tabla para Conductores (Cambiar status de viajes)-->
        <v-data-table
          v-if="esConductor==true"
          elevation="0"
          :headers="headersConductorViajes"
          :items="viajesItemsConductor"
          :items-per-page="5"
          class="fuente"
          hide-default-footer
          style="margin-top: 60px; max-width: 100% !important;"
        >
          <template #[`item.acciones`]="{ item }">
            <v-row>
              <v-col cols="6">
                <v-tooltip top color="success">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      color="success"
                      v-bind="attrs"
                      @click="cambiarStatusViaje(item.via_Id)"
                      v-on="on"
                    >
                      <v-icon>mdi-list-status</v-icon>
                    </v-btn>
                  </template>
                  <span>Concluir viaje</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6">
                <v-tooltip top color="error">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      color="error"
                      v-bind="attrs"
                      @click="eliminarViaje(item)"
                      v-on="on"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Cancelar viaje</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </template>
        </v-data-table>

        <!--Tabla para Conductores (Calificaciones)-->
        <v-data-table
          v-if="esConductor==true"
          able
          elevation="0"
          :headers="headersConductor"
          :items="historialItemsConductor"
          :items-per-page="5"
          class="fuente"
          hide-default-footer
          style="margin-top: 20px; max-width: 100% !important;"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title class="fuente">
                Calificaciones
              </v-toolbar-title>
            </v-toolbar>
          </template>
          <template #[`item.Cal_Calificacion`]="{ item }">
            <v-icon v-for="(star, index) in getCalificationStars(item.Cal_Calificacion)" :key="index">
              {{ star }}
            </v-icon>
          </template>
        </v-data-table>
        <!--Tabla para Pasajeros-->
        <v-data-table
          v-if="esConductor==false"
          able
          elevation="0"
          :headers="headersPasajero"
          :items="historialItemsPasajero"
          :items-per-page="5"
          hide-default-footer
          class="fuente"
          style="max-width: 100% !important;"
        >
          <template #top>
            <v-toolbar flat />
          </template>
          <template #[`item.Cal_Calificacion`]="{ item }">
            <v-icon v-for="(star, index) in getCalificationStars(item.Cal_Calificacion)" :key="index">
              {{ star }}
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDelete" width="400px" style="height: 156px;" persistent>
      <v-card style="height: 156px;">
        <v-card-title>Cancelar Viaje</v-card-title>
        <v-card-text>¿Estas seguro? Esta accion es irreversible</v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="6">
              <v-btn block color="error" @click="borrar()">
                <span style="color: white; text-transform: none;">
                  Cancelar
                </span>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="success" @click="showDelete = false">
                <span style="color: white; text-transform: none;">
                  No cancelar
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showUpdate" width="400" persistent>
      <v-card style="height: 156px;">
        <v-card-title>Terminar viaje</v-card-title>
        <v-card-text>
          ¿Estas Seguro de querer terminar el viaje?
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="6">
              <v-btn block color="success" @click="modificar">
                <span style="color: error; text-transform: none;">
                  Terminar
                </span>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="error" @click="showUpdate = false">
                <span style="color: correct; text-transform: none;">
                  Cancelar
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="cardCierraSesión" max-width="35%">
      <v-card>
        <h2 class="d-flex justify-center fuente">
          ¿Está seguro de querer salir?
        </h2>
        <v-card-actions>
          <v-spacer />
          <v-btn class="fuente" @click="cardCierraSesión = false">
            Cancelar
          </v-btn>
          <v-spacer />
          <v-btn color="error" class="fuente" @click="cerrar_sesión()">
            Salir
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      headersConductor: [
        { text: 'Fecha', align: 'left', sortable: true, value: 'via_fecha_hora' },
        { text: 'NUA de pasajero', align: 'left', sortable: true, value: 'Cal_Califica_Usu_NUA' },
        { text: 'Origen', align: 'left', sortable: true, value: 'via_origen' },
        { text: 'Destino', align: 'left', sortable: true, value: 'via_destino' },
        { text: 'Precio', align: 'left', sortable: true, value: 'via_costo' },
        { text: 'Calificación', align: 'left', sortable: false, value: 'Cal_Calificacion' }
      ],
      headersConductorViajes: [
        { text: 'Fecha', align: 'left', sortable: true, value: 'via_fecha_hora' },
        { text: 'Origen', align: 'left', sortable: true, value: 'via_origen' },
        { text: 'Destino', align: 'left', sortable: true, value: 'via_destino' },
        { text: 'Precio', align: 'left', sortable: true, value: 'via_costo' },
        { text: 'Acciones', align: 'center', sortable: false, value: 'acciones' }
      ],
      headersPasajero: [
        { text: 'Fecha', align: 'left', sortable: true, value: 'via_fecha_hora' },
        { text: 'NUA de conductor', align: 'left', sortable: true, value: 'Cal_Calificado_Usu_NUA' },
        { text: 'Origen', align: 'left', sortable: true, value: 'via_origen' },
        { text: 'Destino', align: 'left', sortable: true, value: 'via_destino' },
        { text: 'Precio', align: 'left', sortable: true, value: 'via_costo' },
        { text: 'Calificación', align: 'left', sortable: false, value: 'Cal_Calificacion' }
      ],
      historialItemsConductor: [],
      viajesItemsConductor: [],
      historialItemsPasajero: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Raites DICIS',
      abrirHistorial: false,
      idToDelete: null,
      cardCierraSesión: false,
      showDelete: false,
      showUpdate: false,
      paraActualizarViaje: null,
      esConductor: false,
      conductor: Boolean
    }
  },
  computed: {
    items () {
      const menuItems = [
        {
          title: 'Menú Principal',
          action: this.rutaMenu
        },
        {
          title: 'Historial',
          action: this.historialDialog
        }
      ]

      // Si esConductor es falso, se añade el item de búsqueda de viajes
      if (!this.esConductor) {
        menuItems.splice(1, 0, {
          title: 'Busqueda de viajes',
          action: this.rutaBusqueda
        })
      } else if (this.esConductor) {
        menuItems.splice(1, 0, {
          title: 'Busqueda de viajes',
          action: this.rutaBusqueda
        })
      }

      return menuItems
    }
  },
  created () {
    this.fetchUserData() // Llamar al método para obtener los datos del usuario al crear el componente
  },
  methods: {
    toggleDarkTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },

    handleItemClick (item) {
      if (item.title === 'Historial') {
        if (this.esConductor === true) {
          this.fetchHistorialDataConductor()
          this.fetchViajesDataConductor()
        } else {
          this.fetchHistorialDataPasajero()
        }
        this.abrirHistorial = true
      } else if (item.title === 'Menú Principal') {
        this.rutaMenu()
      } else if (item.title === 'Busqueda de viajes') {
        this.rutaBusqueda()
      }
    },

    historialDialog () {
      this.abrirHistorial = true
      this.fetchHistorialData()
    },

    eliminarViaje (id) {
      this.idToDelete = id
      // eslint-disable-next-line no-console
      console.log('@@datos =>', this.idToDelete.via_Id)
      this.showDelete = true
    },

    borrar () {
      const url = `http://localhost:4000/api/viajes/${this.idToDelete.via_Id}`
      this.$axios.delete(url)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log('@@@ res => ', res)
          this.showDelete = false
          this.fetchHistorialDataConductor()
          this.fetchViajesDataConductor()
          // Actualizar la lista local si es necesario
          this.usuarios = this.usuarios.filter(user => user.via_Id !== this.idToDelete.via_Id)
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('@@@ err => ', err)
        })
        .finally(() => {
          // eslint-disable-next-line no-console
          console.log('Request completed') // Agrega un mensaje indicando que la petición ha terminado
        })
    },

    cambiarStatusViaje (viaje) {
      this.paraActualizarViaje = viaje
      // eslint-disable-next-line no-console
      console.log(this.paraActualizarViaje)
      this.showUpdate = true
    },

    modificar () {
      // eslint-disable-next-line no-console
      console.log('@@ data =>', this.paraActualizarViaje)
      const url = `http://localhost:4000/api/historial/conductor/${this.paraActualizarViaje}`
      this.$axios.put(url, this.paraActualizarViaje)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log('@@ res =>', res)
          this.fetchViajesDataConductor()
          this.fetchHistorialDataConductor()
          this.showUpdate = false
          this.email = ''
          this.passwordUser = ''
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('@@ err =>', err)
        })
    },

    async fetchViajesDataConductor () {
      const storedNUA = localStorage.getItem('NUA')

      if (storedNUA) {
        try {
          this.NUA = storedNUA
          const apiUrl = `http://localhost:4000/api/viajes/${this.NUA}`
          const response = await axios.get(apiUrl)
          this.viajesItemsConductor = response.data.body
            .filter(item => item.via_activo === 1)
            .map(item => ({
              ...item,
              via_fecha_hora: new Date(item.via_fecha_hora).toLocaleDateString()
            }))
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error al obtener datos del historial:', error)
        }
      } else {
        // eslint-disable-next-line no-console
        console.error('No se pudo recuperar el NUA del almacenamiento local')
      }
    },

    async fetchHistorialDataConductor () {
      const storedNUA = localStorage.getItem('NUA')

      if (storedNUA) {
        try {
          this.NUA = storedNUA
          const apiUrl = `http://localhost:4000/api/historial/conductor/${this.NUA}`
          const response = await axios.get(apiUrl)
          this.historialItemsConductor = response.data.body
            .filter(item => item.via_activo === 0)
            .map(item => ({
              ...item,
              via_fecha_hora: new Date(item.via_fecha_hora).toLocaleDateString()
            }))
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error al obtener datos del historial:', error)
        }
      } else {
        // eslint-disable-next-line no-console
        console.error('No se pudo recuperar el NUA del almacenamiento local')
      }
    },

    async fetchHistorialDataPasajero () {
      const storedNUA = localStorage.getItem('NUA')

      if (storedNUA) {
        try {
          this.NUA = storedNUA
          const apiUrl = `http://localhost:4000/api/historial/pasajero/${this.NUA}`
          const response = await axios.get(apiUrl)
          this.historialItemsPasajero = response.data.body.map(item => ({
            ...item,
            via_fecha_hora: new Date(item.via_fecha_hora).toLocaleDateString()
          }))
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error al obtener datos del historial:', error)
        }
      } else {
        // eslint-disable-next-line no-console
        console.error('No se pudo recuperar el NUA del almacenamiento local')
      }
    },

    async fetchUserData () {
      const storedNUA = localStorage.getItem('NUA')
      if (storedNUA) {
        try {
          this.NUA = storedNUA
          const apiUrl = `http://localhost:4000/api/usuarios/${this.NUA}`
          const response = await axios.get(apiUrl)
          const user = response.data.body
          // Establecer esConductor según el valor de Usu_Tipo
          this.esConductor = (user[0].Usu_Tipo === 'estudiante_con_vehiculo')
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error al obtener datos del usuario:', error)
        }
      } else {
        // eslint-disable-next-line no-console
        console.error('No se pudo recuperar el NUA del almacenamiento local')
      }
    },

    getCalificationStars (calification) {
      const stars = []
      for (let i = 0; i < calification; i++) {
        stars.push('mdi-star')
      }
      for (let i = calification; i < 5; i++) {
        stars.push('mdi-star-outline')
      }
      return stars
    },

    ver_cuenta () {
      const NUA = this.$route.query.NUA
      this.$router.push({
        path: '/principal/ver_cuenta/',
        query: { NUA }
      })
    },

    rutaMenu () {
      const NUA = this.$route.query.NUA
      this.$router.push({
        path: '/principal/',
        query: { NUA }
      })
    },

    rutaBusqueda () {
      const NUA = this.$route.query.NUA
      this.$router.push({
        path: '/principal/busqueda_raites/',
        query: { NUA }
      })
    },

    cerrar_sesión () {
      localStorage.removeItem('NUA')
      this.$router.push('/')
    },

    goCrearViaje () {
      // extraer el NUA de la URL
      const NUA = this.$route.query.NUA
      // eslint-disable-next-line no-console
      console.log('NUA', NUA)
      this.$router.push({
        path: '/principal/crear_viaje/',
        query: { NUA }
      })
    }
  }
}
</script>

<style>
.fuente {
  font-weight: bold;
  font-family: Source Sans Pro;
}

.bg-gradient {
  background-image: linear-gradient(135deg, #576cb9, #343c61);
}
</style>
