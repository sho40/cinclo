import { useGetHomeBannerImagesQuery } from '@/libs/apollo/graphql';
import Image from 'next/image';
import styles from "./slideBanner.module.scss"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Router from 'next/router'
// デフォルトのテーマ
import '@splidejs/react-splide/css';

export const SlideBunner = () => {

  const {data, loading} = useGetHomeBannerImagesQuery();

  if (data?.home_banners == null || data?.home_banners.length < 1 || loading) {
    return <></>
  }

  const goToGuide = (id: number) => {

    Router.push({
      pathname: '/guide',
      query: { key: id },
    })
  }
  

  return (
    <div className={styles.container}>
      <Splide 
        aria-label="banner"
        options={{
          rewind: true,
          autoplay: true, // 自動再生を有効
          interval: 10000, // 自動再生の間隔を10秒に設定
          arrows: false
        }}
      >
        {
          data?.home_banners.map((banner, index) =>
            (<SplideSlide key={index}>
              <div style={{position: "relative"}} onClick={() => goToGuide(banner.id)}>
                {/* next/imageのfillだと画像が表示されないためwidthとheightを仮で指定 */}
                <Image src={banner.url}  alt='' width={1000} height={0}/>
              </div>
            </SplideSlide>)
          )
        }
      </Splide>
    </div>
  )
}
