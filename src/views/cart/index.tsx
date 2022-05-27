import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import goodImage from '../../assets/goods.jpg'

const Index = defineComponent({
  setup() {
    const { fetchCartList, fetchUpdateCart, fetchRemoveCart, fetchSelectCart, fetchAllCart } =
      useCartStore()
    fetchCartList({})
    const { cartList, totalPrice, isSelect, selectedAll } = storeToRefs(useCartStore())

    const handlerCheck = (id: number) => {
      fetchSelectCart(id).then((res: any) => {
        if (res.status === 1) fetchCartList({})
      })
    }

    const handlerCheckAll = () => {
      fetchAllCart().then((res: any) => {
        if (res.status === 1) fetchCartList({})
      })
    }

    const handleUpdateNum = ({ id, num, type = 0 }: { id: number; num: number; type: number }) => {
      fetchUpdateCart(id, num, type).then((res: any) => {
        if (res.status === 1) fetchCartList({})
      })
    }

    const handleRemove = (id: number) => {
      fetchRemoveCart({ cart_ids: [id] }).then((res: any) => {
        console.log(res)
        if (res.status === 1) fetchCartList({})
      })
    }

    return () => {
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
                      onChange={() => handlerCheck(item.id)}
                    />
                    <img src={goodImage} alt="" width={100} height={100} />
                    <div class="flex flex-1 flex-col gap-2">
                      <div class="line-clamp-2">{item.goods_name}</div>
                      <div class="flex gap-4 text-base">
                        <span
                          onClick={() =>
                            item.goods_num > 1
                              ? handleUpdateNum({ id: item.id, num: 1, type: -1 })
                              : ''
                          }
                        >
                          -
                        </span>
                        <span>{item.goods_num}</span>
                        <span onClick={() => handleUpdateNum({ id: item.id, num: 1, type: 1 })}>
                          +
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col items-center justify-around">
                    <div class="text-red-700">￥{item.goods_price}</div>
                    <div onClick={() => handleRemove(item.id)}>删除</div>
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
                  onChange={() => handlerCheckAll()}
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
