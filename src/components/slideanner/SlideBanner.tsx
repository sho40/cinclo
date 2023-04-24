import { useGetHomeBannerImagesQuery } from '@/libs/apollo/graphql';
import Image from 'next/image';
import styles from "./slideBanner.module.scss"
import { Splide, SplideSlide } from '@splidejs/react-splide';
// デフォルトのテーマ
import '@splidejs/react-splide/css';

export const SlideBunner = () => {

  const {data, loading} = useGetHomeBannerImagesQuery();
  console.log({data})

  if (data?.home_banners == null || data?.home_banners.length < 1 || loading) {
    return <></>
  }

  return (
    <div className={styles.container}>
      <Splide 
        aria-label="banner"
        options={{
          rewind: true,
          autoplay: true, // 自動再生を有効
          interval: 3000, // 自動再生の間隔を3秒に設定
        }}
      >
        {
          data?.home_banners.map((banner, index) =>
            (<SplideSlide key={index}>
              <div style={{position: "relative"}}>
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
