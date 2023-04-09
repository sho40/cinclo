import { getLayout } from '@/components/admin/layout';
import PageTitle from '@/components/admin/pageTitle/PageTitle';
import { gql } from '@apollo/client';
import { useCreateItemMutation, CreateItemMutationVariables } from '@/libs/apollo/graphql';
import styles from "./newItem.module.scss"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router';
import { stringToDate } from '@/logic/dateFormatter';

export default function ItemNew() {
  const router = useRouter()

  const [createItem] = useCreateItemMutation({refetchQueries: ["getItemListByAdminContainer"]});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateItemMutationVariables>()

  const handleCreateItem = (data: CreateItemMutationVariables) => {

    const category_id = Number(data.category_id)
    const brand_id = Number(data.brand_id)
    const gender = Number(data.gender)
    const regular_price = Number(data.regular_price)
    const current_price = Number(data.current_price)
    if (Number.isNaN(category_id) || Number.isNaN(brand_id) || Number.isNaN(regular_price) || Number.isNaN(current_price)) {
      alert('データ作成に失敗しました')
      return
    }
    const next_lending_date = stringToDate(data.next_lending_date);
    

    const now = new Date;
    const payload: CreateItemMutationVariables = {
      ...data, 
      category_id: category_id,
      brand_id,
      gender,
      created_at: now,
      updated_at: now,
      current_count: 1,
      regular_price,
      current_price,
      is_rental_available: true,
      next_lending_date,
      can_sale: false
    }

    console.log({data})
    console.log({payload})

    // 画像をアップしurlを取得する。
    createItem({variables: payload})
    router.push('/admin/item-list')
  }

  return (
    <>
      <PageTitle title='商品登録'/>
      <div>
        <div className={styles.container}>
          <div>
            <div className={styles.imageArea}>
              <h1>ドラッグ&ドロップ実装予定(画像追加は未実装)</h1>
            </div>
            <form onSubmit={handleSubmit(handleCreateItem)}>
              <div className={styles.basicInfoArea}>
                <div className='bg-gray-200'>
                  <table>
                    <caption className='bg-gray-700 text-white pl-2'>基本情報</caption>
                    <tbody>
                      <tr>
                        <th>商品名</th>
                        <td>
                          <input
                            {...register('name', { required: '商品名を入力してください' })}
                            type='text'
                            placeholder='商品名を入力'
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>説明</th>
                        <td>
                          <textarea
                            {...register('description')}
                            rows={10}
                            placeholder='説明を入力'
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>カテゴリ</th>
                        <td>
                          {/* FIXME: データベースから取得して選択できるように */}
                          <select
                            {...register('category_id', { required: 'カテゴリを選択してください' })}
                          >
                            <option value={1}>トップス</option>
                          </select>
                        </td>
                      </tr> 
                      <tr>
                        <th>ブランド</th>
                        <td>
                          {/* FIXME: データベースから取得して選択できるように */}
                          <select
                            {...register('brand_id', { required: 'ブランドを選択してください' })}
                          >
                            <option value={1}>BEAMS</option>
                          </select>
                        </td>
                      </tr> 
                      <tr>
                        <th>性別</th>
                        <td>
                          <select
                            {...register('gender', { required: '性別を選択してください' })}
                          >
                            <option value={1}>メンズ</option>
                            <option value={2}>レディース</option>
                            <option value={3}>ユニセックス</option>
                          </select>
                        </td>
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
                        <td>
                          <input
                            {...register('regular_price', { required: '定価を入力してください' })}
                            type='number'
                            placeholder='ex. 10000'
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>現在価格</th>
                        <td>
                          <input
                            {...register('current_price', { required: '現在価格を入力してください' })}
                            type='number'
                            placeholder='ex. 6500'
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>次回貸出可能日</th>
                        <td>
                          <input
                            {...register('next_lending_date', { required: '次回貸出可能日を入力してください' })}
                            type='date'
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <ul>
                  <li>
                    {errors.name?.message}
                  </li>
                  <li>
                    {errors.current_price?.message}
                  </li>
                  <li>
                    {errors.is_rental_available?.message}
                  </li>
                  <li>
                    {errors.next_lending_date != null ? "次回貸出可能日を入力してください" : ""　 /* エラーが出るのでこの書き方 */}
                  </li>
                </ul>
              </div>
              <div className={styles.register}>
                <button type='submit'>
                  登録
                </button>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </>
  )
}

gql`
  mutation CreateItem($next_lending_date: timestamptz, $updated_at: timestamptz, $regular_price: Int, $name: String, $brand_id: Int, $category_id: Int, $current_count: Int, $current_price: Int, $description: String, $gender: Int, $is_rental_available: Boolean, $created_at: timestamptz, $can_sale: Boolean) {
    insert_items_one(object: {brand_id: $brand_id, can_sale: $can_sale, category_id: $category_id, current_count: $current_count, current_price: $current_price, regular_price: $regular_price, next_lending_date: $next_lending_date, updated_at: $updated_at, name: $name, description: $description, gender: $gender, is_rental_available: $is_rental_available, created_at: $created_at}) {
      id
    }
  }
`

ItemNew.getLayout = getLayout