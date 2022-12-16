import { createContext, useContext, useEffect, useMemo, useState, useReducer } from 'react';
import { AppReducer, initialState } from './AppReducer';

export const AppContext  = createContext(null);

export function AppWrapper({ children }: React.PropsWithChildren<{}>): any {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const sharedState = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('mg-items') as string)) {
      dispatch({
        type: "load_items",
        value: JSON.parse(localStorage.getItem('mg-items') as string)
      })
    }
  }, [])

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem('mg-items', JSON.stringify(state))
    }
  }, [state])

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}