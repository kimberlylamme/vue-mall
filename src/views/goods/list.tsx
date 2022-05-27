import { ViewGrid, ViewList } from '../../components/svg'
import type { Cards } from '../../interfaces/goods'
import Card from '../../components/card'
import Search from '../../components/search'
import Toolbal from './components/toolbar'

import { defineComponent, ref, watch } from 'vue'
import { useGoodStore } from '../../stores/goodStore'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const Lists = defineComponent({
  setup() {
    const route = useRoute()
    let params = {}
    // 搜索
    const searchWord = ref('')
    if (route.query.q) {
      searchWord.value = route.query.q as string
      params = { ...params, q: searchWord.value }
    }
    // 分类ID
    const cid = ref('')
    if (route.query.cid) {
      cid.value = route.query.cid as string
      params = { ...params, id: cid.value }
    }

    // 加载数据
    const page = ref(1)
    const { fetchGoodList, setGoodList } = useGoodStore()
    params = { ...params, page: page.value }
    fetchGoodList(params)
    const { goodsList, goodsListLoading } = storeToRefs(useGoodStore())
    const containRef = ref<HTMLDivElement | null>(null)
    const onScroll = () => {
      if (!goodsListLoading) return
      if (!containRef.value) return
      const { scrollTop, scrollHeight, clientHeight } = containRef.value
      if (scrollTop + clientHeight !== scrollHeight) return
      page.value += 1
    }

    // 刷选
    const sale = ref(false)
    const price = ref('')

    watch([page, searchWord, sale, price], () => {
      console.log('watch')
      let map = {}
      let sort: any = []
      let _sort = ''
      map = { ...map, page: page.value }
      if (searchWord.value) map = { ...map, q: searchWord.value }
      if (cid.value) map = { ...map, id: cid.value }
      if (sale.value) sort = [...sort, ['sales_sum desc']]
      if (price.value) sort = [...sort, [`shop_price ${price.value}`]]
      if (sort.length) {
        _sort = sort.join(',')
        map = { ...map, total_sort: _sort }
      }
      fetchGoodList(map)
    })

    const isVertical = ref(false)

    return () => {
      return (
        <div class="h-screen overflow-y-auto" onScroll={onScroll} ref={containRef}>
          <div class=" bg-blue-400 py-4 px-2">
            <Search
              word={searchWord}
              onSearch={(q: string) => {
                ;(page.value = 1), setGoodList()
              }}
            />
          </div>
          <div class="rounded-t-lg bg-white">
            <Toolbal
              sale={sale}
              onSale={(s: any) => {
                page.value = 1
                setGoodList()
              }}
              price={price}
              onPrice={(p: any) => {
                page.value = 1
                setGoodList()
              }}
            />
          </div>

          <div class={`grid gap-4 ${isVertical.value ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {goodsList.value &&
              goodsList.value.map((card: Cards) => (
                <Card key={card.goods_id} isVertical={isVertical.value} {...card}></Card>
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

// const Lists = () => {
//   const dispatch = useAppDispatch()
//   const [isVertical, setIsVertical] = useState(false)
//   const containRef = useRef<HTMLDivElement>(null)

//   const router = useRouter()
//   const q = router.query.q ? router.query.q : ''
//   const cid = router.query.cid ? router.query.cid : ''
//   const [word, setWord] = useState(q)
//   const [sale, setSale] = useState(false)
//   const [price, setPrice] = useState('')
//   const [page, setPage] = useState(1)

//   let params = {}
//   let sort: any = []
//   let _sort = ''
//   params = { ...params, page: page }
//   if (word) params = { ...params, q: word }
//   if (cid) params = { ...params, id: cid }
//   if (sale) sort = [...sort, ['sales_sum desc']]
//   if (price) sort = [...sort, [`shop_price ${price}`]]
//   if (sort.length) {
//     _sort = sort.join(',')
//     params = { ...params, total_sort: _sort }
//   }

//   const isload = useAppSelector((state) => state.goods.goodsListLoading)
//   const goods: Cards[] = useAppSelector(goodsList)

//   useEffect(() => {
//     if (isload) {
//       dispatch(fetchGoodList(params))
//     }
//   }, [word, sale, price, page])

//   const onScroll = () => {
//     if (isload === false) return
//     if (!containRef.current) return
//     const { scrollTop, scrollHeight, clientHeight } = containRef.current
//     if (scrollTop + clientHeight !== scrollHeight) return
//     setPage((page) => page + 1)
//   }

//   return (
//     <div class="h-screen overflow-y-auto" onScroll={onScroll} ref={containRef}>
//       <div class=" bg-blue-400 py-4 px-2">
//         <Search
//           keyWord={word}
//           onSearch={(q: SetStateAction<string | string[]>) => {
//             setWord(q), setPage(1), dispatch(isLoad())
//           }}
//         />
//       </div>
//       <div class="rounded-t-lg bg-white">
//         <Toolbal
//           onSale={(ckeckSale) => {
//             setSale(ckeckSale), setPage(1), dispatch(isLoad())
//           }}
//           onPrice={(checkPrie) => {
//             setPrice(checkPrie), setPage(1), dispatch(isLoad())
//           }}
//         />
//       </div>

//       <div class={`grid gap-4 ${isVertical ? 'grid-cols-2' : 'grid-cols-1'}`}>
//         {goods &&
//           goods.map((card) => <Card key={card.goods_id} isVertical={isVertical} {...card}></Card>)}

//         <div class=" fixed bottom-10 right-5 space-y-4">
//           <div
//             class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 bg-white p-1 text-gray-400"
//             onClick={() => setIsVertical(!isVertical)}
//           >
//             {isVertical ? <ViewList /> : <ViewGrid />}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

export default Lists
