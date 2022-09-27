import { defineComponent } from 'vue'

const Index = defineComponent({
  setup() {
    return () => {
      return (
        <div class="text-sm">
          <header class="flex justify-between bg-blue-500 px-3 pt-5 pb-20 text-white">
            <div class="flex items-center gap-4">
              <div class=" h-16 w-16 rounded-full bg-white"></div>
              <div class=" space-y-1">
                <div class=" text-lg">马沙咕</div>
                <div class=" text-gray-200">ID：1021225</div>
              </div>
            </div>
            <div class=" text-base">设置</div>
          </header>
          <div class="relative -top-8">
            <section class="mx-3 flex justify-between rounded-xl bg-white py-3 px-5">
              <div class="flex flex-col items-center gap-1">
                <div>余额</div>
                <div class=" text-gray-700">0.00</div>
              </div>
              <div class="flex flex-col items-center gap-1">
                <div>积分</div>
                <div class=" text-gray-700">0</div>
              </div>
              <div class="flex flex-col items-center gap-1">
                <div>优惠券</div>
                <div class=" text-gray-700">0</div>
              </div>
            </section>
            <section class="m-3 space-y-5 rounded-xl bg-white py-3 px-5">
              <div class="flex justify-between border-b border-gray-100 pb-3 ">
                <div>我的订单</div>
                <div class="text-gray-500">全部订单 &gt;</div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex flex-col items-center gap-2">
                  <div class="h-8 w-8 rounded-full bg-blue-500"></div>
                  <div class=" text-gray-700">待付款</div>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <div class="h-8 w-8 rounded-full bg-blue-500"></div>
                  <div class=" text-gray-700">代发货</div>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <div class="h-8 w-8 rounded-full bg-blue-500"></div>
                  <div class=" text-gray-700">待收货</div>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <div class="h-8 w-8 rounded-full bg-blue-500"></div>
                  <div class=" text-gray-700">待评价</div>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <div class="h-8 w-8 rounded-full bg-blue-500"></div>
                  <div class=" text-gray-700">售后</div>
                </div>
              </div>
            </section>

            <section class="m-3 space-y-5 rounded-xl bg-white py-3 px-5">
              <div class="grid grid-cols-4 items-center justify-between gap-3">
                <div class="flex flex-col items-center gap-3 p-2">
                  <div class="h-10 w-10 bg-blue-500"></div>
                  <div class=" text-gray-700">分销中心</div>
                </div>
                <div class="flex flex-col items-center gap-3 p-2">
                  <div class="h-10 w-10 bg-blue-500"></div>
                  <div class=" text-gray-700">会员等级</div>
                </div>
                <div class="flex flex-col items-center gap-3 p-2">
                  <div class="h-10 w-10 bg-blue-500"></div>
                  <div class=" text-gray-700">我的收藏</div>
                </div>
                <div class="flex flex-col items-center gap-3 p-2">
                  <div class="h-10 w-10 bg-blue-500"></div>
                  <div class=" text-gray-700">积分商城</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )
    }
  },
})

export default Index
