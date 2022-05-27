import ActionBar from './components/actionBar'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import Sku from './components/sku'
import { defineComponent, reactive, type ToRefs, ref, toRefs } from 'vue'
import { useGoodDetailStore } from '@/stores/goodDetailStore'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

type IskuSelect = {
  skuId: number
  skuName: string
  skuImg: string
  price: number
  store_count: number
  count: number
}

type Good = {
  goods?: any
  spec_goods?: string
  spec_tree?: any
}

const Detail = defineComponent({
  setup() {
    // 加载数据
    const route = useRoute()
    const id = route.query.id as string
    const { fetchGoodDetail, toggleModal, handleGo } = useGoodDetailStore()
    fetchGoodDetail({ id: id })
    const { goodsDetail, skuSelect, isModal } = storeToRefs(useGoodDetailStore())

    return () => {
      return (
        <div>
          <Swiper
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <div class=" relative h-80 w-full bg-blue-500">
                {/* <Image src="/goods.jpg" alt="" layout="fill" /> */}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class=" relative h-80 w-full bg-green-500">
                {/* <Image src="/goods.jpg" alt="" layout="fill" /> */}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class=" relative h-80 w-full bg-cyan-500">
                {/* <Image src="/goods.jpg" alt="" layout="fill" /> */}
              </div>
            </SwiperSlide>
          </Swiper>

          <div class="m-2 rounded-xl bg-white p-3">
            <div class="flex items-center justify-between">
              <div class="font-bold text-red-600">
                <span>￥</span>
                <span class="text-2xl">{skuSelect.value?.price}</span>
              </div>
              {/* <div class="flex flex-col items-center gap-1">
            <div class="h-5 w-5 bg-blue-500"></div>
            <div class="text-sm">收藏</div>
          </div> */}
            </div>
            <div class="mt-3 text-base font-bold line-clamp-2">
              {goodsDetail.value?.goods?.goods_name}
            </div>
          </div>

          <div class="m-2 mt-2 flex flex-col gap-7 rounded-xl bg-white p-3 text-sm">
            {goodsDetail.value?.spec_tree && goodsDetail.value.spec_tree.length > 0 && (
              <div>
                <div
                  class="flex items-center justify-between"
                  onClick={() => {
                    handleGo(0)
                    toggleModal(!isModal.value)
                  }}
                >
                  <div class="text-gray-500">规格</div>
                  <div>{skuSelect.value.skuName ? skuSelect.value.skuName : '请选择规格'}</div>
                  <div class="text-gray-500">&gt;</div>
                </div>
              </div>
            )}
            <div class="flex items-center justify-between">
              <div class="text-gray-500">参数</div>
              <div>生产日期 品牌...</div>
              <div class="text-gray-500">&gt;</div>
            </div>
          </div>

          <Sku />

          <div class="mt-2 mb-16 rounded-t-xl bg-white">
            <div v-html={goodsDetail.value?.goods?.goods_content}></div>
          </div>

          <ActionBar />
        </div>
      )
    }
  },
})

export default Detail
