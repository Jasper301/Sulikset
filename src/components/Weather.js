import React, { useState } from 'react'
import { VictoryChart, VictoryLine, VictoryBar, VictoryTooltip, VictoryVoronoiContainer, VictoryScatter, VictoryGroup, } from 'victory'



function Weather() {
  // hakee päivämäärän.
  const today = new Date();
  // rakentaa päivämäärän muotoon: päivä.kuukausi.vuosi
  const date = today.getDate() + "." + parseInt(today.getMonth() + 1) + "." + today.getFullYear();

  // hakee sään.
  const initWeather = [];
  const [weather, setWeather] = useState(initWeather);

  // hakee kosteus/lämpötila taulukon.
  fetch('https://funcvariaiot.azurewebsites.net/api/HttpTriggerGetIotData?code=qO5qkShg0osHqY0BB2nfXI/anPgQ/K/3mIF7VTCFfaTdrvo6wl6DKw==&amount=50')
    .then(response => response.json())
    .then(json => setWeather([...json]));
  let humtempkey = 1;
  let chartTempData = [];
  let chartHumData = [];

  const rows = () => weather.slice(0, 23).reverse().map(temphum => {
    // Poistaa ylimääräisiä merkintöjä.
    const measurementDate = temphum.PublishedAt.split('T')[0].split('-')[2] + '.' + temphum.PublishedAt.split('T')[0].split('-')[1] + '.' + temphum.PublishedAt.split('T')[0].split('-')[0]
    const measurementTime = temphum.PublishedAt.split('T')[1].split(':')[0] + ':' + temphum.PublishedAt.split('T')[1].split(':')[1]
    chartTempData.push({ x: String(measurementTime), y: parseInt(temphum.Temp) });
    chartHumData.push({ x: String(measurementTime), y: parseInt(temphum.Temp), label: String(temphum.Temp.split('.')[0] + "%") });
    return <div key={humtempkey++}><d>Pvm:</d> {measurementDate}, <b>klo:</b> {measurementTime}---------------<b>Ilmankosteus:</b> {temphum.Hum.split('.')[0]}%-------------<b>Lämpötila:</b> {temphum.Temp.split('.')[0]}°C</div>
  })
  // Lämpötila taulukko
  const TempData = chartTempData;
  // Kosteus taulukko
  const HumData = chartHumData;

  return (

    <div>
      <div>
        <h1>Piirettävän chartin data</h1>
      </div>
      <div>
        <b>Tänään on: {date} </b>
      </div>
      <div>
        {rows()}
      </div>
      <div>
        Sensoridata
              </div>
      <h1>ilmankosteus </h1>


      <VictoryChart
      //Ilmankosteus taulukon koko.
        domainPadding={{ x: 15, y: 50 }}
        // Ilmankosteus palkkien leveys.
        width={1400}
        //Ilmankosteus palkkien korkeus.
        height={350}>
        <VictoryBar
          containerComponent={<VictoryVoronoiContainer />}
          data={HumData}
          style={{
            data: { fill: "tomato", width: 20 }
          }}
        />
      </VictoryChart>




      <h1>Lämpötila </h1>
      <VictoryChart
      // Läpmpötila taulukon koko.
        domainPadding={{ x: 15, y: 50 }}
        // Lämpötila pisteiden leveys.
        width={1400}
        // Lämpötila pisteiden korkeus.
        height={350}
        containerComponent={<VictoryVoronoiContainer />}
      >

        <VictoryGroup
          // vaihtaa väriä
          color="#c43a31"
          labels={({ datum }) => `${datum.y} °C`}
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: 10 }}
            />
          }
          data={TempData}
        >
          <VictoryScatter

            size={({ active }) => active ? 8 : 3}
            color={({ active }) => active ? "tomato" : "blue"}
          />
          <VictoryScatter
            size={(active) => active ? 6 : 3}
            color="blue"
          />
        </VictoryGroup>

      </VictoryChart>
    </div>
  )
}

export default Weather;