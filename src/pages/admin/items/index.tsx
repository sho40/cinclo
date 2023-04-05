import { gql } from '@apollo/client'
import { useGetItemListByAdminContainerQuery } from '@/libs/apollo/graphql'

export default function AdminItemsContainer() {

  const { data, loading } = useGetItemListByAdminContainerQuery();

  return (
    <>
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