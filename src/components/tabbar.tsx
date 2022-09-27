import { useRoute } from 'vue-router'
import { Home, ShoppingCart, User } from './svg'
const Tabbar = () => {
  const router = useRoute()
  const tabbarData = ['/', '/my']
  const isShowTabbar = tabbarData.includes(router.path)
  return (
    <div
      v-show={isShowTabbar}
      class=" fixed bottom-0 flex h-16 w-full justify-between border-t bg-white text-gray-700"
    >
      <router-link to="/">
        <a
          class={`flex flex-col items-center justify-center gap-1 px-4 py-1 ${
            router.path === '/' ? 'text-blue-500' : ''
          }`}
        >
          <Home />
          <div>首页</div>
        </a>
      </router-link>

      <router-link to="/cart">
        <a
          class={`flex flex-col items-center justify-center gap-1 px-4 py-1 ${
            router.path === '/cart' ? 'text-blue-500' : ''
          }`}
        >
          <ShoppingCart />
          <div>购物车</div>
        </a>
      </router-link>

      <router-link to="/my">
        <a
          class={`flex flex-col items-center justify-center gap-1 px-4 py-1 ${
            router.path === '/my' ? 'text-blue-500' : ''
          }`}
        >
          <User />
          <div>我的</div>
        </a>
      </router-link>
    </div>
  )
}
export default Tabbar
