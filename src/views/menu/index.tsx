import Search from '@/components/search'
import type { Category } from '@/interfaces/cayegory'
import { useGoodStore } from '@/stores/goodStore'
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

const Index = defineComponent({
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

    const searchRef = ref<HTMLDivElement | null>(null)
    const searchHeight = ref(searchRef?.value || 0)

    const { fetchCategory, handleCategory } = useGoodStore()
    fetchCategory({})
    const { categoryList, current, childrens } = storeToRefs(useGoodStore())
    return () => {
      return (
        <div>
          <div class=" bg-blue-400 py-4 px-2" ref={searchRef}>
            <Search word={searchWord} onSearch={() => onSearch()} />
          </div>
          <div class="flex gap-5">
            <div
              class="w-22 overflow-y-auto bg-white"
              style={{ height: `calc(100vh - 64px - ${searchHeight.value}px)` }}
            >
              {categoryList.value &&
                categoryList.value.map((category: Category, key: number) => {
                  return (
                    <div
                      class={`border-b  border-l-4 border-b-gray-200 py-3 px-5 text-center ${
                        current.value === category.id
                          ? 'border-l-blue-500 text-blue-500'
                          : 'border-l-white'
                      }`}
                      key={key}
                      onClick={() => {
                        handleCategory(category.id)
                      }}
                    >
                      {category.mobile_name}
                    </div>
                  )
                })}
            </div>
            <div
              class="w-full flex-1 overflow-y-auto  pr-2"
              style={{ height: `calc(100vh - 64px - ${searchHeight.value}px)` }}
            >
              {childrens.value &&
                childrens.value.map((children: Category, key: number) => {
                  return (
                    <div key={key}>
                      {children.sub_menu && children.sub_menu.length > 0 && (
                        <>
                          <div class="my-5 flex items-center justify-between">
                            <div>{children.mobile_name}</div>
                            <router-link to={`/goods/list?cid=${children.id}`}>
                              <a class="text-gray-700">更多 &gt;</a>
                            </router-link>
                          </div>
                          <div class="grid grid-cols-3 gap-5">
                            {children.sub_menu.map((child: Category, kk: number) => {
                              return (
                                <router-link key={kk} to={`/goods/list?cid=${child.id}`}>
                                  <div class="flex flex-col items-center gap-2">
                                    <div class="h-14 w-14 bg-blue-500"></div>
                                    <div class="text-sm text-gray-700">{child.mobile_name}</div>
                                  </div>
                                </router-link>
                              )
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      )
    }
  },
})

export default Index
