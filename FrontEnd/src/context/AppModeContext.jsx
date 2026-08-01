import { useEffect, useState } from 'react'
import { AppModeContext } from './appModeContextCore'

const MODE_STORAGE_KEY = 'stayvia-role-mode'

function getInitialMode() {
  if (typeof window === 'undefined') {
    return 'traveler'
  }

  const storedMode = window.localStorage.getItem(MODE_STORAGE_KEY)
  return storedMode === 'host' ? 'host' : 'traveler'
}

export function AppModeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode)

  useEffect(() => {
    window.localStorage.setItem(MODE_STORAGE_KEY, mode)
  }, [mode])

  const toggleMode = () => {
    setMode((currentMode) => (currentMode === 'host' ? 'traveler' : 'host'))
  }

  return <AppModeContext.Provider value={{ mode, isHost: mode === 'host', setMode, toggleMode }}>{children}</AppModeContext.Provider>
}
