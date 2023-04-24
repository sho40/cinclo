import { getLayout } from '@/components/admin/layout';
import PageTitle from '@/components/admin/pageTitle/PageTitle';
import { EditItemsMutationVariables, useDeleteItemMutation, useGetItemQuery, useEditItemsMutation, Items, GetItemQuery, Maybe, Brands, Categories, Sub_Categories, Images, useGetChildCategoriesQuery, useGetBrandListQuery, Images_Insert_Input, useInsertImagesMutation, useDeleteImageMutation } from '@/libs/apollo/graphql';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { numberToPrice } from "@/logic/numberFormatter";
import { formatDateYYYYMMDDHHmmss, formatDateYYYYMMDD, stringToDate, formatDateYYYYMMDDForDateForm } from "@/logic/dateFormatter"
import { genderFormat } from "@/logic/genderFormatter"
import styles from "./ItemDetail.module.scss"
import { isValidUrl } from '@/logic/checkUrl';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone';
import { getStorage } from 'firebase/storage';
import { onFirebaseUpload } from '@/logic/uploadFile';
import React from 'react';

type ItemDetailType = Maybe<(
  { __typename?: 'items' }
  & Pick<Items, 'created_at' | 'current_count' | 'current_price' | 'description' | 'gender' | 'id' | 'is_rental_available' | 'name' | 'next_lending_date' | 'regular_price' | 'updated_at' | 'can_sale' | 'is_recommend'>
  & { brand?: Maybe<(
    { __typename?: 'brands' }
    & Pick<Brands, 'id' | 'name'>
  )>, category?: Maybe<(
    { __typename?: 'categories' }
    & Pick<Categories, 'id' | 'name'>
    & { sub_category?: Maybe<(
      { __typename?: 'sub_categories' }
      & Pick<Sub_Categories, 'id' | 'name'>
    )> }
  )>, images: Array<(
    { __typename?: 'images' }
    & Pick<Images, 'url' | 'id' | 'item_id'>
  )> }
)>

