import styled from 'styled-components'
import { Paper } from '@material-ui/core'

export const Header = styled(Paper)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 66px;
  .header__logo {
    max-width: 83px;
    height: 13px;
  }
`
