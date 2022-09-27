import { defineComponent } from 'vue'
import { useGoodDetailStore } from '@/stores/goodDetailStore'

const ActionBar = defineComponent({
  setup() {
    const { toggleModal, handleGo } = useGoodDetailStore()
    return () => {
      return (
        <div class="fixed bottom-0 z-10 flex h-16 w-full flex-row justify-between bg-white p-2 text-sm">
          <div class="flex justify-around gap-6">
            <router-link to={'/'}>
              <div class="flex flex-col items-center gap-1">
                <div class="h-5 w-5 bg-blue-500"></div>
                <div>首页</div>
              </div>
            </router-link>
            <router-link to={'/cart'}>
              <div class="flex flex-col items-center gap-1">
                <div class="h-5 w-5 bg-blue-500"></div>
                <div>购物车</div>
              </div>
            </router-link>
          </div>
          <div class="grid grid-cols-2 place-items-center gap-3 text-white">
            <div
              class=" flex w-full items-center justify-center rounded-3xl bg-red-600 px-3 py-2"
              onClick={() => {
                handleGo(1)
                toggleModal(true)
              }}
            >
              加入购物车
            </div>
            <div
              class=" flex w-full items-center justify-center rounded-3xl bg-yellow-400 px-3 py-2"
              onClick={() => {
                handleGo(2)
                toggleModal(true)
              }}
            >
              立即购买
            </div>
          </div>
        </div>
      )
    }
  },
})

export default ActionBar
