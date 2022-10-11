import Card from '@/components/card'
import Search from '@/components/search'
import type { Product } from '@/interfaces/goods'
import { defineComponent, ref, watch } from 'vue'
import Carousel from './components/carousel'
import Nav from './components/nav'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/vue'

const Home = defineComponent({
  setup() {
    const router = useRouter()
    const searchWord = ref('')
    const onSearch = () => {
      if (!searchWord.value) {
        router.push('/goods/list')
      } else {
        router.push({ path: '/goods/list', query: { q: searchWord.value } })
      }
    }

    const page = ref(1)
    const { fetchGoodList, initGoodList } = useProductStore()
    initGoodList()
    fetchGoodList({ page: page.value })
    const { products, loading } = storeToRefs(useProductStore())

    const goodsRef = ref<HTMLDivElement | null>(null)
    const onScroll = () => {
      if (!loading.value) return
      if (!goodsRef?.value) return
      const { scrollTop, scrollHeight, clientHeight } = goodsRef.value
      if (scrollTop + clientHeight !== scrollHeight) return
      page.value += 1
    }

    watch(page, () => {
      fetchGoodList({ page: page.value })
    })

    return () => {
      return (
        <div class="mb-16 h-screen overflow-y-auto" onScroll={onScroll} ref={goodsRef}>
          {/* 搜索 */}
          <div class="bg-blue-400 py-4 px-2">
            <Search keyWord={searchWord} onSearch={() => onSearch()} />
          </div>

          {/* 轮播 */}
          <Carousel />

          {/* 快捷入口 */}
          <Nav />

          {/* 秒杀 */}
          <div class="my-2  px-2">
            <div class=" relative h-32 w-full rounded-lg">
              <img src="/active.jpg" alt="促销活动" class="w-full" />
            </div>
            <Swiper slidesPerView={2.5} spaceBetween={16} class="mySwiper bg-gray-100">
              {products.value?.slice(0, 6).map((good: Product) => (
                <SwiperSlide key={good.goodsId}>
                  <Card isVertical={true} product={good}></Card>
                </SwiperSlide>
              ))}
              <SwiperSlide class="!h-auto">
                <router-link to={'/goods/list'}>
                  <a class="flex h-full items-center justify-center bg-white py-4 px-3">查看更多</a>
                </router-link>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* 猜你喜欢 */}
          <div>
            <div
              class="my-2 flex items-center justify-center p-2"
              onScroll={onScroll}
              ref={goodsRef}
            >
              <hr class="h-1 w-20 text-black" />
              <h1 class="mx-2 text-xl text-gray-500">猜你喜欢</h1>
              <hr class="w-20 text-black" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              {products.value &&
                products.value?.map((good: Product) => (
                  <Card key={good.goodsId} isVertical={true} product={good}></Card>
                ))}
            </div>
          </div>
        </div>
      )
    }
  },
})

export default Home
