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
  create(tracking_number, order_id) {
    return apiClient.post('/sendings', {
        tracking_number,
        order_id,
        products : [],
        weight : 0,
        status : "Prépa en cours"
    })
  },
  all(){
    return apiClient.get('/sendings')
  },
  getOne(package_id){
    return apiClient.get('/sendings/' + package_id)
  },
  getByOrderId(order_id){
    return apiClient.get('/sendings/?order_id=' + order_id)
  },
  addProductToPackage(package_id, products, weight){
    return apiClient.patch('/sendings/' + package_id, {
      products,
      weight
    })
  },
  removeProductToPackage(package_id, products, weight) {
    return apiClient.patch('/sendings/' + package_id, {
      products,
      weight
    })
  },
  deleteSending(package_id){
    return apiClient.delete('/sendings/' + package_id)
  },
  sendPackage(package_id){
    return apiClient.patch('/sendings/' + package_id, {
      status : "Envoyé"
    })
  }
}
