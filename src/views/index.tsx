import '@ant-design/v5-patch-for-react-19'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { TasksListForm } from '../components/TasksListForm'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { customTheme } from '../theme'

const container = document.getElementById('root')
if (!container) throw new Error('#root element not found')
const root: ReactDOM.Root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ConfigProvider theme={customTheme}>
      <Provider store={store}>
        <TasksListForm />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
)
