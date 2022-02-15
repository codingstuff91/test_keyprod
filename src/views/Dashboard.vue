<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mt-2">
        <h1 class="display-2 font-weight-bold mb-3">
          Tableau de bord
        </h1>
      </v-col>

    </v-row>
    <v-row class="text-justify d-flex justify-center">
        <v-col 
          v-for="item in links" :key="item.title"
          class="d-flex justify-center"
        >
            <v-card
                max-width="350"
                color="grey darken-1"
            >
                <v-card-title class="d-flex justify-center">
                    <v-icon x-large class="mr-2">{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-card-title>

                <v-card-subtitle>
                    {{ item.subtitle }}
                </v-card-subtitle>

                <v-card-actions class="d-flex justify-center">
                    <v-btn 
                        rounded 
                        class="mb-2 d-flex justify-center"
                        :to="item.path"
                    >
                        GO !
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        rounded : 10,
        links : [
          {
            title : "Gestion des commandes",
            subtitle : "Gérez et suivez l'ensemble des commandes des produits de la gamme 'KEYPROD'",
            path : "/orders",
            icon : "mdi-ballot"
          },
          {
            title : "Gestion des expeditions",
            subtitle : "Gerez l'ensemble des envois des produits de la gamme KEYPROD",
            path : "/sendings",
            icon : "mdi-truck-fast"
          }
        ]
      }
    }
  }
</script>
<style scoped>
.v-card{
  border-radius: 30px;
}
</style>
