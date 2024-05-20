<template>
  <v-row class="d-flex justify-center">
    <v-card class="pa-6 rounded-xxl my-5" max-width="800">
      <v-card-title class="headline d-flex justify-center">
        Ver Vehiculo
      </v-card-title>
      <v-sheet class="mx-auto" width="300">
        <v-card-text>
          <v-btn
            class="mt-2 mb-3"
            elevation="0"
            append-icon="mdi-keyboard-return"
            @click="regresar()"
          >
            Regresar
          </v-btn>
          <v-text-field
            v-model="car_usu_nua"
            type="text"
            :rules="necesario"
            maxlength="6"
            label="NUA del Conductor"
            append-icon="mdi-account-lock"
            class="red--text text--lighten-2"
            readonly
          />
          <v-text-field
            v-model="car_anio"
            type="number"
            :rules="[() => validarRango(car_anio, 1990, 2025)]"
            label="Año de creación del vehiculo"
            min="1990"
            max="2025"
            :readonly="isReadOnly"
            :append-icon="icono"
          />
          <!--<v-text-field
          v-model="userInput2"
          type="text"
          :rules="necesario"
          maxlength="17"
          label="Número de identificación del vehiculo"
        /> -->
          <v-text-field
            v-model="car_capacidad"
            type="number"
            :rules="[() => validarRango(car_capacidad, 2, 9)]"
            label="Capacidad máxima del vehiculo"
            min="2"
            max="9"
            :readonly="isReadOnly"
            :append-icon="icono"
          />
          <v-select
            v-model="car_modelo"
            :items="Modelos"
            label="Modelo del vehículo"
            placeholder="Selecciona un modelo"
            :readonly="isReadOnly"
            :append-icon="icono"
          />
          <v-text-field
            v-model="car_color"
            type="text"
            :rules="necesario"
            maxlength="30"
            label="Color del Vehiculo"
            :readonly="isReadOnly"
            :append-icon="icono"
          />
          <v-text-field
            v-model="car_placas"
            type="text"
            :rules="necesario"
            maxlength="20"
            label="Placas del Vehiculo"
            :readonly="isReadOnly"
            :append-icon="icono"
          />
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="6">
              <v-btn
                v-if="btn_habilitar"
                rounded
                x-large
                elevation="1"
                color="yellow"
                class="fuente"
                style="color: black;"
                @click="habilitar_editar()"
              >
                Editar
              </v-btn>
              <v-btn
                v-if="btn_cancelar"
                rounded
                x-medium
                elevation="1"
                color="red"
                class="fuente"
                style="color: black;"
                @click="cancelar()"
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                v-if="btn_borrar"
                rounded
                x-large
                elevation="1"
                color="red"
                class="fuente"
                style="color: black;"
                @click="mostrarpopup = true"
              >
                Borrar
              </v-btn>
              <v-btn
                v-if="btn_editar"
                rounded
                x-medium
                elevation="1"
                color="green"
                class="fuente"
                style="color: black;"
                @click="editar_vehiculo()"
              >
                Confirmar
              </v-btn>
            </v-col>
            <div v-if="mostrarpopup" class="popup">
              <div class="contenido-popup">
                <h2 class="fuente">
                  Esta accion no se puede revertir!
                </h2>
                <v-btn
                  rounded
                  x-medium
                  elevation="1"
                  color="red"
                  class="fuente"
                  @click="mostrarpopup = false, borrar_vehiculo()"
                >
                  Borrar
                </v-btn>
                <v-btn
                  rounded
                  x-medium
                  elevation="1"
                  color="white"
                  class="fuente"
                  @click="mostrarpopup = false"
                >
                  Cancelar
                </v-btn>
              </div>
            </div>
          </v-row>
        </v-card-actions>
      </v-sheet>
    </v-card>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DefaultLayout',
  data () {
    return {
      necesario: [
        (value) => {
          if (value?.length > 0) { return true }

          return 'Rellena el campo obligatorio.'
        }
      ],
      car_anio: '',
      car_capacidad: '',
      car_modelo: '',
      Modelos: [
        'SUV', 'Sedan', 'Coupe', 'Convertible', 'Hatchback', 'Pickup', 'Van', 'Minivan', 'Wagon'
      ],
      car_color: '',
      car_placas: '',
      car_usu_nua: this.$route.query.NUA,
      btn_borrar: true,
      btn_editar: false,
      btn_habilitar: true,
      btn_cancelar: false,
      mostrarpopup: false,
      isReadOnly: true,
      icono: 'mdi-lock',
      car_id: ''
    }
  },
  created () {
    this.car_usu_nua = this.$route.query.NUA
    this.Vehiculo_id()
  },
  methods: {
    habilitar_editar () {
      this.btn_habilitar = false
      this.btn_cancelar = true
      this.isReadOnly = false
      this.btn_borrar = false
      this.btn_editar = true
      this.icono = 'mdi-unlocked-outline'
    },
    cancelar () {
      this.btn_habilitar = true
      this.btn_cancelar = false
      this.isReadOnly = true
      this.btn_habilitar = true
      this.btn_borrar = true
      this.btn_editar = false
      this.icono = 'mdi-lock'
      this.Vehiculo_id() // recuperamos los datos por si se hicieron algunos cambios sin guardar
    },
    validarRango (value, min, max) {
      const intValue = parseInt(value)
      if (intValue >= min && intValue <= max) {
        return true
      }
      return `Ingresa un número entre ${min} y ${max}`
    },
    async Vehiculo_id () {
      try {
        const respuesta = await axios.get(
        `http://localhost:4000/api/vehiculos/${this.car_usu_nua}`
        )
        this.car_modelo = respuesta.data.body[0].Car_Modelo
        this.car_anio = respuesta.data.body[0].Car_anio
        this.car_placas = respuesta.data.body[0].Car_Placas
        this.car_capacidad = respuesta.data.body[0].Car_Capacidad
        this.car_color = respuesta.data.body[0].Car_Color
        this.car_id = respuesta.data.body[0].Car_id
      } catch (err) {
        console.log(err)
        const NUA = this.car_usu_nua
        this.$router.push({
          path: '/principal/reg_vehiculo/',
          query: { NUA }
        }) // redireccionamiento si no tienes vehiculo.
      }
    },
    regresar () {
      const NUA = this.car_usu_nua
      this.$router.push({
        path: '/principal/ver_cuenta/',
        query: { NUA }
      }) // redireccionamiento
    },
    async editar_vehiculo () {
      this.btn_habilitar = true
      this.btn_cancelar = false
      this.isReadOnly = true
      this.btn_habilitar = true
      this.btn_borrar = true
      this.btn_editar = false
      this.icono = 'mdi-lock'
      try {
        await axios.put(
          `http://localhost:4000/api/vehiculos/${this.car_usu_nua}`, {
            Car_Modelo: this.car_modelo,
            Car_anio: this.car_anio,
            Car_Placas: this.car_placas,
            Car_Capacidad: this.car_capacidad,
            Car_Color: this.car_color,
            Car_id: this.car_id
          }
        )
      } catch (err) {
        console.log(err)
      }
      this.Vehiculo_id()
    },
    async borrar_vehiculo () {
      try {
        await axios.delete(
          `http://localhost:4000/api/vehiculos/${this.car_usu_nua}`
        )
      } catch (err) {
        console.log(err)
      }
      this.$router.push('/principal/ver_cuenta/') // redireccionamiento
    }
  }
}

</script>

<style scoped>
.popup {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}

.contenido-popup {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 20px;
  width: 25%;
}
</style>
