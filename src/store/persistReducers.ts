import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default (reducers: any) => {
  const persistedReducer = persistReducer(
    {
      key: 'candidate-form',
      whitelist: [],
      storage,
    },
    reducers
  )

  return persistedReducer
}
