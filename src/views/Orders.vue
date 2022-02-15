<template>
    <v-container>
        <v-row class="text-center">
            <v-col>
                <v-card class="text-center">
                    <v-card-title>
                        Suivi des commandes
                    </v-card-title>
                    <v-data-table
                        :headers="headers"
                        :items="orders"
                    >
                        <template v-slot:item.id="{ item }">
                            <v-btn :to="`/order/${item.id}`" rounded color="primary">
                                <v-icon class="mr-2">mdi-clipboard-search</v-icon>
                                {{ item.id }}
                            </v-btn>
                        </template>
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
import OrderService from '../services/OrderService.js';

    export default {
        data(){
            return{
                expanded: "test",
                orders : [],
                headers : [
                    {
                        text : 'REFERENCE',
                        align : 'center',
                        value : 'id'
                    },
                    {
                        text : 'STATUT',
                        align : 'center',
                        value : 'status'
                    },
                    {
                        text : 'CLIENT',
                        align : 'center',
                        value : 'customer'
                    },
                    {
                        text : 'CREEE LE',
                        align : 'center',
                        value : 'created_at'
                    },
                    {
                        text : 'MISE A JOUR',
                        align : 'center',
                        value : 'updated_at'
                    }
                ]
            }
        },
        methods: {
            getOrders(){
                OrderService.getOrders()
                .then((response)=>{
                    this.orders = response.data
                })
            },
            getColor (status) {
                if (status == "Ouverte") return 'red'
                if (status == "En préparation") return 'orange'
                if (status == "Expediée" || status == "Réceptionnée") return 'green'
            },
        },
        async mounted () {
            await this.getOrders()
        },
    }
</script>