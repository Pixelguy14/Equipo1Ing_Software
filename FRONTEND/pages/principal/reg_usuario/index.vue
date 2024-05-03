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
            :rules="necesario"
            label="Correo Institucional"
          />

          <v-text-field
            v-model="nua"
            :rules="necesario"
            label="NUA"
          />

          <v-text-field
            v-model="nombre"
            :rules="necesario"
            label="Nombre"
          />

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="ape_pat"
                :rules="necesario"
                label="Apellido Paterno"
                class="w-50"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="ape_mat"
                label="Apellido Materno"
                class="w-50"
              />
            </v-col>
          </v-row>

          <v-text-field
            v-model="password"
            type="password"
            :rules="passwords"
            label="Contraseña"
          />
          <v-row class="my-3">
            <v-col cols="6">
              <v-btn class="mt-2" type="submit" block>
                Pasajero
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn class="mt-2" type="submit" block>
                Conductor
              </v-btn>
            </v-col>
          </v-row>

          <v-btn class="mt-2" type="submit" block>
            Continuar
          </v-btn>
        </v-form>
      </v-sheet>
    </v-card>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    email: '',
    nua: '',
    nombre: '',
    ape_pat: '',
    ape_mat: '',
    password: '',
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
  })
}
</script>
