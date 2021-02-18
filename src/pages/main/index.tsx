import React, { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, FormControl, IconButton, Input, InputAdornment, InputLabel, Tab, Tabs } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { Add, Close } from '@material-ui/icons'
import Layout from '~/components/Layout'
import TabPanel from '~/components/TabPanel'
import { Main } from '~/pages/main/styles'
import { DataProps } from '~/types/data'

const Component: React.FC = () => {
  const [whereDidYouWorkList, setWhereDidYouWorkList] = useState<number[]>([0])
  const [data, setData] = useState<Partial<DataProps>>({})
  const [panelIndex, setPanelIndex] = useState<number>(0)
  const theme = useTheme()
  const { register, handleSubmit } = useForm()

  const a11yProps = useCallback(
    (index: number) => ({
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    }),
    []
  )

  const firstPanel = useMemo(() => panelIndex === 0, [panelIndex])

  const lastPanel = useMemo(() => panelIndex === 2, [panelIndex])

  const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: number) => setPanelIndex(newValue), [])

  const handleBack = useCallback(() => setPanelIndex(panelIndex - 1), [panelIndex])

  const handleAddNumberOfFieldsWhereYouWorked = useCallback(
    () => setWhereDidYouWorkList([...whereDidYouWorkList, whereDidYouWorkList.length]),
    [whereDidYouWorkList]
  )

  const handleRemoveNumberOfFieldsWhereYouWorked = useCallback(() => {
    whereDidYouWorkList.pop()

    setWhereDidYouWorkList([...whereDidYouWorkList])
  }, [whereDidYouWorkList])

  const onSubmit = useCallback(
    (values: Partial<DataProps>) => {
      const canMoveForward = !lastPanel

      if (canMoveForward) {
        setPanelIndex(panelIndex + 1)
      }

      setData(Object.assign(data, values))
    },
    [lastPanel, panelIndex, data]
  )

  return (
    <Layout>
      <Main maxWidth="sm">
        <Tabs className="main__tabs" value={panelIndex} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Dados básicos" {...a11yProps(0)} />
          <Tab label="Onde já trabalhou" {...a11yProps(1)} />
          <Tab label="Conhecimentos" {...a11yProps(2)} />
        </Tabs>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TabPanel className="main__tab-panel" value={panelIndex} index={0} dir={theme.direction}>
            <Card className="main__card">
              <FormControl className="main__form-control" required>
                <InputLabel htmlFor="name">Nome completo</InputLabel>
                <Input autoFocus id="name" name="name" inputRef={register({ required: true })} />
              </FormControl>
              <FormControl className="main__form-control" required>
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <Input type="email" id="email" name="email" inputRef={register({ required: true })} />
              </FormControl>
            </Card>
          </TabPanel>
          <TabPanel className="main__tab-panel" value={panelIndex} index={1} dir={theme.direction}>
            <Card className="main__card">
              {whereDidYouWorkList.map((index) => (
                <FormControl key={index} className="main__form-control" required>
                  <InputLabel htmlFor={`whereDidYouWork${index}`}>Onde já trabalhou?</InputLabel>
                  <Input
                    id={`whereDidYouWork${index}`}
                    name={`whereDidYouWork[${index}]`}
                    inputRef={register({ required: true })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          disabled={whereDidYouWorkList.length === 1}
                          aria-label="Remover informação de onde já trabalhou"
                          onClick={handleRemoveNumberOfFieldsWhereYouWorked}
                        >
                          <Close />
                        </IconButton>
                        {whereDidYouWorkList.length - 1 === index && (
                          <IconButton
                            aria-label="Adicionar informação de onde já trabalhou"
                            onClick={handleAddNumberOfFieldsWhereYouWorked}
                          >
                            <Add />
                          </IconButton>
                        )}
                      </InputAdornment>
                    }
                  />
                </FormControl>
              ))}
            </Card>
          </TabPanel>
          <TabPanel className="main__tab-panel" value={panelIndex} index={2} dir={theme.direction}>
            <Card className="main__card">Conhecimentos</Card>
          </TabPanel>
          <div className="main__actions">
            <Button className="main__button" variant="contained" disabled={firstPanel} onClick={handleBack}>
              Anterior
            </Button>
            <Button className="main__button" type="submit" variant="contained" color="primary">
              {lastPanel ? 'Enviar' : 'Próximo'}
            </Button>
          </div>
        </form>
      </Main>
    </Layout>
  )
}

export default Component
