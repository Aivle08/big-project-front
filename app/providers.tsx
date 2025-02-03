'use client'

import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import { initializeAuth } from './redux/features/authSlice'

export function Providers({ children }: { children: React.ReactNode }) {
  // 초기화 함수를 컴포넌트 외부에서 한 번만 호출
  const initAuth = () => {
    store.dispatch(initializeAuth())
  }

  useEffect(() => {
    initAuth()
  }, []) // 빈 의존성 배열 유지
  return <Provider store={store}>{children}</Provider>
}