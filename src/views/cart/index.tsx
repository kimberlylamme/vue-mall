import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'

const Index = defineComponent({
  setup() {
    const { fetchCartList, fetchUpdateCart, fetchDelCart, fetchSelectCart } = useCartStore()
    fetchCartList()
    const { cartList, totalPrice, isSelect, selectedAll } = storeToRefs(useCartStore())

    const handleRadio = (goodsId: number, skuId: number) => {
      const copyCartList = JSON.parse(JSON.stringify(cartList.value))
      console.log(copyCartList)
      copyCartList.map((item: any) => {
        if (item.goodsId === goodsId && item.skuId === skuId)
          item.selected = item.selected === 0 ? 1 : 0
      })
      fetchSelectCart(copyCartList).then((res: any) => {
        if (res.code === 1) fetchCartList()
      })
    }

    const handleSelectAll = () => {
      const copyCartList = JSON.parse(JSON.stringify(cartList.value))
      copyCartList.map((item: any) => {
        item.selected = selectedAll.value ? 0 : 1
      })
      fetchSelectCart(copyCartList).then((res: any) => {
        if (res.code === 1) fetchCartList()
      })
    }

    interface paramsUpdateCart {
      goodsId: number
      skuId: number
      num: number
      type: string
    }

    const handleUpdateCart = ({ goodsId, skuId, num, type = 'replace' }: paramsUpdateCart) => {
      const copyProducts = JSON.parse(JSON.stringify(cartList.value))
      const product: any = copyProducts.find(
        (item: any) => item.goodsId === goodsId && item.skuId === skuId,
      )

      if (!product) return
      let count = product.count
      switch (type) {
        case 'reduce':
          if (product.count === 1) return
          count = parseInt(product.count) - 1
          break
        case 'add':
          count = parseInt(product.count) + 1
          break
        default:
          count = Number(num)
      }
      product.count = count
      fetchUpdateCart(copyProducts).then((res: any) => {
        if (res.code === 1) fetchCartList()
      })
    }

    const handleDelCart = (goodsId: number, skuId: number) => {
      fetchDelCart({ goodsId, skuId }).then((res: any) => {
        console.log(res)
        if (res.code === 1) fetchCartList()
      })
    }

    return () => {
      if (cartList.value.length == 0) return <div class=" py-5 text-center">购物车空空如也</div>
      return (
        <div class=" overflow-y-auto">
          <div class="mx-2 mt-2">
            {cartList.value &&
              cartList.value.map((item: any, key: number) => (
                <div key={key} class="mb-3 flex gap-3 rounded-lg bg-white p-2 text-sm">
                  <div class="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.selected === 1}
                      class="h-5 w-5"
                      onChange={() => handleRadio(item.goodsId, item.skuId)}
                    />
                    <router-link to={`/goods/detail?id=${item.goods_id}`}>
                      <img src={item.image} alt="" width={100} height={100} />
                    </router-link>
                    <div class="flex flex-1 flex-col gap-2">
                      <div class="line-clamp-2">{item.goodsName}</div>
                      <div class="flex gap-4 text-base">
                        <span
                          onClick={() =>
                            item.count > 1
                              ? handleUpdateCart({
                                  goodsId: item.goodsId,
                                  skuId: item.skuId,
                                  num: 1,
                                  type: 'reduce',
                                })
                              : ''
                          }
                        >
                          -
                        </span>
                        <span>{item.count}</span>
                        <span
                          onClick={() =>
                            handleUpdateCart({
                              goodsId: item.goodsId,
                              skuId: item.skuId,
                              num: 1,
                              type: 'add',
                            })
                          }
                        >
                          +
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col items-center justify-around">
                    <div class="text-red-700">￥{item.price}</div>
                    <div onClick={() => handleDelCart(item.goodsId, item.skuId)}>删除</div>
                  </div>
                </div>
              ))}
          </div>
          <div class="fixed bottom-0 z-20 flex w-full justify-between bg-white text-gray-600">
            <div class="flex w-full flex-1 items-center justify-between gap-6 px-4 text-lg">
              <div class="flex  items-center gap-2">
                <input
                  type={'checkbox'}
                  class="h-6 w-6"
                  checked={selectedAll.value}
                  onChange={() => handleSelectAll()}
                />
                全选
              </div>
              <div class="flex flex-1 items-center justify-between">
                <div class=" text-sm">总计：</div>
                <div class="text-red-600">{totalPrice.value}</div>
              </div>
            </div>
            <div
              class={`mr-1 mb-1  px-10 py-5 text-xl text-white ${
                isSelect.value ? 'bg-red-600' : 'bg-gray-500'
              }`}
            >
              去结算
            </div>
          </div>
        </div>
      )
    }
  },
})

export default Index
