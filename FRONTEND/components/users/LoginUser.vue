<!-- eslint-disable vue/valid-template-root -->
<template>
  <v-row class="d-flex justify-center">
    <v-card class="pa-6 rounded-xxl my-5 " max-width="800">
      <v-card-title class="headline d-flex justify-center">
        Inicia Sesion
      </v-card-title>
      <v-sheet class="mx-auto" width="300">
        <v-form fast-fail @submit.prevent>
          <v-text-field
            v-model="email"
            type="email"
            maxlength="100"
            :rules="necesario"
            label="Correo Institucional"
          />
          <v-text-field
            v-model="password"
            type="password"
            maxlength="255"
            :rules="passwords"
            label="Contraseña"
          />
          <v-btn class="mt-2" block @click="iniciar_sesion()">
            Iniciar Sesion
          </v-btn>
          <p v-if="showText" class="red--text text--lighten-2">
            Error al iniciar sesion!
          </p>
          <p>¿No tienes una cuenta?</p>
          <v-btn class="mt-2" block @click="crear_cuenta()">
            Crea una aquí
          </v-btn>
        </v-form>
      </v-sheet>
    </v-card>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    email: '',
    password: '',
    showText: false,
    necesario: [
      (value) => {
        if (value?.length > 0) { return true }

        return 'Rellena el campo obligatorio.'
      }
    ],
    passwords: [
      (value) => {
        if (value?.length > 7) { return true }

        return 'La contraseña debe contener mas de 8 caracteres.'
      }
    ]
  }),
  methods: {
    async iniciar_sesion () {
      try {
        const response = await axios.post('http://localhost:4000/api/usuarios/iniciar/', {
          Usu_Correo: this.email,
          Usu_Password: this.password
        })
        if (response.data.body.length < 1) { // si al hacer fetch no se encuentra el usuario:
          // console.error('Error al iniciar sesión')
          this.showText = true
        } else {
          const NUA = response.data.body[0].Usu_NUA
          // console.log(NUA)
          this.$router.push({
            path: '/principal/',
            query: { NUA }
          }) // redireccionamiento con el NUA de la cuenta iniciada
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
      }
    },
    crear_cuenta () {
      this.$router.push({
        path: '/principal/reg_usuario/'
      }) // redireccionamiento con el NUA de la cuenta iniciada
    }
  }
}
</script>
