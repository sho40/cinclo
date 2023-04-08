import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'
import { NextPage } from 'next'
import { FC } from 'react'
import { FirebaseError } from 'firebase/app'
import router from 'next/router'
import { useForm } from 'react-hook-form'
import { LoginForm } from '@/types/loginForm.type'
import { FirebaseAuthProvider } from '@/libs/firebase/utils/auth'

export default function SignUp() {
  const isValid = async (data: LoginForm) => {
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      updateProfile(userCredential.user, {
        displayName: data.username
      });
      await sendEmailVerification(userCredential.user);
      router.push('/admin')
    } catch (error) {
      if (error instanceof FirebaseError) {

        // TODO エラーハンドリング
        console.log(error);
      }
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  return (
    <>
      <FirebaseAuthProvider>
        <div>Login</div>
        <form onSubmit={handleSubmit(isValid)}>
          <div>
            <label>ユーザー名</label>
            <input
              {...register('username', { required: 'ユーザー名を入力してください' })}
              placeholder='ユーザー名'
              type='text'
            />
            <div>{errors.username?.message}</div>
          </div>
          <div>
            <label>メールアドレス</label>
            <input
              {...register('email', { required: 'メールアドレスを入力してください' })}
              placeholder='your@email.com'
              type='email'
            />
            <div>{errors.password?.message}</div>
          </div>
          <div>
            <label>パスワード</label>
            <input
              {...register('password', { required: 'パスワードを入力してください', minLength: {value: 6, message: '6文字以上入力してください'} })}
              placeholder='パスワード'
              type='password'
            />
            <div>{errors.password?.message}</div>
          </div>
          <div>
            <button type='submit'>
              サインアップ
            </button>
          </div>
        </form>
        <button onClick={() => router.push('/admin/sign-in')}>
          LogIn
        </button>
      </FirebaseAuthProvider>
    </>
  )
}
