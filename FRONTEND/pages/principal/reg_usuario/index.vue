<template>
  <v-row class="d-flex justify-center">
    <v-card class="pa-6 rounded-xxl my-5 " max-width="800">
      <v-card-title class="headline d-flex justify-center">
        Registrate
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
            v-model="nua"
            :rules="necesario"
            maxlength="6"
            label="NUA"
          />

          <v-text-field
            v-model="nombre"
            :rules="necesario"
            maxlength="20"
            label="Nombre"
          />

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="ape_pat"
                maxlength="20"
                :rules="necesario"
                label="Apellido Paterno"
                class="w-50"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="ape_mat"
                maxlength="20"
                label="Apellido Materno"
                class="w-50"
              />
            </v-col>
          </v-row>

          <v-text-field
            v-model="password"
            type="password"
            maxlength="255"
            :rules="passwords"
            label="Contraseña"
          />
          <v-row class="my-3">
            <v-col cols="6">
              <v-btn class="mt-2" block @click="toggleUsuTipo('estudiante_comun')">
                Pasajero
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn class="mt-2" block @click="toggleUsuTipo('estudiante_con_vehiculo')">
                Conductor
              </v-btn>
            </v-col>
          </v-row>

          <v-btn class="mt-2" block @click="Agregar_usuario()">
            Continuar
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
    nua: '',
    nombre: '',
    ape_pat: '',
    ape_mat: '',
    password: '',
    usu_tipo: '',
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
    toggleUsuTipo (newTipo) {
      // Cambiar el valor de usu_tipo según el botón presionado
      this.usu_tipo = newTipo
      // console.log(this.usu_tipo)
    },
    async Agregar_usuario () {
      const NUA = this.nua
      try {
        await axios.post('http://localhost:4000/api/usuarios/', {
          Usu_NUA: this.nua,
          Usu_Nombre: this.nombre,
          Usu_Apellido_Paterno: this.ape_pat,
          Usu_Apellido_Materno: this.ape_mat,
          Usu_Correo: this.email,
          Usu_Password: this.password,
          Usu_Tipo: this.usu_tipo
        })
        if (this.usu_tipo === 'estudiante_con_vehiculo') {
          this.$router.push({
            path: '/principal/reg_vehiculo',
            query: { NUA }
          }) // redireccionamiento
        } else {
          this.$router.push('/principal') // redireccionamiento
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
