<template>
  <v-app app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      elevation="0"
      color="black"
    >
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
          icon: 'mdi-car-side',
          title: 'Menú Principal',
          to: '/principal/'
        },
        {
          icon: 'mdi-car-info',
          title: 'Registrar Vehículo',
          to: '/principal/reg_vehiculo/'
        },
        {
          icon: 'mdi-card-account-details-outline',
          title: 'Registrar conductor',
          to: '/principal/reg_conductor/'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Raites DICIS'
    }
  },
  methods: {
    toggleDarkTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
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
