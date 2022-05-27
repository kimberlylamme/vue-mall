import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// Creating an instance of axios
const instance: AxiosInstance = axios.create({
  baseURL: 'http://kimberly.com',
  timeout: 3000,
  headers: {},
})

// Add a request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    Object.assign(config.headers, { Authorization: 'Your token' })
    return config
  },
  (error) => {
    // alert(`Error: ${error}`)
    return Promise.reject(error)
  },
)

// Add a response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, status, statusText } = response
    if (status !== 200) return Promise.reject(statusText)

    if (Number(data.status) === -90001) {
      // localStorage.removeItem('token')
      // localStorage.removeItem('isLogin')
      // window.location.href = '/login'
    }

    if (Number(data.status) !== 1) return Promise.reject(data.message)
    return data
  },
  (error) => {
    // alert(`Error: ${error}`)
    return Promise.reject(error)
  },
)

export default instance
