import { useRouter } from "next/router";
import { gql } from '@apollo/client';
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { addApolloState, initializeApollo } from "@/libs/apollo/apolloClient";
import { GetItemCustomerDocument, GetItemCustomerQuery, GetItemIdListDocument, GetItemIdListQuery, useGetItemCustomerQuery } from "@/libs/apollo/graphql";
import { Layout } from '@/components/customer/Layout'
import styles from "./itemDetail.module.scss"
import { numberToPrice } from "@/logic/numberFormatter";
import { Splide, SplideSlide } from '@splidejs/react-splide';
// デフォルトのテーマ
import '@splidejs/react-splide/css';
import Image from 'next/image';
import React from "react";

export const getStaticPaths: GetStaticPaths<{id: string}> = async () => {
  const apolloClient = initializeApollo();
  const {data} = await apolloClient.query<GetItemIdListQuery>({query: GetItemIdListDocument});
  const paths = data.items.map(({id}) => {
    return { params: {id: String(id)} }
  })
  return {paths, fallback: true}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query<GetItemCustomerQuery>({ query: GetItemCustomerDocument, variables: { id: Number(params?.id) } });
  return addApolloState(apolloClient, { props: {} });
};

// TODO: コンポーネント化 & デザイン調整
const ImageArea = (imageUrls: string[]) => {
  return (
    <div className={styles.imageArea}>
      <Splide 
        aria-label="item-image"
      >
        {
          imageUrls.map((url, index) =>
            (<SplideSlide key={index}>
              <div style={{position: "relative"}}>
                {/* next/imageのfillだと画像が表示されないためwidthとheightを仮で指定 */}
                <Image src={url}  alt='' width={300} height={0}/>
              </div>
            </SplideSlide>)
          )
        }
      </Splide>
    </div>
  )
}

const escapeDescription = (description: string) => {
  const text = description.split(/(\n)/).map((item, index) => {
    return (
      <React.Fragment key={index}>
        {
          item.match(/\n/) ? <br /> : <span>{item}</span>
        }
      </React.Fragment>
    );
  })
  return <div>{text}</div>
}

export default function ItemDetail() {

  const router = useRouter();
  const { id } = router.query;
  const {data} = useGetItemCustomerQuery({variables: {id: Number(id)}})

  const item: GetItemCustomerQuery["items_by_pk"] | undefined = data?.items_by_pk;
  if (item == null) return <></>

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.imageAreaContainer}>
          {ImageArea(item.images.map(image => image.url))}
        </div>
        <div className={styles.mainContent}>
          <div className={styles.brandName}>
            <span>{item.brand?.name}</span>
          </div>
          <div className={styles.itemName}>
            <span>{item.name}</span>
          </div>
          <div className={styles.price}>
            <span className="text-red-400" style={{fontSize: "20px"}}>
              {item.current_price != null ? numberToPrice(item.current_price) : ""}
            </span>
            <span style={{marginLeft: "2px", fontSize: "12px"}}>{"(税込み)"}</span>
            <span style={{marginLeft: "10px"}}>
              <del>
                {item.regular_price != null ? numberToPrice(item.regular_price) : ""}
              </del>
            </span>
          </div>
          <p className={styles.deliveryFee}>
            ※送料はチェックアウト時に計算されます。
          </p>
          <div className={styles.rentalCount}>
            <span>レンタル回数:</span>
            <span className="text-red-400" style={{marginLeft: "5px"}}>{item.current_count}</span>
            <span>回目</span>
          </div>
          <div className={styles.addCartButton}>
            <div>
              カートに追加する
            </div>
          </div>
          <div className={styles.description}>
            {item.description != null ? escapeDescription(item.description) : ""}
          </div>
        </div>
      </div>
    </Layout>
  )
}

gql`
  query GetItemIdList {
    items {
      id
    }
  }
`

gql`
  query GetItemCustomer($id: Int!) {
    items_by_pk(id: $id) {
      brand {
        name
        id
      }
      can_sale
      category {
        id
        name
        sub_category {
          id
          name
        }
      }
      current_count
      current_price
      description
      gender
      images {
        id
        url
      }
      is_rental_available
      name
      next_lending_date
      regular_price
    }
  }
`

