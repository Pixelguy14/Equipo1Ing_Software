<template>
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
      <v-card>
        <v-row>
          <v-col cols="5">
            <v-select
              v-model="origen"
              :items="municipios"
              label="Origen"
              item-text="nombre"
              item-value="nombre"
              variant="solo-filled"
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
            />
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- Hora y fecha -->
    <v-container>
      <v-card>
        <v-row>
          <v-col cols="5">
            <v-text-field
              v-model="fecha"
              label="Fecha de salida"
              type="date"
              outlined
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
            />
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- Punto de encuentro -->
    <v-container grid-list-xs>
      <v-card>
        <v-card-title primary-title>
          Puntos de encuentro
        </v-card-title>
        <v-card-text>
          Indica claramente los puntos de encuentro, paradas o lugares donde podrás recoger o dejar a tus compañeros de viaje. Ejemplo: Oxxo junto a la central de autobuses de Salamanca.
        </v-card-text>
        <v-card>
          <v-text-field v-model="punto_encuentro" type="text" maxlength="255" label="Punto de encuentro" />
        </v-card>
      </v-card>
    </v-container>

    <!-- Numero de espacios disponibles -->
    <v-container grid-list-xs>
      <v-card>
        <v-row>
          <v-col>
            <v-icon>mdi-account-group</v-icon>
          </v-col>
          <v-col>
            <v-card-text>
              Número de espacios disponibles:
            </v-card-text>
          </v-col>
          <v-col>
            <v-select
              v-model="origen"
              :items="nEspacios"
              label="Cantidad"
              item-text="espacio"
              item-value="espacio"
              outlined
            />
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- Card costo del viaje -->
    <v-container grid-list-xs>
      <v-form fast-fail @submit.prevent>
        <v-card color="#F6F6F8">
          <v-row>
            <v-col>
              <v-icon>mdi-cash</v-icon>
            </v-col>
            <v-col>
              <v-card-text>
                Costo del viaje por pasajero:
              </v-card-text>
            </v-col>
            <v-col>
              <v-card>
                <v-text-field v-model="v_nua" type="text" maxlength="6" :rules="necesario" label="$0.00" />
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-form>
    </v-container>

    <!-- Boton de crear viaje -->
    <v-container grid-list-xs>
      <v-btn color="primary" dark @click="crearViaje">
        Crear viaje
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {

  data () {
    return {
      origen: null,
      destino: null,
      fecha: null,
      hora: null,
      punto_encuentro: null,
      espacios_disponibles: null,
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
    crearViaje () {
      // eslint-disable-next-line no-console
      console.log('Creando viaje...')
      /* console.log('Origen:', this.origen)
      console.log('Destino:', this.destino)
      console.log('Fecha:', this.fecha)
      console.log('Hora:', this.hora)
      console.log('Punto de encuentro:', this.punto_encuentro)
      console.log('Espacios disponibles:', this.espacios_disponibles) */
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

</style>
