import React, { useCallback, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { Button, Card, FormControl, Input, InputLabel, Tab, Tabs } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import Layout from '~/components/Layout'
import TabPanel from '~/components/TabPanel'
import { Main } from '~/pages/main/styles'

const Component: React.FC = () => {
  const [panelIndex, setPanelIndex] = useState(0)
  const theme = useTheme()

  const a11yProps = useCallback(
    (index: number) => ({
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    }),
    []
  )

  const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: number) => setPanelIndex(newValue), [])

  const handleChangeIndex = useCallback((newValue: number) => setPanelIndex(newValue), [])

  const handleBack = useCallback(() => setPanelIndex(panelIndex - 1), [panelIndex])

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()

      const lastPanel = panelIndex === 2
      const canMoveForward = !lastPanel

      if (canMoveForward) setPanelIndex(panelIndex + 1)
    },
    [panelIndex]
  )

  return (
    <Layout>
      <Main maxWidth="sm">
        <Tabs className="main__tabs" value={panelIndex} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Dados básicos" {...a11yProps(0)} />
          <Tab label="Onde já trabalhou" {...a11yProps(1)} />
          <Tab label="Conhecimentos" {...a11yProps(2)} />
        </Tabs>
        <form onSubmit={handleSubmit}>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={panelIndex}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel className="main__tab-panel" value={panelIndex} index={0} dir={theme.direction}>
              <Card className="main__card">
                <FormControl className="main__form-control" required>
                  <InputLabel htmlFor="name">Nome completo</InputLabel>
                  <Input autoFocus id="name" />
                </FormControl>
                <FormControl className="main__form-control" required>
                  <InputLabel htmlFor="email">E-mail</InputLabel>
                  <Input type="email" id="email" />
                </FormControl>
              </Card>
            </TabPanel>
            <TabPanel className="main__tab-panel" value={panelIndex} index={1} dir={theme.direction}>
              <Card className="main__card">Onde já trabalhou</Card>
            </TabPanel>
            <TabPanel className="main__tab-panel" value={panelIndex} index={2} dir={theme.direction}>
              <Card className="main__card">Conhecimentos</Card>
            </TabPanel>
          </SwipeableViews>
          <div className="main__actions">
            <Button className="main__button" variant="contained" disabled={panelIndex === 0} onClick={handleBack}>
              Anterior
            </Button>
            <Button className="main__button" type="submit" variant="contained" color="primary">
              {panelIndex < 2 ? 'Próximo' : 'Enviar'}
            </Button>
          </div>
        </form>
      </Main>
    </Layout>
  )
}

export default Component