export default function ItemDetail() {
  const router = useRouter();
  const itemId = Number(router.query.id);
  const [item, setItem] = useState<ItemDetailType | undefined>(undefined);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const categoryListRes = useGetChildCategoriesQuery()
  const categoryList = categoryListRes.data?.categories;
  const brandListRes = useGetBrandListQuery()
  const brandList = brandListRes.data?.brands;

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditItemsMutationVariables>()

  useGetItemQuery({variables: {id: itemId}, onCompleted: ({items_by_pk}) => {
    if (items_by_pk == null) return;
    setItem(items_by_pk)
  }});

  // アイテム削除
  const [deleteItem] = useDeleteItemMutation({variables: {itemId: itemId}, refetchQueries: ["getItemListByAdminContainer"]});
  const onDelete = () => {
    const confirm = window.confirm("削除してよろしいですか？")
    if(confirm) {
      deleteItem();
      router.push('/admin/item-list/')
    }
  }

  // 画像削除
  const [deleteImage] = useDeleteImageMutation()
  const onImageDelete = (imageId: number) => {
    const confirm = window.confirm("削除してよろしいですか？")
    if(confirm) {
      // FIXME: 削除後に画面に即反映する
      deleteImage({variables: {id: imageId}});
    }
  }

  const escapeDescription = (description: string) => {
    const text = description.split(/(\n)/).map((item, index) => {
      return (
        <div key={index}>
          {item.match(/\n/) ? <br /> : item}
        </div>
      );
    })
    return <div>{text}</div>
  }

  const date = item?.next_lending_date != null ? new Date(item?.next_lending_date) : new Date();
  const dafaultDateStr = formatDateYYYYMMDDForDateForm(date);

  // 画像追加処理まわり

  const [createImages] = useInsertImagesMutation();

  // ブラウザ表示用のpaths
  const [previewImagePaths, setPreviewImagePathes] = useState<string[]>([]);
  // upload用のfiles
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = (newFiles: File[]) => {
    // upload用のstateへsetする
    const allFiles = files.concat(newFiles);
    setFiles(allFiles);

    // ブラウザで画像を表示させるための、一時的なURLをメモリに生成する
    const newTempUrls = newFiles.map((file) => URL.createObjectURL(file));
    const allUrls = previewImagePaths.concat(newTempUrls);
    setPreviewImagePathes(allUrls);
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const storage = getStorage();

  const handleItemDelete = () => {
    setPreviewImagePathes([]);
    setFiles([]);
  }

  // 編集
  const [editItem] = useEditItemsMutation()
  const handleEditItem = async (data: EditItemsMutationVariables) => {
    const now = new Date;
    // formから送られてくる値はstringなため強制上書き
    const is_rental_available = data.is_rental_available as unknown === "TRUE" ? true : false;
    const can_sale = data.can_sale as unknown === "TRUE" ? true : false;
    const next_lending_date = stringToDate(data.next_lending_date);
    const is_recommend = data.is_recommend as unknown === "TRUE" ? true : false;

    try {

      // 画像をfirebasenにuploadしURLを取得
      const imageUrls = files.length > 0 ? await onFirebaseUpload(files, storage) : [];
      
      // 取得したURLをdataに追加
      const images: Images_Insert_Input[] = imageUrls != null ? imageUrls.map((imageUrl) => {
        return {
          url: imageUrl,
          item_id: itemId
        }
      }) : []
      await createImages({variables: {images}})

      console.log({data})
      const payload: EditItemsMutationVariables = {
        id: itemId,
        brand_id: data.brand_id ?? item?.brand?.id,
        can_sale: can_sale ?? item?.can_sale,
        category_id: data.category_id ?? item?.category?.id,
        current_count: data.current_count ?? item?.current_count,
        current_price: data.current_price ?? item?.current_price,
        description: data.description ?? item?.description,
        gender: data.gender ?? item?.gender,
        is_rental_available: is_rental_available ?? item?.is_rental_available,
        name: data.name ?? item?.name,
        next_lending_date: next_lending_date ?? item?.next_lending_date,
        regular_price: data.regular_price ?? item?.regular_price,
        updated_at: now,
        is_recommend
      }
      console.log("payload", payload)
      await editItem({variables: payload})
      setEditMode(false)
      handleItemDelete()
    } catch (error) {
      console.log("edit item failed", error)
      setEditMode(false)
      handleItemDelete()
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
              <form onSubmit={handleSubmit(handleEditItem)}>
                <div>
                  <div>
                    <div className={styles.imageArea}>
                      {item.images != null && item.images.length > 0 ? item.images.map((image, index) => {
                        if(!isValidUrl(image.url)) {
                          return <React.Fragment key={index}></React.Fragment>
                        }
                        return (
                          <div key={index} className={styles.imageContainer}>
                            <Image src={image.url} alt="" width={160} height={200}/>
                            {
                              isEditMode ? (
                                <div>
                                  <div className={styles.deleteImage} onClick={() => onImageDelete(image.id)}>削除</div>
                                </div>
                              ) : (
                                <></>
                              )
                            }
                          </div>
                        )
                      }): <></>}
                    </div>
                    <div className={styles.editImageArea}>
                      {
                        isEditMode ? (
                          <div>
                            <div {...getRootProps({className: `${styles.uploadBox}`})}>
                              <input {...getInputProps()}/>
                              <p>ドラッグ&ドロップで画像を追加</p>
                            </div>
                            <div className={styles.selectedImageArea}>
                            {previewImagePaths.map((imagePath, index) => {
                              return (
                                <div key={index}>
                                  <Image src={imagePath} alt="" width={100} height={100}/>
                                </div>
                              )
                            })}
                          </div>
                          {
                            previewImagePaths.length > 0 ?
                            (
                              <div className={styles.deleteButton}>
                                <button onClick={() => handleItemDelete()}>取り消し</button>
                              </div>
                            ) : (
                              <></>
                            )
                          }
                          
                        </div>
                        ) : (<></>)
                      }
                    </div>
                    <div className={styles.basicInfoArea}>
                      <div className='bg-gray-200'>
                        <table>
                          <caption className='bg-gray-700 text-white pl-2'>基本情報</caption>
                          <tbody>
                            <tr>
                              <th>商品名</th>
                              <td>
                                {isEditMode ? (
                                  <input
                                    {...register('name', { required: '商品名を入力してください' })}
                                    type='text'
                                    placeholder='商品名を入力'
                                    defaultValue={item.name}
                                  />
                                ) : (
                                  <>{item.name}</>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th>説明</th>
                              <td className={styles.description}>
                                {isEditMode ? (
                                  <textarea
                                    {...register('description')}
                                    rows={10}
                                    placeholder='説明を入力'
                                    defaultValue={item.description ?? ""}
                                  />
                                ): (
                                  <>{item.description != null ? escapeDescription(item.description) : ""}</>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th>カテゴリ</th>
                              <td>
                                {isEditMode ? (
                                  <select
                                    {...register('category_id', { required: 'カテゴリを選択してください' })}
                                    defaultValue={categoryList?.find(category => category.id === item.category?.id)?.id}
                                  >
                                    {
                                      categoryList?.map((category, index) => {
                                        return (
                                          <option key={index} value={category.id}>
                                            {category.name}
                                          </option>
                                        )
                                      })
                                    }
                                  </select>
                                ) : (
                                  <>{item.category?.name}</>
                                ) }
                              </td>
                            </tr> 
                            <tr>
                              <th>ブランド</th>
                              <td>
                                {
                                  isEditMode ? (
                                    <select
                                      {...register('brand_id', { required: 'ブランドを選択してください' })}
                                      defaultValue={brandList?.find(brand => brand.id === item.brand?.id)?.id}
                                    >
                                      {
                                        brandList?.map((brand, index) => {
                                          return (
                                            <option key={index} value={brand.id}>
                                              {brand.name}
                                            </option>
                                          )
                                        })
                                      }
                                    </select>
                                  ) : (
                                    <>{item.brand?.name}</>
                                  ) 
                                }
                              </td>
                            </tr> 
                            <tr>
                              <th>性別</th>
                              <td>
                                {
                                  isEditMode ? (
                                    <select
                                      {...register('gender', { required: '性別を選択してください' })}
                                      defaultValue={item.gender}
                                    >
                                      <option value={1}>メンズ</option>
                                      <option value={2}>レディース</option>
                                      <option value={3}>ユニセックス</option>
                                    </select>
                                  ) : (
                                    <>{genderFormat(item.gender)}</>
                                  )
                                }
                              </td>
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
                              <td>
                                {
                                  isEditMode ? (
                                    <>
                                      <input
                                        {...register('regular_price', { required: '定価を入力してください' })}
                                        type='number'
                                        placeholder='ex. 10000'
                                        defaultValue={item.regular_price ?? 0}
                                      />
                                    </>
                                  ) : (
                                    <>{item.regular_price != null ? numberToPrice(item.regular_price) : '定価不明'}</>
                                  )
                                }
                              </td>
                            </tr>
                            <tr>
                              <th>現在価格</th>
                              <td>
                                {
                                  isEditMode ? (
                                    <input
                                      {...register('current_price', { required: '現在価格を入力してください' })}
                                      type='number'
                                      placeholder='ex. 6500'
                                      defaultValue={item.current_price ?? 0}
                                    />
                                  ) : (
                                    <>{item.current_price != null ? numberToPrice(item.current_price!) : '不明'}</>
                                  )
                                }
                              </td>
                            </tr>
                            <tr>
                              <th>貸出回数</th>
                              <td>{`${item.current_count}回目`}</td>
                            </tr>
                            <tr>
                              <th>レンタルステータス</th>
                              <td>
                                {
                                  isEditMode ? (
                                    <select
                                      {...register('is_rental_available')}
                                      defaultValue={item.is_rental_available ? "TRUE" : "FALSE"}
                                    >
                                      <option value={"TRUE"}>レンタル可能</option>
                                      <option value={"FALSE"}>貸出中</option>
                                    </select>
                                  ) : (
                                    <>{item.is_rental_available ? 'レンタル可能' : '貸出中'}</>
                                  )
                                }
                              </td>
                            </tr>
                            <tr>
                              <th>次回貸出可能日</th>
                              <td>
                                {
                                  isEditMode ? (
                                    <input
                                      {...register('next_lending_date')}
                                      type='date'
                                      defaultValue={dafaultDateStr}
                                    />
                                  ) : (
                                    <>{item.next_lending_date ? formatDateYYYYMMDD(item.next_lending_date) : '-'}</>
                                  )
                                }
                              </td>
                            </tr>
                            <tr>
                              <th>販売ステータス</th>
                              <td>
                                {
                                  isEditMode ? (
                                    <select
                                      {...register('can_sale')}
                                      defaultValue={item.can_sale ? "TRUE" : "FALSE"}
                                    >
                                      <option value={"TRUE"}>販売可能</option>
                                      <option value={"FALSE"}>-</option>
                                    </select>
                                  ) : (
                                    <>{item.can_sale ? '販売可能' : '-'}</>
                                  )
                                }
                              </td>
                            </tr>
                            <tr>
                              <th>おすすめフラグ</th>
                              <td>
                                {
                                  isEditMode ? (
                                    <select
                                      {...register('is_recommend')}
                                      defaultValue={item.is_recommend ? "TRUE" : "FALSE"}
                                    >
                                      <option value={"TRUE"}>○</option>
                                      <option value={"FALSE"}>-</option>
                                    </select>
                                  ) : (
                                    <>{item.is_recommend ? '○' : '-'}</>
                                  )
                                }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.buttons}>
                  {isEditMode ? 
                    (
                      <div className={styles.save}>
                        <button type='submit'>保存する</button>
                      </div>
                    ) : (
                      <div className={styles.edit}>
                        <div onClick={() => {setEditMode(true)}}>編集</div>
                      </div>
                    )
                  }
                  <div className={styles.space} />
                  {isEditMode ? 
                    (
                      <div className={styles.editCancel}>
                        <div onClick={() => setEditMode(false)}>キャンセル</div>
                      </div>
                    ) : (
                      <div className={styles.delete}>
                        <button onClick={() => onDelete()}>削除</button>
                      </div>
                    )
                  }
                </div>
              </form>
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
    is_recommend
  }
`

gql`
  mutation EditItems($id: Int!, $brand_id: Int, $can_sale: Boolean, $category_id: Int, $current_count: Int, $current_price: Int, $description: String, $gender: Int, $is_rental_available: Boolean, $name: String, $next_lending_date: timestamptz, $regular_price: Int, $updated_at: timestamptz, $is_recommend: Boolean) {
    update_items_by_pk(pk_columns: {id: $id}, _set: {brand_id: $brand_id, can_sale: $can_sale, category_id: $category_id, current_count: $current_count, current_price: $current_price, description: $description, gender: $gender, is_rental_available: $is_rental_available, name: $name, next_lending_date: $next_lending_date, regular_price: $regular_price, updated_at: $updated_at, is_recommend: $is_recommend}) {
      ...ItemDetail
    }
  }
`

gql`
  mutation InsertImages($images: [images_insert_input!]!) {
    insert_images(objects: $images) {
      returning {
        id
        url
        item_id
      }
    }
  }
`

gql`
  mutation DeleteImage($id: Int!) {
    delete_images_by_pk(id: $id) {
      url
    }
  }
`

ItemDetail.getLayout = getLayout