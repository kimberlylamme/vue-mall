import { useGoodDetailStore } from '@/stores/goodDetailStore'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'

const Sku = defineComponent({
  setup() {
    const { toggleModal, isCheckSingle, addCart, toBuy } = useGoodDetailStore()
    const { skuTree, skuSelect, sku, isModal, toGo } = storeToRefs(useGoodDetailStore())

    const handleSelectSku = (cid: number, did: number, able: boolean) => {
      if (!able) return
      const flag = isCheckSingle(cid, did)
    }

    return () => {
      return (
        <div class={`${isModal.value ? '' : 'hidden'} fixed top-0 left-0 z-20 h-full w-full`}>
          <div class="h-full w-full bg-black/50" onClick={() => toggleModal(!isModal.value)}></div>
          <div class="absolute bottom-0 z-30 h-2/3 w-full  overflow-y-auto rounded-t-xl bg-white ">
            <div class="w-full px-4">
              <div class="my-5 flex items-end gap-3">
                <div class="h-20 w-20 bg-blue-500"></div>
                <div>
                  <div class="text-red-600">
                    ￥<span class="text-2xl">{skuSelect.value.price}</span>
                  </div>
                  <div>{skuSelect.value.skuName ? `已选：${skuSelect.value.skuName}` : ''}</div>
                </div>
              </div>

              <div class="w-full space-y-4">
                {skuTree.value &&
                  skuTree.value.map((item: any, key: number) => {
                    return (
                      <div key={key}>
                        <div class="font-bold">{item.name}</div>
                        <div class="mt-2 flex flex-wrap gap-4">
                          {item.value.map((item2: any, kk: number) => {
                            return (
                              <span
                                key={kk}
                                class={`rounded-2xl bg-gray-300 px-2 py-1 ${
                                  item2.item_id === sku.value[item.id]
                                    ? 'border border-blue-500 text-blue-500'
                                    : ''
                                } ${item2.able ? '' : 'opacity-50'}`}
                                onClick={() => {
                                  handleSelectSku(item.id, item2.item_id, item2.able)
                                }}
                              >
                                {item2.name}
                                {item2.able}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
              </div>

              <div class="my-10 flex justify-between">
                <div class="font-bold">数量</div>
                <div class="flex items-center gap-3 text-base font-bold">
                  <div
                    class={`${skuSelect.value.count <= 1 ? 'text-gray-500' : ''}`}
                    onClick={() => {
                      skuSelect.value.count > 1 ? skuSelect.value.count-- : ''
                    }}
                  >
                    -
                  </div>
                  <input
                    class="w-8 text-center outline-none"
                    type="number"
                    value={skuSelect.value.count}
                    onChange={(e) => {
                      skuSelect.value.count = Number((e.target as HTMLInputElement).value)
                    }}
                  />

                  <div
                    onClick={() => {
                      skuSelect.value.store_count > skuSelect.value.count
                        ? skuSelect.value.count++
                        : skuSelect.value.count
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>

            {toGo.value == 0 && (
              <div class=" absolute bottom-0 mb-2 grid w-full grid-cols-2 place-items-center gap-5 px-4 text-white">
                <div
                  class="flex w-full items-center justify-center rounded-3xl bg-red-600 px-4 py-2"
                  onClick={() => {
                    addCart()
                  }}
                >
                  加入购物车
                </div>
                <div
                  class="flex w-full items-center justify-center rounded-3xl bg-yellow-400 px-4 py-2"
                  onClick={() => {
                    toBuy()
                  }}
                >
                  立即购买
                </div>
              </div>
            )}
            {toGo.value > 0 && (
              <div class=" absolute bottom-0 mb-2 w-full px-4 text-white">
                <div
                  class="flex w-full items-center justify-center rounded-3xl bg-red-600 px-4 py-2 "
                  onClick={() => {
                    toGo.value == 1 ? addCart() : toBuy()
                  }}
                >
                  确定
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }
  },
})
export default Sku
