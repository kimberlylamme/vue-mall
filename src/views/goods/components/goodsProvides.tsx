import { useState, createContext, useContext } from 'react'

export interface IGoodsContext {
  isShowSku: boolean
  setIsShowSku(state: boolean): void
  sku: any
  setSku(sku: any): void
  status: number
  setStatus(count: number): void
  tree: any[]
  setTree(array: any[]): void
  specs: any[]
  setSpecs(array: any[]): void
  selectSku: ISelectSku
  setSelectSku(sku: ISelectSku): void
}

interface ISelectSku {
  skuId: number
  skuName: string
  skuImg: string
  price: number
  store_count: number
  count: number
}

const GoodsContext = createContext(undefined)
export const useGoodsContext = (): IGoodsContext => {
  const context = useContext(GoodsContext)
  if (!context) {
    throw new Error('useGoodsContext must be used within a GoodsContextProvider')
  }
  return context
}

const GoodsProvides = (props: any) => {
  const [status, setStatus] = useState<number>(0)
  const [isShowSku, setIsShowSku] = useState(false)
  const [sku, setSku] = useState<object>({})
  const [tree, setTree] = useState<any[]>([])
  const [specs, setSpecs] = useState<any[]>([])
  const [selectSku, setSelectSku] = useState<ISelectSku>({
    skuId: 0,
    skuName: '',
    skuImg: '',
    price: 0,
    store_count: 0,
    count: 1,
  })
  const GoodsValue: IGoodsContext = {
    isShowSku,
    setIsShowSku,
    sku,
    setSku,
    status,
    setStatus,
    tree,
    setTree,
    specs,
    setSpecs,
    selectSku,
    setSelectSku,
  }
  return <GoodsContext.Provider value={GoodsValue} {...props} />
}
export default GoodsProvides
