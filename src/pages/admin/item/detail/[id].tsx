import { getLayout } from '@/components/admin/layout';
import PageTitle from '@/components/admin/pageTitle/PageTitle';
import { useDeleteItemMutation, useGetItemQuery } from '@/libs/apollo/graphql';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { numberToPrice } from "@/logic/numberFormatter";
import { formatDateYYYYMMDDHHmmss, formatDateYYYYMMDD } from "@/logic/dateFormatter"
import { genderFormat } from "@/logic/genderFormatter"
import styles from "./ItemDetail.module.scss"


export default function ItemDetail() {
  const router = useRouter();

  // 安全にnumberに変換できるようにする。
  const itemId = Number(router.query.id);
  const {data} = useGetItemQuery({variables: {id: itemId}});
  const item = data?.items_by_pk;

  // TODO: 動作確認
  const [deleteItem] = useDeleteItemMutation({variables: {itemId: itemId}, refetchQueries: ["getItemListByAdminContainer"]});
  const onDelete = () => {
    const confirm = window.confirm("削除してよろしいですか？")
    if(confirm) {
      deleteItem();
      router.push('/admin/item-list/')
    }
  }

  return (
    <>
      <PageTitle title='商品詳細'/>
      <div className={styles.container}>
        {
          item == null ? (
            <div>商品が見つかりませんでした</div>
          ) : (
            <>
              <div>
                <div>
                  <div className={styles.imageArea}>
                    <div>商品画像</div>
                  </div>
                  <div className={styles.basicInfoArea}>
                    <div className='bg-gray-200'>
                      <table>
                        <caption className='bg-gray-700 text-white pl-2'>基本情報</caption>
                        <tbody>
                          <tr>
                            <th>商品名</th>
                            <td>{item.name}</td>
                          </tr>
                          <tr>
                            <th>説明</th>
                            <td>{item.description}</td>
                          </tr>
                          <tr>
                            <th>カテゴリ</th>
                            <td>{item.category?.name}</td>
                          </tr> 
                          <tr>
                            <th>ブランド</th>
                            <td>{item.brand?.name}</td>
                          </tr> 
                          <tr>
                            <th>性別</th>
                            <td>{genderFormat(item.gender)}</td>
                          </tr> 
                          <tr>
                            <th>登録日</th>
                            <td>{formatDateYYYYMMDDHHmmss(item.created_at)}</td>
                          </tr> 
                          <tr>
                            <th>更新日</th>
                            <td>{formatDateYYYYMMDDHHmmss(item.updated_at)}</td>
                          </tr> 
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className={styles.rentalInfoArea}>
                    <div className='bg-gray-200'>
                      <table>
                        <caption className='bg-gray-700 text-white pl-2'>レンタル情報</caption>
                        <tbody>
                          <tr>
                            <th>定価</th>
                            <td>{item.regular_price != null ? numberToPrice(item.regular_price) : '定価不明'}</td>
                          </tr>
                          <tr>
                            <th>現在価格</th>
                            <td>{item.regular_price != null ? numberToPrice(item.current_price!) : '不明'}</td>
                          </tr>
                          <tr>
                            <th>貸出回数</th>
                            <td>{`${item.current_count}回目`}</td>
                          </tr>
                          <tr>
                            <th>レンタルステータス</th>
                            <td>{item.is_rental_available ? 'レンタル可能' : '貸出中'}</td>
                          </tr>
                          <tr>
                            <th>次回貸出可能日</th>
                            <td>{item.next_lending_date ? formatDateYYYYMMDD(item.next_lending_date) : '-'}</td>
                          </tr>
                          <tr>
                            <th>販売ステータス</th>
                            <td>{item.can_sale ? '販売可能' : '-'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.delete}>
                <button onClick={() => onDelete()}>削除</button>
              </div>
            </>
          )
        }
      </div>
    </>
  )
}

gql`
  mutation DeleteItem($itemId: Int!) {
    delete_items_by_pk(id: $itemId) {
      id
    }
  }
`

gql`
  query getItem($id: Int!) {
    items_by_pk(id: $id) {
      ...ItemDetail
    }
  }
`

gql`
  fragment ItemDetail on items {
    brand {
      id
      name
    }
    category {
      id
      name
      sub_category {
        id
        name
      }
    }
    created_at
    current_count
    current_price
    description
    gender
    id
    is_rental_available
    name
    next_lending_date
    regular_price
    updated_at
    can_sale
    images {
      url
      id
      item_id
    }
  }
`

ItemDetail.getLayout = getLayout