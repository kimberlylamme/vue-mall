import { defineComponent } from 'vue'
import Layout from './components/layout'

export const App = defineComponent({
  setup() {
    return () => {
      return (
        <>
          <Layout>
            <router-view />
          </Layout>
        </>
      )
    }
  },
})
