<template>
  <v-row>
    <!-- seccion de busqueda -->
    <v-col cols="6">
      <v-text-field>
        <template #prepend>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-text-field>
      <!-- Filtros de busqueda -->
      <v-container>
        <v-sheet class="mx-auto" max-width="600">
          <v-slide-group show-arrows>
            <v-slide-group-item
              v-for="n in 25"
              :key="n"
              v-slot="{ isSelected, toggle }"
            >
              <v-btn
                :color="isSelected ? 'primary' : undefined"
                class="ma-2"
                rounded
                @click="toggle"
              >
                Options {{ n }}
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-container>
      <!-- viajes disponibles -->
      <v-card-title class="title-busqueda" style="color: #717171;">
        viajes disponibles
      </v-card-title>
      <!-- filtros -->
      <v-container>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              height="40"
              min-width="100"
              class="btn-filter"
            >
              Hoy
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn
              :ripple="false"
              height="40"
              min-width="100"
              class="btn-filter"
            >
              Mañana
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn
              :ripple="false"
              height="40"
              min-width="100"
              class="btn-filter"
            >
              11/05/2024
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn
              :ripple="false"
              height="40"
              min-width="100"
              class="btn-filter"
            >
              12/05/2024
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <!-- container de scroll -->
      <v-container class="cards-scroll">
        <!-- viajes disponibles -->
        <v-container v-for="(viaje, index) in viajes" :key="index">
          <v-card class="raite">
            <v-col>
              <v-container>
                <v-col>
                  <v-icon color="white">
                    mdi-account-group
                  </v-icon>
                  <v-text-subtitle id="num-per-disponibles-raite" style="color: white;">
                    {{ viaje.espacio_disponible }}
                  </v-text-subtitle>
                  <v-icon color="white">
                    mdi-calendar-clock
                  </v-icon>
                  <v-text-subtitle id="hora-fecha-raite" style="color: white">
                    {{ viaje.fecha }}
                  </v-text-subtitle>
                </v-col>
              </v-container>
              <v-container class="raite-cont-title-price">
                <v-row>
                  <v-col cols="4">
                    <v-card-title class="d-flex justify-center align-center" style="color: white">
                      {{ viaje.origen }}
                    </v-card-title>
                  </v-col>
                  <v-col cols="1" class="d-flex align-self-center">
                    <v-icon color="white" class="d-flex justify-center align-center">
                      mdi-arrow-right
                    </v-icon>
                  </v-col>
                  <v-col cols="4">
                    <v-card-title class="d-flex justify-center align-center align-self-center" style="color: white">
                      {{ viaje.destino }}
                    </v-card-title>
                  </v-col>
                  <v-col cols="3" class="raite-con-precio">
                    <v-text-subtitle class="raite-precio text-h4">
                      {{ '$' + viaje.costo }}
                    </v-text-subtitle>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-card>
        </v-container>
      </v-container>
      <!-- boton para pruebas -->
      <v-btn @click="imprimirViajes">
        Obtener raite
      </v-btn>
    </v-col>
    <!-- seccion de card anuncios =============================== -->
    <v-col cols="6">
      <v-card min-width class="car-news">
        <v-card-title class="new-title" style="color:white">
          Recuerda usar tu cinturon
        </v-card-title>
        <v-card-subtitle class="new-info" style="color:white">
          Usar tu cinturón de seguridad cuando estés en el automóvil. No solo es una norma de seguridad vial, sino que también puede salvar vidas en caso de un accidente.
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
      viajes: []
    }
  },
  /* Creacion de la pagina */
  async created () {
    await this.get_raites()
  },
  methods: {

    /* consultas a la base de datos */
    async get_raites () {
      try {
        const response = await axios.get('http://localhost:4000/api/viajes/todos')
        // eslint-disable-next-line no-console
        console.log(response.data.body)
        // aislamos los datos de la respuesta
        const body = response.data.body

        // iteramos sobre los datos y los agregamos al array de viajes
        for (let i = 0; i < body.length; i++) {
          this.viajes.push({ via_id: body[i].via_id, nua_conductor: body[i].via_con_usu_NUA, costo: body[i].via_costo, origen: body[i].via_origen, destino: body[i].via_destino, espacio_disponible: body[i].via_esp_disp, fecha: body[i].via_fecha_hora, descripcion: body[i].via_lugares_pasada })
          // eslint-disable-next-line no-console
          // console.log(body[i].via_fecha_hora)
        }
        // imprimir el contenido de la lsita de viajes
        // eslint-disable-next-line no-console
        // this.imprimirViajes()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },

    /* Imprimir en cosola todo lo que contiene viajes */
    imprimirViajes () {
      this.viajes.forEach((viaje) => {
        // eslint-disable-next-line no-console
        console.log(viaje)
      })
    }
  }
}
</script>

<style scoped>
  template {
    font-size: 1.5em;
    background-color: aliceblue;
    color: white;
  }
  .title-busqueda {
    font-size: 2em;
    color: gre#717171;
  }
  .input-con-busqueda {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gray;
  }
  .img_new {
    height: 10px;
    width: 30px;
  }
  .new_container {
    display: flex;
    height: 100%;
    width: auto;
    background-color: aquamarine;
  }
  .btn-filter{
    background-color: #387ED0;
    color: #717171;
    border-radius: 24px;
    border: 1px solid #717171;
  }
  .cards-scroll {
    overflow-y: auto;
    height: 500px;
  }
  .car-news {
    background-image: url('./static/img_cinturon.jpg');
    background-size: cover; /* Esto hará que la imagen de fondo cubra todo el v-card */
    background-position: center;
    border-radius: 24px;
    height: 720px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: flex-start;
  }
  .new-title{
    font-size: 2em;
    padding-left: 50px;
    padding-right: 50px;
  }
  .new-info{
    font-size: 1em;
    text-align: justify;
    line-height: 1.5;
    padding-top: 10px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 50px;
  }
  .raite{
    background: linear-gradient(to right, #060C10, #387ED0);
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-end;
    /* align-items: flex-start; */
  }
  .raite-cont-title-price{
    display: flex;
  }
  .raite-destino{
    display: flex;
  }
  .raite-con-precio{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    size: 1em;
  }
  .raite-precio{
    font-size: 1.5em;
    color: white;
  }
  .v-tab {
    border: 1px solid gray;
    background-color: #F0F0F0;
  }
</style>
