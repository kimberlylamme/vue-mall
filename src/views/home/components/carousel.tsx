import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper'
import { defineComponent, onBeforeMount } from 'vue'
import { useHomeStore } from '../../../stores/homeStore'
import { storeToRefs } from 'pinia'

const Carousel = defineComponent({
  setup() {
    const { fetchAd } = useHomeStore()
    fetchAd({})
    const { adList } = storeToRefs(useHomeStore())

    return () => {
      return (
        <>
          {adList.value.length > 0 && (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={50}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
            >
              {adList.value.map((item: any) => {
                return (
                  <SwiperSlide key={item.id}>
                    <div class="relative w-full bg-blue-500">
                      <img src={item.images} alt={item.title} />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          )}
        </>
      )
    }
  },
})

export default Carousel
