import ActionBar from './components/actionBar'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import Sku from './components/sku'
import { defineComponent } from 'vue'
import { useGoodDetailStore } from '@/stores/goodDetailStore'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const Detail = defineComponent({
  setup() {
    // 加载数据
    const route = useRoute()
    const id = route.query.id as string
    const { fetchGoodDetail, toggleModal, handleGo } = useGoodDetailStore()
    fetchGoodDetail({ goodsId: Number(id) })
    const { productInfo, selectSku, isModal } = storeToRefs(useGoodDetailStore())

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
              <div class=" relative h-80 w-full">
                <img src={productInfo.value.image} alt="" />
              </div>
            </SwiperSlide>
            {productInfo.value.images &&
              productInfo.value.images.map((image: string) => {
                return (
                  <SwiperSlide>
                    <div class=" relative h-80 w-full">
                      <img src={image} alt="" />
                    </div>
                  </SwiperSlide>
                )
              })}
          </Swiper>

          <div class="m-2 rounded-xl bg-white p-3">
            <div class="flex items-center justify-between">
              <div class="font-bold text-red-600">
                <span>￥</span>
                <span class="text-2xl">{selectSku.value?.price}</span>
              </div>
            </div>
            <div class="mt-3 text-base font-bold line-clamp-2">{productInfo.value?.goodsName}</div>
          </div>

          <div class="m-2 mt-2 flex flex-col gap-7 rounded-xl bg-white p-3 text-sm">
            {productInfo.value?.skuTrees && productInfo.value.skuTrees.length > 0 && (
              <div>
                <div
                  class="flex items-center justify-between"
                  onClick={() => {
                    handleGo(0)
                    toggleModal(!isModal.value)
                  }}
                >
                  <div class="text-gray-500">规格</div>
                  <div>{selectSku.value.skuName ? selectSku.value.skuName : '请选择规格'}</div>
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

          <div class="mt-2 mb-16 rounded-t-xl bg-white px-2">
            {/* <div v-html={productInfo.value?.goods_content}></div> */}
          </div>

          <ActionBar />
        </div>
      )
    }
  },
})

export default Detail
