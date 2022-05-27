import Card from '@/components/card'
import Search from '@/components/search'
import type { Cards } from '@/interfaces/goods'
import { defineComponent, ref, watch } from 'vue'
import Carousel from './components/carousel'
import GoodsColumn from './components/goodsColumn'
import Nav from './components/nav'
import { useRouter } from 'vue-router'
import { useHomeStore } from '@/stores/homeStore'
import { storeToRefs } from 'pinia'
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
    const { fetchGoodLike } = useHomeStore()
    fetchGoodLike({ page: page.value })
    const { goodLike, goodLikeLoading } = storeToRefs(useHomeStore())

    const goodsRef = ref<HTMLDivElement | null>(null)
    const onScroll = () => {
      if (goodLikeLoading.value === false) return
      if (!goodsRef?.value) return
      const { scrollTop, scrollHeight, clientHeight } = goodsRef.value
      if (scrollTop + clientHeight !== scrollHeight) return
      page.value += 1
    }

    watch(page, () => {
      console.log('page', page.value)
      fetchGoodLike({ page: page.value })
    })

    return () => {
      return (
        <div class="mb-16 h-screen overflow-y-auto" onScroll={onScroll} ref={goodsRef}>
          {/* 搜索 */}
          <div class="bg-blue-400 py-4 px-2">
            <Search word={searchWord} onSearch={() => onSearch()} />
          </div>

          {/* 轮播 */}
          <Carousel />

          {/* 快捷入口 */}
          <Nav />

          {/* 秒杀 */}
          <GoodsColumn />

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
              {goodLike.value &&
                goodLike.value?.map((good: Cards) => (
                  <Card key={good.goods_id} isVertical={true} {...good}></Card>
                ))}
            </div>
          </div>
        </div>
      )
    }
  },
})

export default Home
