<template>
    <v-container>
        <v-row class="text-center">
            <v-col>
                <v-card class="text-center">
                    <v-card-title class="text-center">ORDER REFERENCE : {{ this.order.id }}</v-card-title>
                    <v-row>
                        <v-col>
                            <h2>Statut commande</h2>
                            <v-chip>{{ order.status }}</v-chip>
                        </v-col>
                        <v-col>
                            <h2>Client</h2>
                            <p>{{ order.customer }}</p>
                        </v-col>
                        <v-col>
                            <h2>Date création</h2>
                            <p>{{ order.created_at }}</p>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col>
                            <v-btn 
                                rounded
                                large 
                                color="success"
                                class="my-2 mx-2"
                                @click="displayProducts"
                            >
                                <v-img 
                                    src="../assets/barcode.png"
                                    height="20px"
                                    width="20px"
                                    class="mr-2"
                                >
                                </v-img>
                                Scanner un produit
                            </v-btn>
                            <v-btn 
                                rounded
                                large
                                color="info"
                                class="my-2 mx-2"
                                @click="createPackage"
                            >
                                <v-img 
                                    src="../assets/shipment.png" 
                                    width="30px"
                                    height="30px"
                                    class="mr-2"
                                ></v-img>
                                Créer un colis
                            </v-btn> 
                        </v-col>
                    </v-row>
                    <!-- Affichage tableaux des produits -->
                    <v-row>
                        <v-col>
                            <h2>Produits commandés à préparer</h2>
                            <v-data-table 
                                color="grey"
                                class="ml-4"
                                :headers="products_ordered_headers"
                                :items="order.products_ordered"
                                dark
                                dense
                            >
                            </v-data-table>
                        </v-col>
                        <v-col>
                            <h2>Produits préparés</h2>
                            <v-data-table
                                :headers="products_prepared_headers"
                                :items="order.products_prepared"
                                class="mr-4"
                                dark
                            >
                            </v-data-table>
                        </v-col>
                    </v-row>
                    <!-- Affichage poids total commande -->
                    <v-row>
                        <v-col>
                            <div                             
                                v-if="order.products_prepared.length != 0"
                                class="my-4"
                            >
                                <h2>Poids total commande : {{ order_total_weight }} Kgs</h2>
                            </div>
                        </v-col>
                    </v-row>
                    <!-- Bouton validation envoi commande -->
                    <v-row>
                        <v-col>
                            <v-btn
                                v-if="sendings.length != 0"
                                rounded
                                color="green"
                                @click="confirmOrder(order.id)"
                            >
                                <v-img 
                                    src="../assets/stamp.png"
                                    height="30px"
                                    width="30px"
                                    class="mr-2"    
                                >
                                </v-img>
                                Envoyer commande
                            </v-btn>
                        </v-col>
                    </v-row>
                    <!-- Affichage des expeditions -->
                    <v-row v-if="sendings.length !=0">
                        <v-col justify="center">
                            <h2 class="mb-4">LISTE DES COLIS</h2>
                            <v-row>
                                <v-col align-self="center">
                                    <v-expansion-panels>
                                        <v-expansion-panel
                                            v-for="item in sendings" :key="item.id"
                                        >
                                        <v-expansion-panel-header color="blue">
                                            <p>{{ item.tracking_number }}</p>
                                            <v-spacer></v-spacer>
                                            <p>{{ item.products.length }} produits</p>
                                            <v-spacer></v-spacer>
                                            <p>{{ item.weight.toFixed(2) }} Kgs</p>
                                            <v-spacer></v-spacer>
                                            <!-- Si le colis est envoyé on affiche cela -->
                                            <v-chip 
                                                class="text-center"
                                                v-if="item.status =='Envoyé'"
                                            >
                                                <v-icon left>mdi-truck-fast-outline</v-icon>
                                                {{ item.status }}
                                            </v-chip>
                                            <!-- Si le colis n'est pas encore envoyé on affiche cela -->
                                            <v-chip 
                                                class="text-center"
                                                v-if="item.status !='Envoyé'"
                                            >
                                                <v-icon left>mdi-human-dolly</v-icon>
                                                {{ item.status }}
                                            </v-chip>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                rounded
                                                class="mx-4"
                                                @click="sendPackage(item.id)"
                                                v-if="item.status != 'Envoyé' && item.weight != 0"
                                            >
                                                Envoyer colis
                                            </v-btn>
                                            <v-btn
                                                rounded
                                                color="red"
                                                class="mx-4"
                                                @click="deletePackage(item.id)"
                                                v-if="item.status != 'Envoyé'"
                                            >
                                                <v-icon left>mdi-minus-circle</v-icon>
                                                Supprimer colis
                                            </v-btn>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-btn 
                                                @click="chooseProduct(item.id)"
                                                rounded
                                                color="green"
                                                class="mt-4"
                                                v-if="item.status != 'Envoyé'"
                                            >
                                                <v-img 
                                                    src="../assets/shipment.png" 
                                                    width="30px"
                                                    height="30px"
                                                    class="mr-2"
                                                ></v-img>
                                                Ajouter un produit
                                            </v-btn>
                                            <v-flex 
                                                v-for="product in item.products" 
                                                :key="product.id"
                                                align-self-center
                                            >
                                                <v-chip large class="mx-4 my-4">Product : {{ product.name }}</v-chip>
                                                <v-chip large class="mx-4">Serial number : {{ product.id }}</v-chip>
                                                <v-chip large class="mx-4">Weight : {{ product.weight }} kgs</v-chip>
                                                <v-btn 
                                                    rounded 
                                                    color="red"
                                                    v-if="item.status != 'Envoyé'"
                                                    @click="removeProductFromPackage(item.id, product.id, product.weight)"
                                                >
                                                    <v-icon left>mdi-trash-can-outline</v-icon>
                                                    Supprimer
                                                </v-btn>
                                            </v-flex>
                                        </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <!-- Modal scan d'un produit -->
        <v-row justify="center">
            <v-dialog
            v-model="dialog"
            scrollable
            min-width="500px"
            >
            <v-card>
                <v-card-title>Scanner un produit</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 600px;" color="blue">
                    <v-row>
                        <!-- Affichage des boitiers KeyNetic -->
                        <v-col>
                            <h2 class="mt-4">Boitiers KeyNetic</h2>
                            <div v-for="item in KeyNeticProductsList" :key="item.id">
                                <v-btn 
                                    color="green darken-3"
                                    class="my-4"
                                    @click="addProduct(item.id, item.name, item.weight)"
                                >
                                    {{ item.id }}
                                </v-btn>
                            </div>
                        </v-col>
                        <!-- Affichage liste des boitiers KeyVibe -->
                        <v-col>
                            <h2 class="mt-4">Boitiers KeyVibe</h2>
                            <div v-for="item in KeyVibeProductsList" :key="item.id">
                                <v-btn 
                                    color="green darken-3"
                                    class="my-4"
                                    @click="addProduct(item.id, item.name, item.weight)"
                                >
                                    {{ item.id }}
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn
                        color="red darken-1"
                        text
                        @click="dialog = false"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-row>
        <!-- Modal de choix d'un produit à ajouter dans un colis -->
        <v-row justify="center">
            <v-dialog
            v-model="package_dialog"
            scrollable
            max-width="450px"
            max-height="600px"
            >
            <v-card>
                <v-card-title>Ajouter un produit</v-card-title>
                <v-divider></v-divider>
                <v-card-text color="blue" class="d-flex flex-column">
                    <v-chip 
                        v-for="product in order.products_prepared" :key="product.id"
                        class="my-4 text-center" 
                        large
                        @click="addProductToPackage(product)"
                    >
                        {{ product.id }}
                    </v-chip>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn
                        color="red darken-1"
                        text
                        @click="package_dialog = false"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";
