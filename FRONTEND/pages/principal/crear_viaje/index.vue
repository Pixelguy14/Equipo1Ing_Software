<template>
  <v-row>
    <v-col cols="7">
      <v-container grid-list-xs>
        <v-card-title primary-title class="text-h4 font-weight-bold">
          Crar nuevo viaje
        </v-card-title>
        <v-container grid-list-xs>
          <p class="text-disabled" style="color: #717171;">
            Viajar juntos es más divertido. ¡Únete a la comunidad! Completa el formulario para empezar tu viaje.
          </p>
        </v-container>
        <!-- Card origen y destino -->
        <v-container>
          <v-card class="card-style" style="background-color: #F6F6F8;">
            <v-row>
              <v-col cols="5">
                <v-select
                  v-model="origen"
                  :items="municipios"
                  label="Origen"
                  item-text="nombre"
                  item-value="nombre"
                  outlined
                  item-color="blue"
                  background-color="white"
                />
              </v-col>
              <v-col cols="2">
                <v-icon>mdi-car-arrow-right</v-icon>
              </v-col>
              <v-col cols="5">
                <v-select
                  v-model="destino"
                  :items="municipios"
                  label="Destino"
                  item-text="nombre"
                  item-value="nombre"
                  outlined
                  item-color="blue"
                  background-color="white"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-container>
        <!-- Hora y fecha -->
        <v-container>
          <v-card style="background-color: #F6F6F8;">
            <v-row>
              <v-col cols="5">
                <v-text-field
                  v-model="fecha"
                  label="Fecha de salida"
                  type="date"
                  outlined
                  background-color="white"
                />
              </v-col>
              <v-col cols="2">
                <p>y</p>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  v-model="hora"
                  label="Hora de salida"
                  type="time"
                  outlined
                  background-color="white"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-container>
        <!-- Punto de encuentro -->
        <v-container grid-list-xs>
          <v-card style="background-color: #F6F6F8;">
            <v-card-title primary-title class="px-6">
              Puntos de encuentro
            </v-card-title>
            <v-card-text class="px-6">
              Indica claramente los puntos de encuentro, paradas o lugares donde podrás recoger o dejar a tus compañeros de viaje. Ejemplo: Oxxo junto a la central de autobuses de Salamanca.
            </v-card-text>
            <v-card class="rounded-lg my-6 h-75 ma-5 px-6">
              <v-textarea v-model="punto_encuentro" type="text" maxlength="255" label="Punto de encuentro" />
            </v-card>
          </v-card>
        </v-container>
        <!-- Numero de espacios disponibles -->
        <v-container grid-list-xs>
          <v-card style="background-color: #F6F6F8;">
            <v-row style="display: flex; justify-content: center; align-items: center; flex-wrap: nowrap; align-content: center;">
              <v-col cols="1">
                <v-icon>mdi-account-group</v-icon>
              </v-col>
              <v-col cols="7">
                <v-card-text>
                  Número de espacios disponibles:
                </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="espacios_disponibles"
                  :items="nEspacios"
                  label="Cantidad"
                  item-text="espacio"
                  item-value="espacio"
                  outlined
                  background-color="white"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-container>
        <!-- Card costo del viaje -->
        <v-container grid-list-xs>
          <v-form fast-fail @submit.prevent>
            <v-card style="background-color: #F6F6F8;">
              <v-row style="display: flex; justify-content: center; align-items: center; flex-wrap: nowrap; align-content: center;">
                <v-col cols="1" display-3>
                  <v-icon>mdi-cash</v-icon>
                </v-col>
                <v-col cols="7">
                  <v-card-text type="money">
                    Costo del viaje por pasajero:
                  </v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-card class="px-4 mx-4">
                    <v-text-field
                      v-model="costo_viaje"
                      type="text"
                      maxlength="6"
                      :rules="necesario"
                      label="$0.00"
                      variant="outlined"
                    />
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-form>
        </v-container>
        <!-- Boton de crear viaje -->
        <v-container grid-list-xs>
          <v-btn color="primary" dark @click="crearViaje()">
            Crear viaje
          </v-btn>
        </v-container>
      </v-container>
    </v-col>
    <v-col cols="5">
      <v-card min-width class="car-news rounded-lg">
        <v-card-title class="new-title" style="color:white">
          ¡Objetos perdidos!
        </v-card-title>
        <v-card-subtitle class="new-info" style="color:white">
          ¿Encontraste algo que no es tuyo? Ayuda a tus compañeros a recuperar sus pertenencias. Ponte en contacto con los pasajeros de tu último viaje y devuelve lo que dejaron atrás. ¡Juntos hacemos la diferencia!
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
      origen: null,
      destino: null,
      fecha: null,
      hora: null,
      punto_encuentro: null,
      espacios_disponibles: null,
      costo_viaje: null,
      nua: '783246',
      nEspacios: [
        { espacio: '1' },
        { espacio: '2' },
        { espacio: '3' },
        { espacio: '4' }
      ],
      municipios: [
        { nombre: 'DICIS' },
        { nombre: 'Abasolo' },
        { nombre: 'Acámbaro' },
        { nombre: 'Apaseo el Alto' },
        { nombre: 'Apaseo el Grande' },
        { nombre: 'Atarjea' },
        { nombre: 'Celaya' },
        { nombre: 'Comonfort' },
        { nombre: 'Coroneo' },
        { nombre: 'Cortazar' },
        { nombre: 'Cuerámaro' },
        { nombre: 'Doctor Mora' },
        { nombre: 'Dolores Hidalgo' },
        { nombre: 'Guanajuato' },
        { nombre: 'Huanímaro' },
        { nombre: 'Irapuato' },
        { nombre: 'Jaral del Progreso' },
        { nombre: 'Jerécuaro' },
        { nombre: 'León' },
        { nombre: 'Moroleón' },
        { nombre: 'Ocampo' },
        { nombre: 'Pénjamo' },
        { nombre: 'Pueblo Nuevo' },
        { nombre: 'Purísima del Rincón' },
        { nombre: 'Romita' },
        { nombre: 'Salamanca' },
        { nombre: 'Salvatierra' },
        { nombre: 'San Diego de la Unión' },
        { nombre: 'San Felipe' },
        { nombre: 'San Francisco del Rincón' },
        { nombre: 'San José Iturbide' },
        { nombre: 'San Luis de la Paz' },
        { nombre: 'San Miguel de Allende' },
        { nombre: 'Santa Catarina' },
        { nombre: 'Santa Cruz de Juventino Rosas' },
        { nombre: 'Santiago Maravatío' },
        { nombre: 'Silao' },
        { nombre: 'Tarandacuao' },
        { nombre: 'Tarimoro' },
        { nombre: 'Tierra Blanca' },
        { nombre: 'Uriangato' },
        { nombre: 'Valle de Santiago' },
        { nombre: 'Victoria' },
        { nombre: 'Villagrán' },
        { nombre: 'Xichú' },
        { nombre: 'Yuriria' }
      ]
    }
  },

  methods: {
    async crearViaje () {
      // eslint-disable-next-line no-console
      console.log('Creando viaje...')
      try {
        await axios.post('http://localhost:4000/api/viajes/registrarViaje', {
          /*
            via_con_usu_NUA
            via_fecha_hora
            via_origen
            via_destino
            via_lugares_pasada
            via_esp_disp
            via_costo
          */
          via_con_usu_NUA: this.nua,
          via_fecha_hora: this.fecha + ' ' + this.hora + ':00',
          via_origen: this.origen,
          via_destino: this.destino,
          via_lugares_pasada: this.punto_encuentro,
          via_esp_disp: this.espacios_disponibles,
          via_costo: this.costo_viaje
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
      /* console.log('Origen:', this.origen)
      console.log('Destino:', this.destino)
      console.log('Fecha:', this.fecha)
      console.log('Hora:', this.hora)
      console.log('Punto de encuentro:', this.punto_encuentro)
      console.log('Espacios disponibles:', this.espacios_disponibles) */
    },
    mostrarTodoslosCampos () {
      // eslint-disable-next-line no-console
      console.log('Origen:', this.origen)
      // eslint-disable-next-line no-console
      console.log('Destino:', this.destino)
      // eslint-disable-next-line no-console
      console.log('Fecha:', this.fecha)
      // eslint-disable-next-line no-console
      console.log('Hora:', this.hora)
      // eslint-disable-next-line no-console
      console.log('union de fehc y hora', this.fecha + ' ' + this.hora + ':00')
      // eslint-disable-next-line no-console
      console.log('Punto de encuentro:', this.punto_encuentro)
      // eslint-disable-next-line no-console
      console.log('Espacios disponibles:', this.espacios_disponibles)
      // eslint-disable-next-line no-console
      console.log('Costo por viaje:', this.costo_viaje)
    }
  }
}
</script>

<style>

.color_subtitle {
  color: #717171;
}
.mi-select .v-select__selections {
  border-radius: 18px;
  background-color: #151D27;
}

.mi-select .v-select__selections .v-select__selection--comma {
  color: #FFFFFF;
}

.car-news {
  background-image: url('./static/img_cinturon.jpg');
  background-size: cover; /* Esto hará que la imagen de fondo cubra todo el v-card */
  background-position: center;
  /* border-radius: 24px; */
  height: 720px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: flex-start;
}

.card-style {
  background-color: #F6F6F8;
}

</style>
