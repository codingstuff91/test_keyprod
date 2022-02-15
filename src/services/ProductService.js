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
  getProducts() {
    return apiClient.get('/products')
  },
  showProduct(id){
    return apiClient.get('/product/' + id)
  },
  deleteProduct(id){
    return apiClient.delete('/products/' + id)
  }
}
