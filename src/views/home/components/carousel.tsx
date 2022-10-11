import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper'
import { defineComponent } from 'vue'
import { useBannerStore } from '../../../stores/bannerStore'
import { storeToRefs } from 'pinia'
import type { Banner } from '@/interfaces/banner'

const Carousel = defineComponent({
  setup() {
    const { fetchAd } = useBannerStore()
    fetchAd()
    const { adList } = storeToRefs(useBannerStore())

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
              {adList.value.map((item: Banner) => {
                return (
                  <SwiperSlide key={item.id}>
                    <div class="w-full h-40">
                      <img src={item.image} alt={item.title} class="h-full w-full" />
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
