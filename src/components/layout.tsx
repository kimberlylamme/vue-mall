import { defineComponent } from 'vue'
import Tabbar from './tabbar'

export const Layout = defineComponent({
  setup(props, { slots }) {
    const child = slots.default?.()
    return () => {
      return (
        <main class="min-h-screen w-full bg-gray-100">
          {child}
          <Tabbar />
        </main>
      )
    }
  },
})

export default Layout
