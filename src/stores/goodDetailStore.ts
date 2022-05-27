import { defineStore } from 'pinia'
import http from './http'
import { useCartStore } from './cartStore'

type Params = {
  session_key?: string
  page?: number
  id?: string | number
}

type Good = {
  goods?: any
  spec_goods?: string
  spec_tree?: any
}

type IskuSelect = {
  skuId: number
  skuName: string
  skuImg: string
  price: number
  store_count: number
  count: number
}

export type goodState = {
  goodsDetail: Good
  isModal: boolean
  skuTree: any[]
  skuSpecs: any[]
  skuSelect: IskuSelect
  sku: any[]
  toGo: number
}

export const useGoodDetailStore = defineStore({
  id: 'goodDetailStore',
  state: () =>
    ({
      goodsDetail: {},
      isModal: false,
      skuTree: [],
      skuSpecs: [],
      skuSelect: { skuId: 0, skuName: '', skuImg: '', price: 0, store_count: 0, count: 1 },
      sku: [],
      toGo: 0,
    } as goodState),
  getters: {},
  actions: {
    // 商品列表
    async fetchGoodDetail(params: Params) {
      try {
        const url = '/api/goods/goods_info'
        params['session_key'] = 'e8b91d9fd4195c6c772670750d90bd19'
        const response = await http.get(url, { params })
        // 重置值
        this.$reset()
        this.goodsDetail = response.data
        this.skuTree = response.data.spec_tree
        this.skuSelect = { ...this.skuSelect, count: 1 }
        this.skuSpecs = response.data.spec_goods ? JSON.parse(response.data.spec_goods) : []
        if (this.skuSpecs.length == 0) {
          this.skuSelect = {
            ...this.skuSelect,
            price: response.data.goods.shop_price,
            store_count: response.data.goods.store_count,
          }
        }
        // 规格默认选择第一个
        if (this.sku.length == 0 && this.skuSpecs.length > 0) {
          this.skuSpecs.some((item) => {
            if (item.store_count > 0) {
              this.sku = item.specs
              this.skuSelect = {
                ...this.skuSelect,
                price: item.price,
                store_count: item.store_count,
                skuName: item.key_name,
                skuId: item.item_id,
              }
              this.skuIsAble()
              return true
            }
          })
        }
        return response.data
      } catch (error) {
        console.log('fetchGoodDetail', error)
      }
    },
    // sku遮罩层
    toggleModal(isOpen: boolean) {
      this.isModal = isOpen
    },
    // 地址跳转
    handleGo(val: number) {
      this.toGo = val
    },
    // 商品规格是否可选
    skuIsAble() {
      if (this.skuTree.length == 0) return
      const newTree = JSON.parse(JSON.stringify(this.skuTree))
      newTree.map((item: any) => {
        item.value.map((item2: any) => {
          item2.able = this.isAble(item.id, item2.item_id)
        })
      })
      this.skuTree = newTree
      this.isCheckAll()
    },

    isAble(key: string, value: number) {
      const copySku = JSON.parse(JSON.stringify(this.sku))
      copySku[key] = value
      const seletSku = Object.values(copySku)
      const flag = this.skuSpecs.some((item) => {
        if (item.store_count <= 0) return false
        const specs = Object.values(item.specs)
        const someSpecs = specs.filter((item2) => {
          return seletSku.includes(item2) === true
        })
        return someSpecs.length === seletSku.length ? true : false
      })
      return flag
    },

    // 判断规格是否选择完毕
    isCheckAll() {
      const countTree = this.skuTree.length
      const skuValue = Object.values(JSON.parse(JSON.stringify(this.sku)))
      const countSku = skuValue.length
      if (countTree != countSku) {
        this.skuSelect = { ...this.skuSelect, skuName: '', skuId: 0 }
        return false
      }
      this.skuSpecs.some((item: any) => {
        const specs = Object.values(JSON.parse(JSON.stringify(item.specs)))
        const res = specs.every((item2: any) => skuValue.includes(item2))
        if (res) {
          let newSelectSku: any = {
            price: item.price,
            store_count: item.store_count,
            skuName: item.key_name,
            skuId: item.item_id,
          }
          if (this.skuSelect.count > item.store_count)
            newSelectSku = { ...newSelectSku, count: item.store_count }
          this.skuSelect = {
            ...this.skuSelect,
            ...newSelectSku,
          }
          return true
        }
      })
      return true
    },

    // 单选
    isCheckSingle(cid: number, did: number) {
      const newSku = JSON.parse(JSON.stringify(this.sku))
      const skuKey = Object.keys(newSku)
      if (skuKey.length > 0) {
        if (skuKey.includes(cid.toString())) {
          const skuValue = newSku[cid]
          skuValue === did ? delete newSku[cid] : (newSku[cid] = did)
        } else {
          newSku[cid] = did
        }
      } else {
        newSku[cid] = did
      }
      this.sku = newSku
      this.skuIsAble()
      return true
    },
    // 添加到购物车
    addCart() {
      const countTree = this.skuTree.length
      const skuValue = Object.values(JSON.parse(JSON.stringify(this.sku)))
      const countSku = skuValue.length
      if (countTree != countSku) {
        console.log('请选择商品规格')
        return
      }
      if (this.skuSelect.count <= 0) {
        console.log('请选择商品数量')
        return
      }
      if (this.skuSelect.count > this.skuSelect.store_count) {
        console.log('超出库存')
        return
      }

      const res = this.isCheckAll()
      if (!res) {
        console.log('请选择商品规格')
        return
      }
      console.log('购物车', this.skuSelect)
      const { fetchAddCart } = useCartStore()
      fetchAddCart({
        goods_id: this.goodsDetail.goods.goods_id,
        goods_num: this.skuSelect.count,
        item_id: this.skuSelect.skuId,
      }).then((res) => {
        console.log('添加购物车', res)
        return res
      })
    },
    // 去购买
    toBuy() {
      const res = this.isCheckAll()
      if (!res) {
        console.log('请选择商品规格')
        return
      }
      console.log('去购买', this.skuSelect)
    },
  },
})
