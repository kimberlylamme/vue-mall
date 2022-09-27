import { defineStore } from 'pinia'
import { useCartStore } from './cartStore'
import type { Product, SelectSku, Sku, SkuTree } from '@/interfaces/goods'
import products from '../data/products.json'

interface goodState {
  productInfo: Product
  isModal: boolean
  skuTrees: SkuTree[]
  skus: Sku[]
  selectSku: SelectSku
  matchSku: any
  toGo: number
}

export const useGoodDetailStore = defineStore({
  id: 'goodDetailStore',
  state: () =>
    ({
      productInfo: {
        goodsId: 0,
        goodsName: '',
        price: 0,
        marketPrice: 0,
        image: '',
        images: [],
        sales: 0,
        stock: 0,
        skuTrees: [],
        skus: [],
      },
      isModal: false,
      skuTrees: [],
      skus: [],
      selectSku: { skuId: 0, skuName: '', image: '', price: 0, stock: 0, count: 1 },
      matchSku: {},
      toGo: 0,
    } as goodState),
  getters: {},
  actions: {
    // 商品列表
    async fetchGoodDetail(params: { goodsId: number }) {
      try {
        const productInfo = products.find((product) => product.goodsId === params.goodsId)
        if (!productInfo) return
        // 重置值
        this.$reset()
        this.skuTrees = productInfo.skuTrees
        this.skus = productInfo.skus
        if (this.skus.length == 0) {
          this.selectSku = {
            image: productInfo.image,
            price: productInfo.price,
            stock: productInfo.stock,
            count: 1,
            skuName: '',
            skuId: 0,
          }
        }
        // 规格默认选择第一个
        const matchSkuKey = Object.keys(JSON.parse(JSON.stringify(this.matchSku)))
        if (matchSkuKey.length == 0 && this.skus.length > 0) {
          const skuInfo = this.skus.find((item) => item.stock > 0)
          if (!skuInfo) return
          this.matchSku = skuInfo.key
          this.selectSku = {
            price: skuInfo.price,
            stock: skuInfo.stock,
            skuName: skuInfo.name,
            skuId: skuInfo.skuId,
            image: skuInfo.image,
            count: 1,
          }
          this.skuIsAble()
        }
        this.productInfo = productInfo
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
      if (this.skuTrees.length == 0) return
      const copySkuTrees = JSON.parse(JSON.stringify(this.skuTrees))
      copySkuTrees.map((skuTree: SkuTree) => {
        skuTree.childs.map((child: any) => {
          child.able = this.isAble(skuTree.id, child.itemId)
        })
      })
      this.skuTrees = copySkuTrees
      this.checkStock()
    },

    isAble(key: number, value: number) {
      const copyMatchSku = JSON.parse(JSON.stringify(this.matchSku))
      copyMatchSku[key] = value
      const matchSkuValues = Object.values(copyMatchSku)
      const flag = this.skus.some((sku: Sku) => {
        if (sku.stock <= 0) return false
        const skuChildValues = Object.values(sku.key)
        const someSpecs = skuChildValues.filter(
          (spec: any) => matchSkuValues.includes(spec) === true,
        )
        return someSpecs.length === matchSkuValues.length ? true : false
      })
      return flag
    },

    // 判断规格是否选择完毕
    checkStock() {
      const countTree = this.skuTrees.length
      const skuValue = Object.values(JSON.parse(JSON.stringify(this.matchSku)))
      const countSku = skuValue.length
      if (countTree != countSku) {
        this.selectSku = { ...this.selectSku, skuName: '', skuId: 0 }
        return false
      }
      this.skus.some((sku: Sku) => {
        const specs = Object.values(JSON.parse(JSON.stringify(sku.key)))
        const res = specs.every((skuChild: any) => skuValue.includes(skuChild))
        if (res) {
          let newSelectSku: any = {
            price: sku.price,
            stock: sku.stock,
            skuName: sku.name,
            skuId: sku.skuId,
            image: sku.image,
          }
          if (this.selectSku.count > sku.stock) newSelectSku = { ...newSelectSku, count: sku.stock }
          this.selectSku = {
            ...this.selectSku,
            ...newSelectSku,
          }
          return true
        }
      })
      return true
    },

    // 单选
    chooseSku(id: number, itemId: number) {
      const copyMatchSku = JSON.parse(JSON.stringify(this.matchSku))
      const skuKey = Object.keys(copyMatchSku)
      if (skuKey.length === 0) {
        copyMatchSku[id] = itemId
        this.matchSku = copyMatchSku
        return
      }
      if (skuKey.includes(id.toString()) === false) {
        copyMatchSku[id] = itemId
        this.matchSku = copyMatchSku
        return
      }
      copyMatchSku[id] === itemId ? delete copyMatchSku[id] : (copyMatchSku[id] = itemId)
      this.matchSku = copyMatchSku
      this.skuIsAble()
      return true
    },
    // 添加到购物车
    addCart() {
      console.log('加入购物车')
      const countTree = this.skuTrees.length
      const skuValue = Object.values(JSON.parse(JSON.stringify(this.matchSku)))
      const countSku = skuValue.length
      if (countTree != countSku) {
        console.log('请选择商品规格')
        return
      }
      if (this.selectSku.count <= 0) {
        console.log('请选择商品数量')
        return
      }
      if (this.selectSku.count > this.selectSku.stock) {
        console.log('超出库存')
        return
      }

      const res = this.checkStock()
      if (!res) {
        console.log('请选择商品规格')
        return
      }
      console.log('购物车', this.selectSku)
      const { fetchAddCart } = useCartStore()
      fetchAddCart({
        goodsId: this.productInfo.goodsId,
        count: this.selectSku.count,
        skuId: this.selectSku.skuId,
      }).then((res) => {
        console.log('添加购物车', res)
        return res
      })
    },
    // 去购买
    toBuy() {
      const res = this.checkStock()
      if (!res) {
        console.log('请选择商品规格')
        return
      }
      console.log('去购买', this.selectSku)
    },
  },
})
