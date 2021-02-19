import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
// eslint-disable-next-line
import { LinkedIn } from 'react-linkedin-login-oauth2'
import linkedinImage from 'react-linkedin-login-oauth2/assets/linkedin.png'
import { Button, Card, FormControl, Input, InputLabel, Tab, Tabs, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import axios from 'axios'
import AddInformationFields from '~/components/AddInformationFields'
import Layout from '~/components/Layout'
import TabPanel from '~/components/TabPanel'
import { Main } from '~/pages/main/styles'
import { DataProps } from '~/types/data'
import { LinkedinSuccessAccessTokenProps, LinkedinSuccessAuthorizationTokenProps } from '~/types/data/LinkedIn'

const Component: React.FC = () => {
  const [linkedinAuthorizationToken, setLinkedinAuthorizationToken] = useState<string>('')
  const [linkedinAccessToken, setLinkedinAccessToken] = useState<string>('')
  const [knowledgeList, setKnowledgeList] = useState<number[]>([0])
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

  const handleLinkedinSuccess = useCallback(
    async ({ code }: LinkedinSuccessAuthorizationTokenProps) => {
      setLinkedinAuthorizationToken(code)

      const responseAuthorizationToken = await axios.post<LinkedinSuccessAccessTokenProps>(
        process.env.REACT_APP_LINKEDIN_API_ACCESS_TOKEN as string,
        {
          code,
          grant_type: 'authorization_code',
          redirect_uri: `${process.env.REACT_APP_URL}/linkedin`,
          client_id: process.env.REACT_APP_LINKEDIN_CLIENT_ID,
          client_secret: process.env.REACT_APP_LINKEDIN_CLIENT_SECRET,
        }
      )

      setLinkedinAccessToken(code)

      const responseAccessToken = await axios.get(process.env.REACT_APP_LINKEDIN_API_ME as string, {
        headers: { Authorization: `Bearer ${code}` },
      })

      const values = {
        responseAuthorizationToken,
        responseAccessToken,
      }

      // eslint-disable-next-line
      console.log(0, values)
    },
    [linkedinAuthorizationToken, linkedinAccessToken]
  )

  const handleLinkedinFailure = useCallback(() => setLinkedinAuthorizationToken(''), [])

  useEffect(() => {
    // eslint-disable-next-line
    console.log(0, process.env)
    // eslint-disable-next-line
    console.log(1, process.env.REACT_APP_LINKEDIN_CLIENT_ID)
    // eslint-disable-next-line
    console.log(2, process.env.REACT_APP_LINKEDIN_CLIENT_SCOPE)
    // eslint-disable-next-line
    console.log(3, process.env.REACT_APP_LINKEDIN_API_ACCESS_TOKEN)
    // eslint-disable-next-line
    console.log(4, process.env.REACT_APP_LINKEDIN_CLIENT_SECRET)
  }, [])

  return (
    <Layout>
      <Main maxWidth="sm">
        <Tabs className="main__tabs" value={panelIndex} onChange={handleChange} aria-label="Perguntas">
          <Tab label="Dados básicos" {...a11yProps(0)} />
          <Tab label="Onde já trabalhou" {...a11yProps(1)} />
          <Tab label="Conhecimentos" {...a11yProps(2)} />
        </Tabs>
        <div className="main__linkedin-area">
          <Typography className="main__linkedin-text" variant="caption">
            Click para preencher automaticamente
          </Typography>
          <LinkedIn
            clientId={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
            onSuccess={handleLinkedinSuccess}
            onFailure={handleLinkedinFailure}
            redirectUri={`${process.env.REACT_APP_URL}/linkedin`}
            scope={process.env.REACT_APP_LINKEDIN_CLIENT_SCOPE}
          >
            <img src={linkedinImage} alt="Log in with Linked In" style={{ maxWidth: '180px' }} />
          </LinkedIn>
        </div>
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
              <AddInformationFields
                list={whereDidYouWorkList}
                setList={setWhereDidYouWorkList}
                name="whereDidYouWork"
                text="Onde já trabalhou?"
                formControlClass="main__form-control"
                register={register}
              />
            </Card>
          </TabPanel>
          <TabPanel className="main__tab-panel" value={panelIndex} index={2} dir={theme.direction}>
            <Card className="main__card">
              <AddInformationFields
                list={knowledgeList}
                setList={setKnowledgeList}
                name="knowledge"
                text="Conhecimentos"
                formControlClass="main__form-control"
                register={register}
              />
            </Card>
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
