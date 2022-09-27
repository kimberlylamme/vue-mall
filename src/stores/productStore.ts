import type { ParamProducts, Product } from '@/interfaces/goods'
import { defineStore } from 'pinia'
import products from '../data/products.json'

export type goodState = {
  products: Product[]
  loading: boolean
}

export const useProductStore = defineStore({
  id: 'productStore',
  state: () =>
    ({
      products: [],
      loading: true,
    } as goodState),
  getters: {},
  actions: {
    // 商品列表
    async fetchGoodList(params: ParamProducts) {
      console.log('product', params)
      try {
        const page = params.page
        let copyProducts: Product[] = JSON.parse(JSON.stringify(products))
        if (params.keyWord && params.keyWord.length > 0) {
          const keyWord = params.keyWord.toLowerCase()
          copyProducts = copyProducts?.filter((product) => product.goodsName.includes(keyWord))
        }
        if (params.price || params.sales) {
          copyProducts = copyProducts?.sort((a: any, b: any) => {
            if (params.price) return params.price === 'up' ? a.price - b.price : b.price - a.price
            return params.sales === 'up' ? a.sales - b.sales : b.sales - a.sales
          })
        }
        copyProducts = copyProducts?.slice(page * 10 - 10, page * 10)
        this.products = [...this.products, ...copyProducts]
        copyProducts.length < 10 && (this.loading = false)
      } catch (error) {
        console.log('fetchGoodList', error)
      }
    },
    // 清空商品列表
    initGoodList() {
      this.products = []
      this.loading = true
    },
  },
})
