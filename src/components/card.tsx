import type { Cards } from '../interfaces/goods'
import logo from '../assets/goods.jpg'

const Card = ({
  isVertical,
  goods_id,
  original_img,
  goods_name,
  shop_price,
  market_price,
  sales_sum,
}: Cards) => {
  return (
    <router-link to={`/goods/detail?id=${goods_id}`}>
      <section
        class={`${isVertical ? 'flex-col' : 'flex-row'} flex items-center gap-3 bg-white px-3 py-4`}
      >
        <img src={logo} alt={goods_name} width={140} height={140} />
        <div class="w-full flex-1">
          <div class="mb-2 text-sm line-clamp-2">{goods_name}</div>

          <div class="text-sm font-semibold text-red-700">
            ￥{shop_price}
            <span class=" ml-1 font-normal text-gray-500 line-through">￥{market_price}</span>
          </div>
          <div class=" mt-2 text-sm text-gray-700">已售：{sales_sum}件</div>
        </div>
      </section>
    </router-link>
  )
}

export default Card
