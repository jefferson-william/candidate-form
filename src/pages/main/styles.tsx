import styled from 'styled-components'
import { Container } from '@material-ui/core'

export const Main = styled(Container)`
  width: auto;
  margin-top: 48px;
  .main {
    &__tabs {
      margin-bottom: 48px;
    }
    &__tab-panel {
      margin: 2px;
    }
    &__card {
      display: flex;
      flex-direction: column;
      padding: 48px;
    }
    &__form-control:not(:first-child) {
      margin-top: 32px;
    }
    &__actions {
      display: flex;
      justify-content: center;
      margin-top: 48px;
    }
    &__button:not(:first-child) {
      margin-left: 16px;
    }
    &__linkedin-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 48px;
    }
    &__linkedin-text {
      margin-bottom: 16px;
    }
  }
`
