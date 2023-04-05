import { gql } from '@apollo/client'
import { useGetItemListByAdminContainerQuery } from '@/libs/apollo/graphql'
import { getLayout } from '@/components/admin/layout';
import PageTitle from '@/components/admin/pageTitle/PageTitle';
import ActionButtonArea from '@/components/admin/actionButtonArea/ActionButtonArea';

export default function AdminItemsContainer() {

  const { data, loading } = useGetItemListByAdminContainerQuery();

  return (
    <>
      <PageTitle title='アイテム一覧'/>
      <ActionButtonArea><></></ActionButtonArea>
      {
        loading ?
          <div>...Loading</div>
          :
          <div>
            {
              data == null ? 
                <div>データがありません</div>
                :
                <div>
                  {
                    data.items.map((item, index) => {
                      return (
                        <div key={index}>
                          <ul>
                            <li>商品名: {item.name}</li>
                            <li>定価: {item.regular_price}</li>
                          </ul>
                        </div>
                      )
                    })
                  }
                </div>
            }
          </div>
      }
    </>
  )
}

gql`
  query getItemListByAdminContainer {
    items {
      id
      name
      regular_price
      current_price
      current_count
      gender
      can_sale
      is_rental_available
      next_lending_date
    }
}
`

AdminItemsContainer.getLayout = getLayout