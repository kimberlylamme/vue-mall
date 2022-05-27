import type { Cards } from '@/interfaces/goods'
import { defineStore } from 'pinia'
import http from './http'

type Params = {
  session_key?: string
  page?: number
}

export type homeState = {
  adList: string[]
  goodLike: Array<Cards>
  goodLikeLoading: boolean
}

export const useHomeStore = defineStore({
  id: 'homeStore',
  state: () =>
    ({
      adList: [],
      goodLike: [],
      goodLikeLoading: true,
    } as homeState),
  getters: {},
  actions: {
    // 轮播图
    async fetchAd(params: Params) {
      try {
        const url = '/api/index/adList'
        params['session_key'] = 'e8b91d9fd4195c6c772670750d90bd19'
        const response = await http.get(url, { params })
        this.adList = response?.data
        return response?.data
      } catch (error) {
        console.log('fetchAd', error)
      }
    },

    // 猜你喜欢
    async fetchGoodLike(params: Params) {
      try {
        const url = '/api/index/home'
        params['session_key'] = 'e8b91d9fd4195c6c772670750d90bd19'
        const response = await http.post(url, params)
        response.data.goods.length < 10 && (this.goodLikeLoading = false)
        this.goodLike = [...this.goodLike, ...response.data.goods]
      } catch (error) {
        console.log('fetchGoodLike', error)
      }
    },
  },
})
