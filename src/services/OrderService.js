import axios from 'axios'
    
const apiClient = axios.create({  
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getOrders() {
    return apiClient.get('/orders')
  },
  showOrder(id){
    return apiClient.get('/orders/' + id)
  },
  updateProductPrepared(id, products_prepared){
    return apiClient.patch('/orders/' + id, {
      products_prepared
    })
  },
  sendOrder(order_id){
    return apiClient.patch('/orders/' + order_id, {
      status : "Expediée"
    })
  }
}
