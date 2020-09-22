import React, { useState } from 'react'
import { VictoryChart, VictoryLine, VictoryBar, VictoryTooltip, VictoryVoronoiContainer, VictoryScatter, VictoryGroup, } from 'victory'



function Weather() {

  const today = new Date();
  const date = today.getDate() + "." + parseInt(today.getMonth() + 1) + "." + today.getFullYear();

  const initWeather = [];
  const [weather, setWeather] = useState(initWeather);

  fetch('https://funcvariaiot.azurewebsites.net/api/HttpTriggerGetIotData?code=qO5qkShg0osHqY0BB2nfXI/anPgQ/K/3mIF7VTCFfaTdrvo6wl6DKw==&amount=50')
    .then(response => response.json())
    .then(json => setWeather([...json]));
  let humtempkey = 1;
  let chartTempData = [];
  let chartHumData = [];

  const rows = () => weather.slice(0, 23).reverse().map(temphum => {
    const measurementDate = temphum.PublishedAt.split('T')[0].split('-')[2] + '.' + temphum.PublishedAt.split('T')[0].split('-')[1] + '.' + temphum.PublishedAt.split('T')[0].split('-')[0]
    const measurementTime = temphum.PublishedAt.split('T')[1].split(':')[0] + ':' + temphum.PublishedAt.split('T')[1].split(':')[1]
    chartTempData.push({ x: String(measurementTime), y: parseInt(temphum.Temp) });
    chartHumData.push({ x: String(measurementTime), y: parseInt(temphum.Temp), label: String(temphum.Temp.split('.')[0] + "%") });
    return <div key={humtempkey++}><d>Pvm:</d> {measurementDate}, <b>klo:</b> {measurementTime}---------------<b>Ilmankosteus:</b> {temphum.Hum.split('.')[0]}%-------------<b>Lämpötila:</b> {temphum.Temp.split('.')[0]}°C</div>
  })
  const TempData = chartTempData;
  //const TempData = [{ experiment: "1.1.", actual: -10 },
  //{ experiment: "2.1.", actual: -5 },
  //{ experiment: "3.1.", actual: 0 },
  // { experiment: "4.1.", actual: 5 },
  //{ experiment: "5.1.", actual: 5 }];

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
        domainPadding={{ x: 15, y: 50 }}
        width={1400}
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
        domainPadding={{ x: 15, y: 50 }}
        width={1400}
        height={350}
        containerComponent={<VictoryVoronoiContainer />}
      >

        <VictoryGroup
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