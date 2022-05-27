import Card from '../../../components/card'
import type { Cards } from '../../../interfaces/goods'

const cards: Cards[] = [
  {
    goods_id: 1,
    original_img: '/goods.jpg',
    goods_name:
      'zbt无线路由器4G插卡全三网通无限高速流量不限速5Gcpe 农村山区宿舍智能监控移动无线wif 1200Mbps【4G插卡路由器】七模全网通',
    shop_price: 100.01,
    market_price: 200,
    sales_sum: 1,
  },
  {
    goods_id: 2,
    original_img: '/goods.jpg',
    goods_name:
      'zbt无线路由器4G插卡全三网通无限高速流量不限速5Gcpe 农村山区宿舍智能监控移动无线wif 1200Mbps【4G插卡路由器】七模全网通',
    shop_price: 100.01,
    market_price: 200,
    sales_sum: 1,
  },
  {
    goods_id: 3,
    original_img: '/goods.jpg',
    goods_name:
      'zbt无线路由器4G插卡全三网通无限高速流量不限速5Gcpe 农村山区宿舍智能监控移动无线wif 1200Mbps【4G插卡路由器】七模全网通',
    shop_price: 100.01,
    market_price: 200,
    sales_sum: 1,
  },
]
const GoodsColumn = () => {
  return (
    <div class="my-2 bg-white p-2">
      <div class=" h-20 w-full rounded-lg bg-blue-500"></div>
      <div>
        <div class=" grid grid-cols-3">
          {cards.map((card) => (
            <Card key={card.goods_id} isVertical={true} {...card}></Card>
          ))}
        </div>
      </div>
    </div>
  )
}
export default GoodsColumn
