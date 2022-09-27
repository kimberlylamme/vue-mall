import { ViewGrid, ViewList } from '../../components/svg'
import type { Product } from '../../interfaces/goods'
import Card from '../../components/card'
import Search from '../../components/search'
import Toolbal from './components/toolbar'
import { defineComponent, reactive, ref } from 'vue'
import { useProductStore } from '../../stores/productStore'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const Lists = defineComponent({
  setup() {
    const route = useRoute()
    const q = route.query.q ? (route.query.q as string) : ''
    const params = reactive({
      page: 1,
      sales: '',
      price: '',
      keyWord: q,
    })
    const isVertical = ref(false)
    const keyWord = ref(q)
    const sales = ref(false)
    const price = ref('')

    // 加载数据
    const { fetchGoodList, initGoodList } = useProductStore()
    initGoodList()
    fetchGoodList(params)
    const { products, loading } = storeToRefs(useProductStore())
    const containRef = ref<HTMLDivElement | null>(null)
    const onScroll = () => {
      if (!loading.value) return
      if (!containRef.value) return
      const { scrollTop, scrollHeight, clientHeight } = containRef.value
      if (scrollTop + clientHeight !== scrollHeight) return
      params.page = params.page + 1
      fetchGoodList(params)
    }

    return () => {
      return (
        <div class="h-screen overflow-y-auto" onScroll={onScroll} ref={containRef}>
          <div class=" bg-blue-400 py-4 px-2">
            <Search
              keyWord={keyWord}
              onSearch={() => {
                params.page = 1
                params.keyWord = keyWord.value
                initGoodList()
                fetchGoodList(params)
              }}
            />
          </div>
          <div class="mb-4 rounded-t-lg bg-white">
            <Toolbal
              sale={sales}
              onSale={() => {
                params.page = 1
                params.sales = sales.value ? 'down' : ''
                params.price = ''
                initGoodList()
                fetchGoodList(params)
              }}
              price={price}
              onPrice={() => {
                params.page = 1
                params.price = price.value
                params.sales = ''
                initGoodList()
                fetchGoodList(params)
              }}
            />
          </div>

          <div class={`grid gap-4 ${isVertical.value ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {products.value &&
              products.value.map((card: Product) => (
                <Card key={card.goodsId} isVertical={isVertical.value} product={card}></Card>
              ))}

            <div class=" fixed bottom-10 right-5 space-y-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 bg-white p-1 text-gray-400"
                onClick={() => (isVertical.value = !isVertical.value)}
              >
                {isVertical.value ? <ViewList /> : <ViewGrid />}
              </div>
            </div>
          </div>
        </div>
      )
    }
  },
})

export default Lists
