import type { Category } from '@/interfaces/cayegory'
import type { Cards } from '@/interfaces/goods'
import { defineStore } from 'pinia'
import http from './http'

type Params = {
  session_key?: string
  page?: number
  id?: string | number
}

export type goodState = {
  categoryList: Category[]
  current: number
  childrens: Category[]
  goodsList: Cards[]
  goodsListLoading: boolean
}

export const useGoodStore = defineStore({
  id: 'goodStore',
  state: () =>
    ({
      categoryList: [],
      current: 0,
      childrens: [],
      goodsList: [],
      goodsListLoading: true,
    } as goodState),
  getters: {},
  actions: {
    // 商品分类
    async fetchCategory(params: Params) {
      try {
        const url = '/api/goods/category_list'
        params['session_key'] = 'e8b91d9fd4195c6c772670750d90bd19'
        const response = await http.post(url, params)
        this.categoryList = response?.data
        if (this.current == 0 && this.categoryList.length > 0) {
          this.current = this.categoryList[0].id
          this.childrens = this.categoryList[0].tmenu as Category[]
        }
        return response.data
      } catch (error) {
        console.log('fetchCategory', error)
      }
    },
    handleCategory(id: number) {
      const category = this.categoryList.find((item: Category) => item.id === id)
      if (category) {
        this.current = category.id
        this.childrens = category.tmenu as Category[]
      }
    },
    // 商品列表
    async fetchGoodList(params: Params) {
      try {
        const url = '/api/goods/goods_list'
        params['session_key'] = 'e8b91d9fd4195c6c772670750d90bd19'
        const response = await http.post(url, params)
        response.data.goods_list.length < 10 && (this.goodsListLoading = false)
        this.goodsList = [...this.goodsList, ...response.data.goods_list]
        return response.data
      } catch (error) {
        console.log('fetchGoodList', error)
      }
    },
    // 清空商品列表
    setGoodList() {
      this.goodsList = []
      this.goodsListLoading = true
    },
  },
})
