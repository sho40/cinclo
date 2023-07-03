import { getLayout } from "@/components/admin/layout";
import PageTitle from "@/components/admin/pageTitle/PageTitle";
import { UpdateRepliedFlgMutationVariables, useFetchContactsQuery, useUpdateRepliedFlgMutation } from "@/libs/apollo/graphql";
import { formatDateYYYYMMDDHHmmss } from "@/logic/dateFormatter";
import { gql } from "@apollo/client";
import styles from "./contactManagement.module.scss"
import { ReactNode, useState } from "react";
import { escapeDescription } from "../item/detail/[id]";

const ContentDialog = (props: {
  children: ReactNode;
  onClose: () => void;
}) => {

  return (
    <>
      <div className={styles.overlay}/>
      <div className={styles.dialogContainer}>
        <div className={styles.content}>{props.children}</div>
        <div className={styles.closeButton} onClick={props.onClose}>
          <button className="bg-blue-400 text-white">close</button>
        </div>
      </div>
    </>
  )
}

export default function ContactManagement() {

  const {data, loading} = useFetchContactsQuery();
  const [isShown, setShown] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<string>("");
  const toggleDialogOpen = (content: string) => {
    setDialogContent(content);
    setShown(!isShown);
  }

  const [updateRepliedFlg] = useUpdateRepliedFlgMutation();
  const onUpdateRepliedFlg = async (id: number, flg: boolean) => {

    const params: UpdateRepliedFlgMutationVariables = {
      id: id,
      replied_flg: !flg
    }

    try {
      await updateRepliedFlg({variables: params})
    } catch (error) {
      console.log({error})
    }
  }

  return (
    <>
      <PageTitle title='お問合せ管理'/>
      <div>
        {
          loading ?
          <div>...Loading</div>
          :
          <div className={styles.itemListTable}>
          <table>
            <thead>
              <tr className="bg-gray-700 text-white">
                <th>問い合わせ日時</th>
                <th>顧客名</th>
                <th>メールアドレス</th>
                <th colSpan={2}>問い合わせ内容</th>
                <th colSpan={2}>返信済フラグ</th>
              </tr>
            </thead>
            <tbody>
              {
                data?.contacts != null && data.contacts.length > 0 ? 
                  data.contacts.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.created_at ? formatDateYYYYMMDDHHmmss(item.created_at) : "-"}</td>
                        <td>{item.customer_name}</td>
                        <td>{item.mail_address}</td>
                        <td>{item.content}</td>
                        <td>
                          <div className={styles.detailButton}>
                            <button className='bg-gray-400 text-white' onClick={() => {toggleDialogOpen(item.content)}}>詳細</button>
                          </div>
                        </td>
                        <td>{item.replied_flg ? "返信済み" : "未返信"}</td>
                        <td>
                          <div className={styles.toggleRepliedButton}>
                            <button className={`text-white ${item.replied_flg ? "bg-gray-400" : "bg-blue-400"}`} onClick={() => {onUpdateRepliedFlg(item.id, item.replied_flg)}}>{item.replied_flg ? "未返信にする" : "返信済にする"}</button>
                          </div>
                        </td>
                      </tr>
                    )
                  }) : (
                    <div>データがありません</div> 
                  )
              }
            </tbody>
          </table>
        </div>
        }
      </div>
      {
        isShown ? (
          <ContentDialog onClose={() => setShown(false)}>
            <div>{escapeDescription(dialogContent)}</div>
          </ContentDialog>
        ) : (
          <></>
        )
      }
      
    </>
  )
}

gql`
  query FetchContacts {
    contacts(order_by: {created_at: desc}) {
      id
      customer_name
      mail_address
      created_at
      content
      replied_flg
    }
  }
`

gql`
  mutation updateRepliedFlg($id: Int!, $replied_flg: Boolean) {
    update_contacts_by_pk(pk_columns: {id: $id}, _set: {replied_flg: $replied_flg}) {
      replied_flg
      id
    }
  }
`

ContactManagement.getLayout = getLayout