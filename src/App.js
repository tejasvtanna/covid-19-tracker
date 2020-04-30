import React, { useEffect, useState } from 'react'
import './App.css'
import { Card, CardDeck } from 'react-bootstrap'
import { Form, Row, Col } from 'react-bootstrap'
import Columns from 'react-columns'
import axios from 'axios'

const App = () => {
   const [summary, setSummary] = useState([])
   const [countryData, setcountryData] = useState([])
   const [inputCountry, setInputCountry] = useState('')
   const [inputContinent, setInputContinent] = useState('')

   // useEffect(() => {
   //    axios
   //       .get('https://corona.lmao.ninja/v2/all')
   //       .then((res) => setSummary(res.data))
   //       .catch((err) => console.log(err))
   // }, [])

   useEffect(() => {
      async function fetchData() {
         const res = await axios.get('https://corona.lmao.ninja/v2/all')
         setSummary(res.data)
      }

      async function fetchCountryData() {
         const res = await axios.get(
            `https://corona.lmao.ninja/v2/countries/${inputCountry}`
         )
         setcountryData(res.data)
      }

      // alert()
      fetchData()
      fetchCountryData()
   }, [])

   function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
   }

   // console.log('Summary', summary)
   const date = new Date(parseInt(summary.updated))
   const lastUpdated =
      date.toLocaleDateString() + ' ' + date.toLocaleTimeString()

   let filteredCountries = countryData.filter((d) => {
      if (inputCountry === '') return true
      else return d.country.toUpperCase().includes(inputCountry)
   })

   filteredCountries = filteredCountries.filter((d) => {
      if (inputContinent === '') return true
      else return d.continent.toUpperCase().includes(inputContinent)
   })

   // filteredCountries = filteredCountries.sort
   filteredCountries.sort((a, b) =>
      a.deaths > b.deaths ? 1 : b.deaths > a.deaths ? -1 : 0
   )

   const countryCards = filteredCountries.map((data, idx) => (
   <Card
         key={idx}
         bg='light'
         text='dark'
         className='text-center'
         style={{ margin: '10px' }}
      >
         <Card.Header>{data.country}</Card.Header>
         <Card.Img src={data.countryInfo.flag} variant='top'></Card.Img>
         <Card.Body>
            <Card.Text>
               <b>Total Cases:</b> {data.cases}
            </Card.Text>
            <Card.Text>
               <b>Today's Cases:</b> {data.todayCases}
            </Card.Text>
            <Card.Text>
               <b>Deaths Cases:</b> {data.deaths}
            </Card.Text>
            <Card.Text>
               <b>Recovered Cases:</b> {data.recovered}
            </Card.Text>
            <Card.Text>
               <b>Active:</b> {data.active}
            </Card.Text>
            <Card.Text>
               <b>Critical:</b> {data.critical}
            </Card.Text>
            <Card.Text>
               <b>Continent:</b> {data.continent}
            </Card.Text>
            <Card.Text>
               <b>Recovery Rate:</b>{' '}
               {((data.recovered / data.cases) * 100).toFixed(2)}%
            </Card.Text>
            <Card.Text>
               <b>Death Rate:</b>{' '}
               {((data.deaths / data.cases) * 100).toFixed(2)}%
            </Card.Text>
         </Card.Body>
      </Card>
   ))

   var queries = [
      {
         columns: 1,
         query: 'min-width: 250px',
      },
      {
         columns: 2,
         query: 'min-width: 600px',
      },
      {
         columns: 3,
         query: 'min-width: 1000px',
      },
   ]

   return (
      <div>
         <br />
         <h2 style={{ textAlign: 'center' }}>Covid-19 Live Stats!!</h2>
         <br />

         <CardDeck>
            <Card
               bg='secondary'
               text='white'
               className='text-center'
               style={{ margin: '10px' }}
            >
               <Card.Body>
                  <Card.Title>Cases</Card.Title>
                  <Card.Text>{summary.cases}</Card.Text>
               </Card.Body>
               <Card.Footer>
                  <small>Last updated : {lastUpdated}</small>
               </Card.Footer>
            </Card>
            <Card
               bg='danger'
               text='white'
               className='text-center'
               style={{ margin: '10px' }}
            >
               <Card.Body>
                  <Card.Title>Deaths</Card.Title>
                  <Card.Text>{summary.deaths}</Card.Text>
               </Card.Body>
               <Card.Footer>
                  <small>Last updated : {lastUpdated}</small>
               </Card.Footer>
            </Card>
            <Card
               bg='success'
               text='white'
               className='text-center'
               style={{ margin: '10px' }}
            >
               <Card.Body>
                  <Card.Title>Recovered</Card.Title>
                  <Card.Text>{summary.recovered}</Card.Text>
               </Card.Body>
               <Card.Footer>
                  <small>Last updated : {lastUpdated}</small>
               </Card.Footer>
            </Card>
         </CardDeck>
         <br />
         <br />
         <Form>
            <Row>
               <Col>
                  <Form.Control
                     column
                     sm='6'
                     type='text'
                     onChange={(e) =>
                        setInputCountry(e.target.value.toUpperCase())
                     }
                     placeholder='Search a Country'
                  ></Form.Control>
               </Col>
               <Col>
                  <Form.Control
                     column
                     sm='6'
                     type='text'
                     onChange={(e) =>
                        setInputContinent(e.target.value.toUpperCase())
                     }
                     placeholder='Search a Continent'
                  ></Form.Control>
               </Col>
            </Row>
         </Form>

         {countryData.length > 0 && (
            <Columns queries={queries}>{countryCards}</Columns>
         )}
      </div>
   )
}

export default App
