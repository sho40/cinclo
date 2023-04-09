import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { NextPage } from 'next'
import { FC, useState } from 'react'
import { FirebaseError } from 'firebase/app'
import router from 'next/router'
import { useForm } from 'react-hook-form'
import { LoginForm } from '@/types/loginForm.type'
import { FirebaseAuthProvider } from '@/libs/firebase/utils/auth'
import styles from './signIn.module.scss'

export default function SignIn() {
  const [error, setError] = useState<string  | undefined>(undefined);

  const isValid = async (data: LoginForm) => {

    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, data.email, data.password)
      router.push('/admin')
    } catch (error) {
      if( error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-email') {
          setError('メールアドレスがまちがっています')
        } else if (error.code === 'auth/user-disabled') {
          setError('指定されたメールアドレスのユーザーは無効です')
        } else if (error.code === 'auth/user-not-found') {
          setError('指定されたメールアドレスにユーザーが見つかりません')
        } else if (error.code === 'auth/wrong-password') {
          setError('パスワードがまちがっています')
        }
      }
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>();

  return (
    <>
      <FirebaseAuthProvider>
        <div>
          <h1>Login</h1>
        </div>
        <div className={`mt-4 mb-4 ${styles.form}`}>
          <form onSubmit={handleSubmit(isValid)}>
            <div>
              <label>メールアドレス</label>
              <input 
                {...register('email', { required: 'メールアドレスを入力してください' })}
                placeholder='your@email.com'
                type={'email'}
              />
              <div>{errors.email?.message}</div>
            </div>
            <div>
              <label>パスワード</label>
              <input 
                {...register('password', { required: 'パスワードを入力してください', minLength: { value: 6, message: '6文字以上入力してください' }, })}
                placeholder='Password'
                type={'password'}
              />
              <div>{errors.password?.message}</div>
            </div>
            <div className={`mt-4 ${styles.loginButton}`}>
              <button
                type='submit'
              >
                ログインする
              </button>
            </div>
          </form>
        </div>
        <div >
          <button onClick={() => router.push('/admin/sign-up')}>
            Sign Up
          </button>
        </div>
        <div>{error != null ? <>{error}</> : <></>}</div>
      </FirebaseAuthProvider>
    </>
  )
}