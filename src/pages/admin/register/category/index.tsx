import { getLayout } from '@/components/admin/layout';
import PageTitle from '@/components/admin/pageTitle/PageTitle';
import { gql } from '@apollo/client'
import {useGetSubCategoriesQuery, useCreateNewSubCategoryMutation, CreateNewSubCategoryMutationVariables, useDeleteSubCategoryMutation } from '@/libs/apollo/graphql'
import styles from "./category.module.scss"
import { useForm } from 'react-hook-form'

export default function CategoryRegister() {

  const {data, loading} = useGetSubCategoriesQuery()
  const [createItem] = useCreateNewSubCategoryMutation({refetchQueries: ["GetSubCategories"]});
  const [deleteItem] = useDeleteSubCategoryMutation({refetchQueries: ["GetSubCategories"]})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewSubCategoryMutationVariables>()

  const handleCreateCategory = (data: CreateNewSubCategoryMutationVariables) => {
    console.log({data})
    createItem({variables: data})
  }

  const handleDeleteCategory = (categoryId: number) => {
    const confirm = window.confirm("削除してよろしいですか？")
    if(confirm) {
      deleteItem({variables: {id: categoryId}});
    }
  }

  return (
    <>
      <PageTitle title='カテゴリー登録'/>
      <div className={`className='bg-gray-200' ${styles.formContainer}`}>
        <form onSubmit={handleSubmit(handleCreateCategory)}>
          <table>
            <caption className='bg-gray-700 text-white pl-2'>入力フォーム</caption>
            <tbody>
              <tr>
                <th>カテゴリー名</th>
                <td>
                  <input
                    {...register('name', { required: 'カテゴリー名を入力してください' })}
                    type='text'
                    placeholder='カテゴリー名を入力'
                  />
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
                    <th style={{minWidth: "300px"}}>カテゴリー名</th>
                    <th></th>
                  </tr>
                  {
                    data == null ? 
                      <div>データがありません</div>
                      :
                      data.sub_categories.map((subCategory, index) => {
                        return (
                          <tr key={index} className='bg-gray-200'>
                            <td>{subCategory.id}</td>
                            <td>{subCategory.name}</td>
                            <td>
                              <div className={`${styles.delete}`}>
                                <button className='bg-red-500' onClick={() => handleDeleteCategory(subCategory.id)}>
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
  query GetSubCategories {
    sub_categories {
      id
      name
    }
  }
`

gql`
  mutation CreateNewSubCategory($name: String) {
    insert_sub_categories_one(object: {name: $name}) {
      id
      name
    }
  }
`

gql`
  mutation DeleteSubCategory($id: Int!) {
    delete_sub_categories_by_pk(id: $id) {
      id
      name
    }
  }
`

CategoryRegister.getLayout = getLayout;