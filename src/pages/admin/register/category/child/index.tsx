import { getLayout } from '@/components/admin/layout';
import PageTitle from '@/components/admin/pageTitle/PageTitle';
import { gql } from '@apollo/client'
import {useGetSubCategoriesQuery, useGetChildCategoriesQuery, useCreateNewChildCategoryMutation, CreateNewChildCategoryMutationVariables, useDeleteChildCategoryMutation } from '@/libs/apollo/graphql'
import styles from "./childCatgegory.module.scss"
import { useForm } from 'react-hook-form'

export default function CategoryRegister() {

  const categoryListRes = useGetSubCategoriesQuery()
  const categoryList = categoryListRes.data?.sub_categories;
  const {data, loading} = useGetChildCategoriesQuery()
  const [createItem] = useCreateNewChildCategoryMutation({refetchQueries: ["GetChildCategories"]});
  const [deleteItem] = useDeleteChildCategoryMutation({refetchQueries: ["GetChildCategories"]})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewChildCategoryMutationVariables>()

  const handleCreateChildCategory = (data: CreateNewChildCategoryMutationVariables) => {

    const sub_category_id =  Number(data.sub_category_id);
    if (Number.isNaN(sub_category_id)) {
      alert('データ作成に失敗しました')
      return
    }
    const payload = {...data, sub_category_id}
    console.log({payload})

    createItem({variables: payload})
  }

  const handleDeleteChildCategory = (childCategoryId: number) => {
    const confirm = window.confirm("削除してよろしいですか？")
    if(confirm) {
      deleteItem({variables: {id: childCategoryId}});
    }
  }

  return (
    <>
      <PageTitle title='子カテゴリー登録'/>
      <div className={`className='bg-gray-200' ${styles.formContainer}`}>
        {categoryListRes.loading ? 
          <></> 
          : 
          <form onSubmit={handleSubmit(handleCreateChildCategory)}>
            <table>
              <caption className='bg-gray-700 text-white pl-2'>入力フォーム</caption>
              <tbody>
                <tr>
                  <th>子カテゴリー名</th>
                  <td>
                    <input
                      {...register('name', { required: '子カテゴリー名を入力してください' })}
                      type='text'
                      placeholder='子カテゴリー名を入力'
                    />
                  </td>
                  <td>
                    <select
                      {...register('sub_category_id', { required: '親カテゴリーを選択してください' })}
                    >
                      {
                        categoryList && categoryList?.map((category, index) => {
                          return (
                            <option key={index} value={category.id}>
                              {category.name}
                            </option>
                          )
                        })
                      }
                    </select>
                  </td>
                  <td>
                    <div className={styles.register}>
                      <button type='submit'>
                        登録
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='mt-2 ml-2 text-red-600'>
              {errors.name?.message}
            </div>
        </form>
        }
      </div>
      <div className='mt-5'>
        {
          loading ? 
            <div>loading...</div> 
            :
            <div className={styles.listContainer}>
              <table>
                <tbody>
                  <tr className='bg-gray-700 text-white'>
                    <th>id</th>
                    <th style={{minWidth: "300px"}}>子カテゴリー名</th>
                    <th>親カテゴリー名</th>
                    <th></th>
                  </tr>
                  {
                    data == null ? 
                      <div>データがありません</div>
                      :
                      data.categories.map((category, index) => {
                        return (
                          <tr key={index} className='bg-gray-200'>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.sub_category?.name ?? "-"}</td>
                            <td>
                              <div className={`${styles.delete}`}>
                                <button className='bg-red-500' onClick={() => handleDeleteChildCategory(category.id)}>
                                  削除
                                </button>
                              </div>
                          </td>
                          </tr>
                        )
                      })
                  }
                </tbody>
              </table>
            </div> 
        }
      </div>
    </>
  )
}

gql`
  query GetChildCategories {
    categories {
      id
      name
      sub_category {
        id
        name
      }
    }
  }
`

gql`
  mutation CreateNewChildCategory($name: String, $sub_category_id: Int) {
    insert_categories_one(object: {name: $name, sub_category_id: $sub_category_id}) {
      id
      name
      sub_category {
        id
        name
      }
    }
  }
`

gql`
  mutation DeleteChildCategory($id: Int!) {
    delete_categories_by_pk(id: $id) {
      id
      name
    }
  }
`

CategoryRegister.getLayout = getLayout;