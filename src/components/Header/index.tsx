import React from 'react'
import { Container } from '@material-ui/core'
import Logo from '~/assets/images/logo-intera.png'
import { Header } from './styles'

const Component: React.FC = () => (
  <Header className="header" elevation={4}>
    <Container>
      <img className="header__logo" src={Logo} alt="Logo Intera" />
    </Container>
  </Header>
)

export default Component
