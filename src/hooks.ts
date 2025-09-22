import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState, store } from './store/store'
import { useDispatch } from 'react-redux'

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
