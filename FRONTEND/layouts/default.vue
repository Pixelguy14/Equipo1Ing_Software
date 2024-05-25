<template>
  <v-app app>
    <v-app-bar :clipped-left="clipped" fixed app elevation="0" color="black">
      <v-toolbar-title style="color: white;" class="fuente">
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
        <v-app-bar :clipped-left="clipped" fixed app elevation="0" color="black">
          <v-btn icon dark @click="abrirHistorial = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title style="color: white;" class="fuente">
            Historial
          </v-toolbar-title>
          <v-spacer />
        </v-app-bar>
        <v-data-table
          able
          elevation="0"
          :headers="headers"
          :items="historialItems"
          :items-per-page="5"
          hide-default-footer
          style="margin: 50 auto; max-width: 100% !important;"
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
      headers: [
        { text: 'Fecha', align: 'center', sortable: true, value: 'via_fecha_hora' },
        { text: 'NUA', align: 'center', sortable: true, value: 'Cal_Califica_Usu_NUA' },
        { text: 'Origen', align: 'center', sortable: true, value: 'via_origen' },
        { text: 'Precio', align: 'center', sortable: true, value: 'via_costo' },
        { text: 'Calificación', align: 'center', sortable: false, value: 'Cal_Calificacion' }
      ],
      historialItems: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Raites DICIS',
      abrirHistorial: false,
      cardCierraSesión: false
    }
  },
  computed: {
    items () {
      return [
        {
          title: 'Menú Principal',
          // to: '/principal/',
          // query: { NUA: this.nuaUrl }
          action: this.rutaMenu
        },
        {
          title: 'Busqueda de viajes',
          // to: '/principal/busqueda_raites/',
          // query: { NUA: this.nuaUrl }
          action: this.rutaBusqueda
        },
        {
          title: 'Historial',
          action: this.historialDialog // Cambio aquí
        }
      ]
    }
  },
  methods: {
    toggleDarkTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    handleItemClick (item) {
      if (item.title === 'Historial') {
        this.fetchHistorialData() // Llamar a fetchHistorialData() antes de abrir el diálogo
        this.abrirHistorial = true // Abrir el diálogo después de obtener los datos
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
    async fetchHistorialData () {
      const storedNUA = localStorage.getItem('NUA')

      if (storedNUA) {
        try {
          this.NUA = storedNUA
          const apiUrl = `http://localhost:4000/api/historial/${this.NUA}`
          const response = await axios.get(apiUrl)
          this.historialItems = response.data.body.map(item => ({
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
      const NUA = this.$route.query.NUA // este valor se obtiene desde el LOGIN
      this.$router.push({
        path: '/principal/ver_cuenta/',
        query: { NUA }
      })
    },
    rutaMenu () {
      const NUA = this.$route.query.NUA // este valor se obtiene desde el LOGIN
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
    // Eliminar el NUA del almacenamiento local
      localStorage.removeItem('NUA')
      // Redirigir a la página de inicio de sesión
      this.$router.push('/')
    }
  }
}
</script>

<style>
.fuente {
  font-weight: bold;
  font-family: Source Sans Pro;
}
</style>
