import axios from 'axios'
import { fetchProductSuccess, fetchProductFailure } from 'actions/product'

const BASE_URL = 'https://example.com'

export const fetchProduct = _ => {
  axios.get(`${BASE_URL}/product`)
  .then(response => {
    dispatch(fetchProductSuccess(response))
  })
  .catch(error => {
    dispatch(fetchProductFailure())
  })
}
