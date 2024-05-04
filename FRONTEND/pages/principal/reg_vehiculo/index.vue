<template>
  <!--<h1>Pagina del registro del vehiculo</h1>-->
  <v-row class="d-flex justify-center">
    <v-col cols="12" sm="8" md="20">
      <v-card class="pa-6 rounded-xxl my-5 " max-width="800">
        <v-card-title class="headline d-flex justify-center">
          Registrar un Vehiculo
        </v-card-title>
        <v-row>
          <v-col>
            <v-card-text>
              <!--Columna1-->
              <p>
                <v-text-field
                  v-model="userInput1"
                  type="number"
                  :rules="[() => validarRango(userInput1, 1990, 2025)]"
                  label="Año de creación del vehiculo"
                  min="1990"
                  max="2025"
                />
              </p>
              <p>
                <v-text-field
                  v-model="userInput2"
                  type="text"
                  :rules="necesario"
                  maxlength="17"
                  label="Número de identificación del vehiculo"
                />
              </p>
              <p>
                <v-text-field
                  v-model="userInput3"
                  type="number"
                  :rules="[() => validarRango(userInput3, 2, 9)]"
                  label="Capacidad máxima del vehiculo"
                  min="2"
                  max="9"
                />
              </p>
              <p>
                <v-select
                  v-model="userInput4"
                  :items="Fabricantes"
                  label="Fabricante del vehículo"
                  placeholder="Selecciona un fabricante"
                />
              </p>
              <!--<p>{{ userInput4 }}</p>-->
              <p>
                <v-select
                  v-model="userInput5"
                  :items="Modelos"
                  label="Modelo del vehículo"
                  placeholder="Selecciona un modelo"
                />
              </p>
              <p>
                <v-text-field
                  v-model="userInput6"
                  type="text"
                  :rules="necesario"
                  maxlength="30"
                  label="Color del Vehiculo"
                />
              </p>
              <p>
                <v-text-field
                  v-model="userInput7"
                  type="text"
                  :rules="necesario"
                  maxlength="100"
                  label="Dirección del Conductor"
                />
              </p>
              <p>
                <v-text-field
                  v-model="userInput8"
                  type="text"
                  :rules="necesario"
                  maxlength="6"
                  label="Código Postal del Conductor"
                />
              </p>
              <p>
                <v-text-field
                  v-model="userInput9"
                  type="text"
                  :rules="necesario"
                  maxlength="50"
                  placeholder="Ciudad del Conductor"
                />
              </p>
              <p>
                <v-text-field
                  v-model="userInput10"
                  type="tel"
                  :rules="necesario"
                  maxlength="10"
                  placeholder="Número de Telefono del Conductor"
                />
              </p>
            </v-card-text>
          </v-col>
          <v-col>
            <v-card-text>
              <!--Columna2-->
              <p style="font-size:10">
                Subir Tarjeta de Circulación
              </p>
              <p>
                <input
                  type="file"
                  accept=".pdf"
                  @change="subirCirculacion"
                >
              </p>
              <p style="font-size:10">
                Subir Poliza de Seguro Vigente
              </p>
              <p>
                <input
                  type="file"
                  accept=".pdf"
                  @change="subirPoliza"
                >
              </p>
              <p style="font-size:10">
                Subir Licencia de Conducir
              </p>
              <p>
                <input
                  type="file"
                  accept=".pdf"
                  @change="subirLicencia"
                >
              </p>
              <p style="font-size:10">
                Subir Comprobante de Domicilio
              </p>
              <p>
                <input
                  type="file"
                  accept=".pdf"
                  @change="subirDomicilio"
                >
              </p>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  nuxt
                  to="/principal"
                >
                  Confirmar Registro
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      necesario: [
        (value) => {
          if (value?.length > 0) { return true }

          return 'Rellena el campo obligatorio.'
        }
      ],
      userInput1: '', // Inicialmente vacío
      userInput2: '',
      userInput3: '',
      userInput4: '', // Opción seleccionada
      Fabricantes: [ // Lista de fabricantes
        'Acura', 'Alfa-Romeo', 'Aston Martin', 'Audi', 'BMW', 'Bentley', 'Buick', 'Cadilac', 'Chevrolet', 'Chrysler', 'Daewoo', 'Daihatsu', 'Dodge', 'Eagle', 'Ferrari', 'Fiat', 'Fisker', 'Ford', 'Freighliner', 'GMC - General Motors Company', 'Genesis', 'Geo', 'Honda', 'Hummer', 'Hyundai', 'Infinity', 'Isuzu', 'Jaguar', 'Jeep', 'Kla', 'Lamborghini', 'Land Rover', 'Lexus', 'Lincoln', 'Lotus', 'Mazda', 'Maserati', 'Maybach', 'McLaren', 'Mercedez-Benz', 'Mercury', 'Mini', 'Mitsubishi', 'Nissan', 'Oldsmobile', 'Panoz', 'Plymouth', 'Polestar', 'Pontiac', 'Porsche', 'Ram', 'Rivian', 'Rolls_Royce', 'Saab', 'Saturn', 'Smart', 'Subaru', 'Susuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
      ],
      userInput5: '',
      Modelos: [
        'SUV', 'Sedan', 'Coupe', 'Convertible', 'Hatchback', 'Pickup', 'Van', 'Minivan', 'Wagon'
      ],
      userInput6: '',
      userInput7: '',
      userInput8: '',
      userInput9: '',
      userInput10: ''
    }
  },
  methods: {
    validarRango (value, min, max) {
      const intValue = parseInt(value)
      if (intValue >= min && intValue <= max) {
        return true
      }
      return `Ingresa un número entre ${min} y ${max}`
    },
    subirCirculacion (event) {
      const archivo = event.target.files[0]
      if (archivo) {
        // Aquí puedes manejar el archivo cargado
        // console.log(`Archivo cargado: ${archivo.name}`)
      }
    },
    subirPoliza (event) {
      const archivo = event.target.files[0]
      if (archivo) {
        // Aquí puedes manejar el archivo cargado
        // console.log(`Archivo cargado: ${archivo.name}`)
      }
    },
    subirLicencia (event) {
      const archivo = event.target.files[0]
      if (archivo) {
        // Aquí puedes manejar el archivo cargado
        // console.log(`Archivo cargado: ${archivo.name}`)
      }
    },
    subirDomicilio (event) {
      const archivo = event.target.files[0]
      if (archivo) {
        // Aquí puedes manejar el archivo cargado
        // console.log(`Archivo cargado: ${archivo.name}`)
      }
    }
  }
}

</script>
