import { getLayout } from '@/components/admin/layout';
import PageTitle from '@/components/admin/pageTitle/PageTitle';
import { gql } from '@apollo/client'
import { useGetBrandListQuery, useCreateNewBrandMutation, CreateNewBrandMutationVariables, useDeleteBrandMutation } from '@/libs/apollo/graphql'
import styles from "./brandRegister.module.scss"
import { useForm } from 'react-hook-form'

export default function BrandRegister() {

  const {data, loading} = useGetBrandListQuery()
  const [createItem] = useCreateNewBrandMutation({refetchQueries: ["GetBrandList"]});
  const [deleteItem] = useDeleteBrandMutation({refetchQueries: ["GetBrandList"]})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewBrandMutationVariables>()

  const handleCreateBrand = (data: CreateNewBrandMutationVariables) => {
    console.log({data})
    createItem({variables: data})
  }

  const handleDeleteBrand = (brandId: number) => {
    const confirm = window.confirm("削除してよろしいですか？")
    if(confirm) {
      deleteItem({variables: {id: brandId}});
    }
  }

  return (
    <>
      <PageTitle title='ブランド登録'/>
      <div className={`className='bg-gray-200' ${styles.formContainer}`}>
        <form onSubmit={handleSubmit(handleCreateBrand)}>
          <table>
            <caption className='bg-gray-700 text-white pl-2'>入力フォーム</caption>
            <tbody>
              <tr>
                <th>ブランド名</th>
                <td>
                  <input
                    {...register('name', { required: 'ブランド名を入力してください' })}
                    type='text'
                    placeholder='ブランド名を入力'
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
                    <th style={{minWidth: "300px"}}>ブランド名</th>
                    <th></th>
                  </tr>
                  {
                    data == null ? 
                      <div>データがありません</div>
                      :
                      data.brands.map((brand, index) => {
                        return (
                          <tr key={index} className='bg-gray-200'>
                            <td>{brand.id}</td>
                            <td>{brand.name}</td>
                            <td>
                            <div className={`${styles.delete}`}>
                              <button className='bg-red-500' onClick={() => handleDeleteBrand(brand.id)}>
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
  query GetBrandList {
    brands {
      id
      name
    }
  }
`

gql`
  mutation CreateNewBrand($name: String) {
    insert_brands_one(object: {name: $name}) {
      id
      name
    }
  }
`

gql`
  mutation DeleteBrand($id: Int!) {
    delete_brands_by_pk(id: $id) {
      id
      name
    }
  }
`

BrandRegister.getLayout = getLayout;