import { useContext } from 'react'
import { AppModeContext } from '../context/appModeContextCore'

export function useAppMode() {
  const context = useContext(AppModeContext)

  if (!context) {
    throw new Error('useAppMode must be used within AppModeProvider')
  }

  return context
}