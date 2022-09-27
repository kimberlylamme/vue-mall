import { defineStore } from 'pinia'
import products from '../data/products.json'
import type { Product } from '@/interfaces/goods'
import type { Cart, cartProduct } from '@/interfaces/carts'

interface cartState {
  cartList: any[]
  isSelect: boolean
  selectedAll: boolean
  totalPrice: string
}

interface paramAddCart {
  goodsId: number
  count: number
  skuId: number
}

interface paramDelcart {
  goodsId: number
  skuId: number
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
    async fetchCartList() {
      try {
        this.$reset()
        const lists = JSON.parse(localStorage.getItem('cart-list') || '[]')
        if (lists.length === 0) return
        let total = 0
        let checkAll = true
        let checkCal = false
        lists.map((list: any) => {
          list.goodsName = ''
          list.image = ''
          list.price = 0.0
          if (list.selected === 0 && checkAll === true) checkAll = false
          if (list.selected === 1 && checkCal === false) checkCal = true
          const product = products.find((product) => list.goodsId === product.goodsId)
          if (!product) return list
          list.goodsName = product.goodsName
          list.image = product.image
          list.price = product.price
          const sku = product.skus?.find((sku) => sku.skuId === list.skuId)
          if (!sku) {
            if (list.selected === 1) {
              total += Number(product.price * list.count)
            }
            return list
          }
          list.image = sku.image
          list.price = sku.price
          if (list.selected === 1) {
            total += Number(sku.price * list.count)
          }
          return list
        })
        this.totalPrice = total.toFixed(2)
        this.selectedAll = checkAll
        this.isSelect = checkCal
        this.cartList = lists
      } catch (error) {
        console.log('fetchCartList', error)
      }
    },

    // 添加购物车
    async fetchAddCart(params: paramAddCart) {
      try {
        const cartLists = JSON.parse(localStorage.getItem('cart-list') || '[]')
        const copyCartLists = JSON.parse(JSON.stringify(cartLists))
        const product = products?.find((product: Product) => product.goodsId === params.goodsId)
        if (!product) return { code: 0, message: '没有该商品' }
        const sku = product.skus?.find((sku) => sku.skuId === params.skuId)

        if (cartLists.length > 0) {
          const cartInfo = copyCartLists.find(
            (list: Cart) => list.goodsId === params.goodsId && list.skuId === params.skuId,
          )
          if (cartInfo) {
            cartInfo.count = cartInfo.count + params.count
            if (!sku && product.stock < cartInfo.count) return { code: 0, message: '库存不足' }
            if (sku && sku.stock < cartInfo.count) return { code: 0, message: '库存不足' }
            localStorage.setItem('cart-list', JSON.stringify(copyCartLists))
            return { code: 1, message: '操作成功' }
          }
        }

        if (!sku && product.stock < params.count) return { code: 0, message: '库存不足' }
        if (sku && sku.stock < params.count) return { code: 0, message: '库存不足' }
        const addCart = {
          goodsId: params.goodsId,
          skuId: params.skuId,
          count: params.count,
          selected: 0,
        }
        console.log(addCart)
        localStorage.setItem('cart-list', JSON.stringify([...cartLists, addCart]))
        return { code: 1, message: '操作成功' }
      } catch (error) {
        console.log('fetchAddCart', error)
      }
    },

    // 修改购物车
    async fetchUpdateCart(params: cartProduct[]) {
      try {
        if (params.length > 0) localStorage.setItem('cart-list', JSON.stringify(params))
        return { code: 1, message: '操作成功' }
      } catch (error) {
        console.log('fetchUpdateCart', error)
      }
    },

    // 移除购物车
    async fetchDelCart(params: paramDelcart) {
      try {
        const cartLists = JSON.parse(localStorage.getItem('cart-list') || '[]')
        const lists = cartLists.filter(
          (cart: Cart) => !(cart.goodsId === params.goodsId && cart.skuId === params.skuId),
        )
        lists.length > 0
          ? localStorage.setItem('cart-list', JSON.stringify(lists))
          : localStorage.setItem('cart-list', '')
        return { code: 1, message: '删除成功' }
      } catch (error) {
        console.log('fetchDelCart', error)
      }
    },

    // 选择商品
    async fetchSelectCart(params: cartProduct[]) {
      try {
        if (params.length > 0) localStorage.setItem('cart-list', JSON.stringify(params))
        return { code: 1, message: '操作成功' }
      } catch (error) {
        console.log('fetchSelectCart', error)
      }
    },
  },
})
