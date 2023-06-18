import { Layout } from "@/components/customer/Layout";
import styles from "./contact.module.scss"
import { useForm } from 'react-hook-form'
import { gql } from "@apollo/client";
import { CreateContactMutationVariables, useCreateContactMutation } from "@/libs/apollo/graphql";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/atoms/LoadingAtom";

export default function Contact() {
  const router = useRouter();
  const [createContact] = useCreateContactMutation();
  const setLoading = useSetRecoilState(loadingState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateContactMutationVariables>()

  const onCreateContact = async (data: CreateContactMutationVariables) => {

    // 画面にloading表示
    setLoading(true);

    await createContact({variables: {
      customer_name: data.customer_name,
      mail_address: data.mail_address,
      content: data.content
    }})

    fetch('/api/contact_mail_accepted', {
      body: JSON.stringify({
        customer_name:  data.customer_name,
        mail_address : data.mail_address,
        message: data.content
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    // フォームを初期化
    reset();

    // 受付完了画面へ遷移
    router.push("/contact/success/")

    // loading解除
    setLoading(false);
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1>お問合せ</h1>
        <div className={styles.insert_container}>
          <form onSubmit={handleSubmit(onCreateContact)}>
            <div className={styles.insert_row}>
              <h3>
                <span>お名前</span>
                <span className={styles.error_message}>{errors.customer_name?.message}</span>
              </h3>
              <input 
                {...register('customer_name', { required: '入力してください' })}
                placeholder="お名前を入力"
              />
            </div>
            <div className={styles.insert_row}>
              <h3>
                <span>メールアドレス</span>
                <span className={styles.error_message}>{errors.mail_address?.message}</span>
              </h3>
              <input 
                {...register('mail_address', { required: '入力してください' })}
                placeholder="メールアドレスを入力"
              />
            </div>
            <div className={styles.insert_row}>
              <h3>
                <span>お問合せ内容</span>
                <span className={styles.error_message}>{errors.content?.message}</span>
              </h3>
              <textarea 
                {...register('content', { required: '入力してください' })}
                rows={10}
                placeholder='お問合せ内容を入力'
              />
            </div>
            <div className={styles.submit_button}>
              <button type="submit">
                送信
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

gql`
  mutation CreateContact($content: String, $customer_name: String, $mail_address: String) {
    insert_contacts_one(object: {content: $content, customer_name: $customer_name, mail_address: $mail_address}) {
      id
    }
  }
`