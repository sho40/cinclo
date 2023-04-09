import { gql } from '@apollo/client'
import { useGetItemListByAdminContainerQuery } from '@/libs/apollo/graphql'
import { getLayout } from '@/components/admin/layout';
import PageTitle from '@/components/admin/pageTitle/PageTitle';
import ActionButtonArea from '@/components/admin/actionButtonArea/ActionButtonArea';
import ItemListTable from '@/components/admin/item-list/ItemListTable';

export default function ItemListContainer() {

  const { data, loading } = useGetItemListByAdminContainerQuery();

  return (
    <>
      <PageTitle title='商品一覧'/>
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
                <ItemListTable items={data.items}/>
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

ItemListContainer.getLayout = getLayout