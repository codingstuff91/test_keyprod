<template>
  <v-app>
    <v-app-bar
      app
      color="grey darken-1"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo_keyprod.png')"
          transition="scale-transition"
          width="150"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        text
        to="/"
      >
        <v-icon left>mdi-home-circle</v-icon>
        <span class="mr-2">Accueil</span>
      </v-btn>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        text
        to="/orders"
      >
        <v-icon left>mdi-clipboard-list</v-icon>
        <span class="mr-2">Commandes</span>
      </v-btn>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        text
        to="/sendings"
      >
        <v-icon left>mdi-truck-fast-outline</v-icon>
        <span class="mr-2">Expeditions</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
