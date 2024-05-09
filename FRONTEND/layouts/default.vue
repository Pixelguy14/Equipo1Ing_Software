<template>
  <v-app app>
    <v-app-bar :clipped-left="clipped" fixed app elevation="0" color="black">
      <v-toolbar-title style="color: white;" class="fuente">
        {{ title }}
      </v-toolbar-title>
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
        color="white"
        class="fuente"
        style="color: black;"
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
    <v-row justify="center">
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
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: 'Menú Principal',
          to: '/principal/'
        },
        {
          title: 'Registrar Vehículo',
          to: '/principal/reg_vehiculo/'
        },
        {
          title: 'Registrar usuario',
          to: '/principal/reg_usuario/'
        },
        {
          title: 'Historial',
          click: this.historialDialog
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Raites DICIS',
      abrirHistorial: false
    }
  },
  methods: {
    toggleDarkTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    handleItemClick (item) {
      if (item.title === 'Historial') {
        this.historialDialog()
      }
    },
    historialDialog () {
      this.abrirHistorial = true
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
