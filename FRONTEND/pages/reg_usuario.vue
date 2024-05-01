<template>
  <v-row class="d-flex justify-center">
    <v-col cols="12" sm="8" ma="20">
      <v-card class="pa-2 mx-auto" width="400">
        <v-card-text class="headline d-flex justify-center font-weight-black">
          Registro conductor
        </v-card-text>
        <v-sheet class="mx-auto" width="300">
          <v-file-input
            v-model="frontLicense"
            accept=".pdf"
            label="Parte delantera de tu licencia de conducir"
          />

          <v-file-input
            v-model="backLicense"
            accept=".pdf"
            label="Parte trasera de tu licencia de conducir"
          />

          <!-- El button debe cerrar esta ventana y guardar la informacion. -->
          <v-btn class="m-2 my-2" type="submit" block>
            Continuar
          </v-btn>
        </v-sheet>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    frontLicense: '',
    backLicense: ''
  })
  // Falta añadir la acción de guardar los archivos
}
</script>
