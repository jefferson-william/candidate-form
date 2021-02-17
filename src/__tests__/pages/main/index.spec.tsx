import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import Routers from '~/routers'
import { store } from '~/store'

describe('pages/main', () => {
  it('render page', () => {
    const history = createMemoryHistory({
      initialEntries: ['/'],
    })

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Routers history={history} />
        </Provider>
      </MemoryRouter>
    )

    act(() => {
      expect(history.location.pathname).toBe('/')
    })
  })
})
