import type { Ref } from 'vue'
import { ChevronDown, ChevronUp, Filter } from '../../../components/svg'

const Toolbal = ({
  sale,
  onSale = (f: any) => f,
  price,
  onPrice = (f: any) => f,
}: {
  sale: Ref<boolean>
  onSale: any
  price: Ref<string>
  onPrice: any
}) => {
  return (
    <div class=" flex justify-around py-2">
      <div
        onClick={() => {
          sale.value = !sale.value
          onSale()
        }}
        class={sale.value ? 'text-red-900' : ''}
      >
        销量
      </div>
      <div
        class="flex flex-row"
        onClick={() => {
          price.value = price.value === 'up' ? 'down' : 'up'
          onPrice()
        }}
      >
        <div>价格</div>
        <div class="ml-1">
          <span class={price.value === 'up' ? 'text-red-900' : ''}>
            <ChevronUp />
          </span>
          <span class={price.value === 'down' ? 'text-red-900' : ''}>
            <ChevronDown />
          </span>
        </div>
      </div>
      <div class="flex items-center">
        <div>筛选</div>
        <div class="ml-1 text-gray-500">
          <Filter />
        </div>
      </div>
    </div>
  )
}
export default Toolbal
