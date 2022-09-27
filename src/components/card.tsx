import type { Product } from '../interfaces/goods'
const Card = ({ isVertical, product }: { isVertical: boolean; product: Product }) => {
  return (
    <router-link to={`/goods/detail?id=${product.goodsId}`}>
      <section
        class={`${
          isVertical ? 'flex-col' : 'flex-row'
        } flex items-center gap-3 bg-white px-3 py-4 h-full`}
      >
        <img src={product.image} alt={product.goodsName} width={140} height={140} />
        <div class="w-full flex-1">
          <div class="mb-2 text-sm line-clamp-2 h-11">{product.goodsName}</div>

          <div class="text-sm font-semibold text-red-700">
            ￥{product.price}
            <span class=" ml-1 font-normal text-gray-500 line-through">
              ￥{product.marketPrice}
            </span>
          </div>
          <div class=" mt-2 text-sm text-gray-700">已售：{product.sales}件</div>
        </div>
      </section>
    </router-link>
  )
}

export default Card