import ProductService from '../services/ProductService';
import OrderService from '../services/OrderService';
import SendingService from '../services/SendingService';

    export default {
        data() {
            return {
                dialog : false,
                package_dialog : false,
                singleSelect: false,
                order: {},
                products : [],
                sendings : [],
                package_id : '',
                package_weight : 0,
                package_products : [],
                order_total_weight : 0,
                products_ordered_headers : [
                    {
                        text : 'PRODUIT',
                        align : 'center',
                        value : 'name'
                    },
                    {
                        text : 'VERSION',
                        align : 'center',
                        value : 'version'
                    },
                    {
                        text : 'QUANTITE',
                        align : 'center',
                        value : 'quantity'
                    },
                ],
                products_prepared_headers : [
                    {
                        text : 'N° DE SERIE',
                        align : 'center',
                        value : 'id'
                    }, 
                    {
                        text : 'PRODUIT',
                        align : 'center',
                        value : 'name'
                    }, 
                    {
                        text : 'POIDS (Kgs)',
                        align : 'center',
                        value : 'weight'
                    }, 
                ]
            }
        },
        computed: {
            KeyNeticProductsList() {
                return this.products.filter(element => {
                    return element.name == "KeyNetic"
                })
            },
            KeyVibeProductsList() {
                return this.products.filter(element => {
                    return element.name == "KeyVibe"
                })
            }
        },
        methods: {
            // Afficher details de la commande
            getOrder() {
                OrderService.showOrder(this.$route.params.id)
                .then((response)=>{
                    this.order = response.data

                    if(this.order.products_prepared.length != 0){
                        this.order.products_prepared.forEach(element => {
                            this.order_total_weight += parseFloat(element.weight)
                        })
                    }
                })
            },
            // Afficher tous les produits pour en choisir un
            displayProducts(){
                ProductService.getProducts()
                .then((response)=>{
                    this.products = response.data
                    this.dialog = true
                })
            },
            // Scan d'un produit préparé
            async addProduct(product_id, product_name, product_weight){
                let product_to_add = {
                    id : product_id,
                    name : product_name,
                    weight : product_weight
                }

                // Prise en compte du nouveau produit
                this.order.products_prepared.push(product_to_add)
                await OrderService.updateProductPrepared(this.order.id, this.order.products_prepared)
                
                // Suppression du produit dans la liste des produits (éviter de mettre 2 fois le meme produit dans 2 commandes)
                await ProductService.deleteProduct(product_id)

                // Ajout du poids du produit scanné
                this.order_total_weight += parseFloat(product_weight)

                // Fermeture de la modal
                this.dialog = false
            },
            // Création d'un colis
            async createPackage(){
                let tracking_number = "EXP_" + this.order.id + "_" + Math.floor(Math.random() * 1000)

                await SendingService.create(tracking_number, this.order.id)

                await this.getSendings(this.order.id)
            },
            // Recuperer les expeditions liées à une commande
            getSendings(order_id){
                SendingService.getByOrderId(order_id)
                .then(response => this.sendings = response.data)
            },
            // Choix d'un produit à un colis
            chooseProduct(package_id){
                this.package_dialog = true
                this.package_id = package_id
                this.package_weight = 

                SendingService.getOne(package_id)
                .then(response => {
                    this.package_products = response.data.products
                    this.package_weight = response.data.weight
                })
            },
            // Affecter un produit à un colis
            async addProductToPackage(product){
                this.package_weight += parseFloat(product.weight)
                this.package_products.push(product)

                await SendingService.addProductToPackage(this.package_id, this.package_products, this.package_weight)
                .then(console.log('new product added !'))

                await this.getSendings(this.order.id)

                this.package_dialog = false
            },
            async removeProductFromPackage(package_id, product_id, product_weight){
                await SendingService.getOne(package_id)
                .then(response => {
                    this.package_products = response.data.products
                    this.package_weight = response.data.weight
                })
                
                this.package_products = this.package_products.filter(element => {
                    return element.id != product_id
                })

                let final_weight = this.package_weight - product_weight
                await SendingService.removeProductToPackage(package_id, this.package_products, final_weight)

                await this.getSendings(this.order.id)
            },
            // Supprimer un colis
            async deletePackage(package_id){
                await SendingService.deleteSending(package_id)
                
                await this.getSendings(this.order.id)
            },
            async sendPackage(package_id){
                await SendingService.sendPackage(package_id)

                await this.getSendings(this.order.id)
            },
            async confirmOrder(order_id){
                await OrderService.sendOrder(order_id)

                await this.getOrder(this.$route.params.id)
            }
        },
        async mounted () {
            await this.getOrder();

            await this.getSendings(this.$route.params.id);
        },
    }
</script>

<style lang="scss" scoped>

</style>