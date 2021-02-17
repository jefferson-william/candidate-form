import React from 'react'
import Header from '~/components/Header'
import { Layout } from './styles'

const Component: React.FC = ({ children }) => (
  <Layout className="layout">
    <Header />
    {children}
  </Layout>
)

export default Component
