import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from "firebase/storage";

const uploadFile = async (file: File, storage: FirebaseStorage, ) => {
  const storageRef = ref(storage, process.env.NEXT_PUBLIC_STORAGE_ROOT_PATH);

  try {
    const uploadRef = ref(storageRef, file.name);
    await uploadBytes(uploadRef, file)
    const url = await getDownloadURL(uploadRef)
    return url
  } catch (error: any) {
    console.log("upload failed >>>", error)

    // @see https://firebase.google.com/docs/storage/web/handle-errors?hl=ja#handle_error_messages
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        console.error('許可がありません');
        break;

      case 'storage/canceled':
        console.error('アップロードがキャンセルされました');
        // User canceled the upload
        break;

      case 'storage/unknown':
        console.error('予期せぬエラーが発生しました');
        // Unknown error occurred, inspect error.serverResponse
      break;
    }
  }
}

export const onFirebaseUpload = async (files: File[], storage: FirebaseStorage) => {

  const imageUrls: string[] = [];

  // storageがundefinedになるケールがあるので存在チェック
  if (storage != null) {
    try {
      for(const file of files) {
        const url = await uploadFile(file, storage);
        if (url != null) {
          imageUrls.push(url)
        }
      }
      return imageUrls;
      
    } catch(error: any) {
      console.log("upload failed >>>", error)
    }
  } else {
    console.log("storage is not found")
    return undefined
  }
}