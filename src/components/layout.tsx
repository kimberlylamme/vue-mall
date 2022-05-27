import { defineComponent } from 'vue'
import Tabbar from './tabbar'

export const Layout = defineComponent({
  setup(props, { slots }) {
    const child = slots.default?.()
    return () => {
      return (
        <div class="min-h-screen w-full bg-gray-100">
          <main>{child}</main>
          <Tabbar />
        </div>
      )
    }
  },
})

export default Layout
