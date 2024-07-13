import React from 'react'
import ReactDOM from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorPage } from '@/components/ErrorPage'

import App from './App'

import './styles/_index.scss'

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)
