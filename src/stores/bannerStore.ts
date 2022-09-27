import { defineStore } from 'pinia'
import banners from '../data/banner.json'
import type { Banner } from '@/interfaces/banner'

interface homeState {
  adList: Banner[]
}

export const useBannerStore = defineStore({
  id: 'bannerStore',
  state: () =>
    ({
      adList: [],
    } as homeState),
  getters: {},
  actions: {
    // 轮播图
    async fetchAd() {
      try {
        this.adList = banners
      } catch (error) {
        console.log('fetchAd', error)
      }
    },
  },
})
