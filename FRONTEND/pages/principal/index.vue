<template>
  <div class="ajuste" fill-height>
    <!-- Botón "¿A dónde vas?" -->
    <v-btn
      rounded
      x-large
      color="#576CB9"
      elevation="0"
      style="color: white; width: 400px; margin-bottom: 16px;"
      class="fuente"
    >
      ¿A dónde vas?
    </v-btn>

    <!-- Botón "Crear Raite" -->
    <v-btn
      rounded
      x-large
      color="#B9F289"
      elevation="0"
      style="color: black; width: 400px; margin-bottom: 16px;"
      class="fuente"
    >
      Crear Raite
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    const token = localStorage.getItem('token')
    console.log('token', token)
    if (!token) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.fuente {
  font-weight: bold;
  font-family: Source Sans Pro;
}

.ajuste {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 80vh;
  padding: 0 0 0;
}
</style>
