<template>
  <!--<h1>Pagina del registro del vehiculo</h1>-->
  <v-row justify="end" align="center">
    <v-col cols="12" sm="8" md="20">
      <!--<v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>-->
      <v-card>
        <v-card-title class="headline">
          Registrar un Vehiculo
        </v-card-title>
        <v-row>
          <v-col>
            <v-card-text>
              Columna1
              <transition name="fade">
                <p v-show="userInput1" class="fadeintext">
                  Año de creación del vehiculo
                </p>
              </transition>
              <p>
                <input
                  v-model="userInput1"
                  type="number"
                  size="30px"
                  placeholder="Año de creación del vehiculo"
                  min="1990"
                  max="2025"
                  style="color: white;"
                >
              </p>
              <transition name="fade">
                <p v-show="userInput2" class="fadeintext">
                  Número de identificación del vehiculo
                </p>
              </transition>
              <p>
                <input
                  v-model="userInput2"
                  type="text"
                  size="30px"
                  maxlength="17"
                  placeholder="Número de identificación del vehiculo"
                  style="color: white;"
                >
              </p>
              <transition name="fade">
                <p v-show="userInput3" class="fadeintext">
                  Capacidad máxima del vehiculo
                </p>
              </transition>
              <p>
                <input
                  v-model="userInput3"
                  type="number"
                  size="30px"
                  placeholder="Capacidad máxima del vehiculo"
                  min="2"
                  max="9"
                  style="color: white;"
                >
              </p>
              <transition name="fade">
                <p v-show="userInput4" class="fadeintext">
                  Fabricante del vehiculo
                </p>
              </transition>
              <p>
                <select v-model="userInput4">
                  <option v-if="!userInput4" disabled value="">
                    Fabricante del vehiculo
                  </option>
                  <option
                    v-for="option in Fabricantes"
                    :key="option"
                    :value="option"
                    :style="{ color: userInput4 === option ? 'gold' : 'black' }"
                  >
                    {{ option }}
                  </option>
                </select>
                <!--<p>{{ userInput4 }}</p>-->
              </p>
              <transition name="fade">
                <p v-show="userInput5" class="fadeintext">
                  Modelo del vehiculo
                </p>
              </transition>
              <p>
                <select v-model="userInput5">
                  <option v-if="!userInput5" disabled value="">
                    Modelo del vehiculo
                  </option>
                  <option
                    v-for="option in Modelos"
                    :key="option"
                    :value="option"
                    :style="{ color: userInput5 === option ? 'gold' : 'black' }"
                  >
                    {{ option }}
                  </option>
                </select>
                <!--<p>{{ userInput4 }}</p>-->
              </p>
              <transition name="fade">
                <p v-show="userInput6" class="fadeintext">
                  Color del vehiculo
                </p>
              </transition>
              <p>
                <input
                  v-model="userInput6"
                  type="text"
                  size="30px"
                  maxlength="30"
                  placeholder="Color del Vehiculo"
                  style="color: white;"
                >
              </p>
              <transition name="fade">
                <p v-show="userInput7" class="fadeintext">
                  Dirección del Conductor
                </p>
              </transition>
              <p>
                <input
                  v-model="userInput7"
                  type="text"
                  size="30px"
                  maxlength="30"
                  placeholder="Dirección del Conductor"
                  style="color: white;"
                >
              </p>
              <transition name="fade">
                <p v-show="userInput8" class="fadeintext">
                  Código Postal del Conductor
                </p>
              </transition>
              <p>
                <input
                  v-model="userInput8"
                  type="text"
                  size="30px"
                  maxlength="30"
                  placeholder="Código Postal del Conductor"
                  style="color: white;"
                >
              </p>
              <transition name="fade">
                <p v-show="userInput9" class="fadeintext">
                  Ciudad del Conductor
                </p>
              </transition>
              <p>
                <input
                  v-model="userInput9"
                  type="text"
                  size="30px"
                  maxlength="30"
                  placeholder="Ciudad del Conductor"
                  style="color: white;"
                >
              </p>
              <transition name="fade">
                <p v-show="userInput10" class="fadeintext">
                  Número de Telefono del Conductor
                </p>
              </transition>
              <p>
                <input
                  v-model="userInput10"
                  type="tel"
                  size="30px"
                  maxlength="30"
                  placeholder="Número de Telefono del Conductor"
                  style="color: white;"
                >
              </p>
            </v-card-text>
          </v-col>
          <v-col>
            <v-card-text>
              Columna2
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
                  to="/"
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transition: opacity 0.5s;
}
.fadeintext{
    font-size: 10px;
}
</style>
