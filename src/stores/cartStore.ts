import { defineStore } from 'pinia'
import http from './http'

type Params = {
  session_key?: string
  cart?: any
  cart_ids?: any
  goods_id?: number
  goods_num?: number
  item_id?: number
}

type cartState = {
  cartList: any[]
  isSelect: boolean
  selectedAll: boolean
  totalPrice: string
}

export const useCartStore = defineStore({
  id: 'cartStore',
  state: () =>
    ({
      cartList: [],
      isSelect: false,
      selectedAll: false,
      totalPrice: '0.00',
    } as cartState),
  getters: {},
  actions: {
    // 购物车列表
    async fetchCartList(params: Params) {
      try {
        const url = '/api/cart/index'
        params['session_key'] = 'e8b91d9fd4195c6c772670750d90bd19'
        const response = await http.post(url, params)
        this.$reset()
        this.cartList = response.data.cartList
        if (response.data.cartList.length === 0) return
        let total = 0
        let checkAll = true
        let checkCal = false
        const copyProducts = JSON.parse(JSON.stringify(this.cartList))
        copyProducts.map((item: any) => {
          if (item.selected === 0 && checkAll === true) checkAll = false
          if (item.selected === 1 && checkCal === false) checkCal = true
          if (item.selected === 1) {
            total += item.goods_price * item.goods_num
          }
        })

        this.totalPrice = total.toFixed(2)
        this.selectedAll = checkAll
        this.isSelect = checkCal
        return response.data.cartList
      } catch (error) {
        console.log('fetchCartList', error)
      }
    },

    // 添加购物车
    async fetchAddCart(params: Params) {
      try {
        const url = '/api/cart/ajaxAddCart'
        params['session_key'] = 'e8b91d9fd4195c6c772670750d90bd19'
        const response = await http.get(url, { params })
        return response
      } catch (error) {
        console.log('fetchAddCart', error)
      }
    },

    // 修改购物车
    async fetchUpdateCart(id: number, num: number, type: number) {
      try {
        const product: any = this.cartList.find((item: any) => item.id === id)
        console.log('product', product)
        if (!product) return

        let productNum = product.goods_num
        switch (type) {
          case -1:
            if (product.goods_num === 1) return
            productNum = parseInt(product.goods_num) - 1
            break
          case 1:
            productNum = parseInt(product.goods_num) + 1
            break
          default:
            productNum = product.goods_num
        }

        const url = '/api/cart/changeNum'
        const params: Params = { cart: { id: id, goods_num: productNum } }
        params['session_key'] = 'e8b91d9fd4195c6c772670750d90bd19'
        const response = await http.post(url, params)
        return response
      } catch (error) {
        console.log('fetchUpdateCart', error)
      }
    },

    // 移除购物车
    async fetchRemoveCart(params: Params) {
      try {
        const url = '/api/cart/delete'
        params['session_key'] = 'e8b91d9fd4195c6c772670750d90bd19'
        const response = await http.post(url, params)
        return response
      } catch (error) {
        console.log('fetchRemoveCart', error)
      }
    },

    // 选择商品
    async fetchSelectCart(id: number) {
      try {
        const copyProducts = JSON.parse(JSON.stringify(this.cartList))
        copyProducts.map((item: any) => {
          if (item.id === id) item.selected = item.selected === 0 ? 1 : 0
        })

        const url = '/api/cart/AsyncUpdateCart'
        const params: Params = { cart: copyProducts }
        params['session_key'] = 'e8b91d9fd4195c6c772670750d90bd19'
        const response = await http.post(url, params)
        return response
      } catch (error) {
        console.log('fetchSelectCart', error)
      }
    },

    // 选择商品
    async fetchAllCart() {
      try {
        const copyProducts = JSON.parse(JSON.stringify(this.cartList))
        copyProducts.map((item: any) => {
          item.selected = this.selectedAll ? 0 : 1
        })

        const url = '/api/cart/AsyncUpdateCart'
        const params: Params = { cart: copyProducts }
        params['session_key'] = 'e8b91d9fd4195c6c772670750d90bd19'
        const response = await http.post(url, params)
        return response
      } catch (error) {
        console.log('fetchAllCart', error)
      }
    },
  },
})
