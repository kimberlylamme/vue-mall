interface Cards {
  goods_id: number
  original_img: string
  goods_name: string
  shop_price: number
  market_price: number
  sales_sum: number
  isVertical?: boolean
}

interface Goods {
  goodsId: number
  goodsName: string
  goodsPrice: number
  originPrice: number
  image: string
  sales: number
}

export type { Cards, Goods }
