<template>
    <v-container>
        <v-row class="text-center">
            <v-col>
                <v-card class="text-center">
                    <v-card-title>
                        Suivi des expéditions
                    </v-card-title>
                    <v-text-field
                        v-model="search"
                        prepend-icon="mdi-clipboard-text-search-outline"
                        label="Recherche par numero de suivi"
                        single-line
                        :full-width="full_width"
                        rounded
                        success
                    ></v-text-field>
                    <v-data-table
                        :headers="headers"
                        :items="sendings"
                        :search="search"
                    >
                        <template v-slot:item.status="{ item }">
                            <v-chip
                                :color="getColor(item.status)"
                                dark
                            >
                                {{ item.status }}
                            </v-chip>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SendingService from '../services/SendingService';

    export default {
        data() {
            return {
                sendings: [],
                search : '',
                full_width : false, 
                headers : [
                    {
                        text : 'ID',
                        align : 'center',
                        value : 'id'
                    },
                    {
                        text : 'N° DE SUIVI',
                        align : 'center',
                        filterable : true,
                        value : 'tracking_number'
                    },
                    {
                        text : 'STATUT',
                        align : 'center',
                        filterable : true,
                        value : 'status'
                    },
                    {
                        text : 'REF. COMMANDE',
                        align : 'center',
                        value : 'order_id'
                    },
                    {
                        text : 'POIDS TOTAL (kgs)',
                        align : 'center',
                        value : 'weight'
                    },
                ]
            }
        },
        methods: {
            getSendings() {
                SendingService.all()
                .then((response) => this.sendings = response.data)
            },
            getColor (status) {
                if (status == "Envoyé") return 'green'
                if (status == "Prépa en cours") return 'orange'
            },
        },
        async mounted () {    
            await this.getSendings();
        },
    }
</script>

<style lang="sass" scoped>

</style>