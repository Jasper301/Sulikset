import React, { useState } from 'react'
import { VictoryChart, VictoryLine, VictoryBar, VictoryTooltip, VictoryVoronoiContainer, VictoryScatter, } from 'victory'



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
    chartTempData.push({ experiment: String(measurementTime), actual: parseInt(temphum.Temp) });
    //HumData.push ({ : String(measurementTime), label: parseInt(temphum.Temp)})
    return <div key={humtempkey++}><d>Pvm:</d> {measurementDate}, <b>klo:</b> {measurementTime}---------------<b>Ilmankosteus:</b> {temphum.Hum.split('.')[0]}%-------------<b>Lämpötila:</b> {temphum.Temp.split('.')[0]}°C</div>
  })
  const TempData = chartTempData;
  //const TempData = [{ experiment: "1.1.", actual: -10 },
  //{ experiment: "2.1.", actual: -5 },
  //{ experiment: "3.1.", actual: 0 },
 // { experiment: "4.1.", actual: 5 },
  //{ experiment: "5.1.", actual: 5 }];

  const HumData = [{ x: 10, y: 10, label: "10%" },
  { x: 15, y: 15, label: "15%" },
  { x: 20, y: 20, label: "20%" },
  { x: 25, y: 25, label: "25%" },
  { x: 30, y: 30, label: "30%" },
  { x: 35, y: 35, label: "35%" },
  { x: 40, y: 40, label: "40%" },
  { x: 45, y: 45, label: "45%" },
  { x: 50, y: 50, label: "50%" }];


  console.log(chartTempData);
  const showTemperature = chartTempData;
  const showhumidity = chartHumData;

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
        domain={{ x: [10, 50], y: [10, 50] }}
        domainPadding={{ x: 50, y: 5 }}
        width={1000}
        height={200}>
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
        domainPadding={{ x: 30, y: 10 }}
        width={1400}
        height={250}
        domain={{ x: [0, 5], y: [-5, 5] }}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryScatter
          style={{
            data: { fill: "tomato" }, labels: { fill: "tomato" }
          }}
          size={({ active }) => active ? 5 : 3}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryTooltip />}
          
          
        />
        <VictoryScatter
          style={{
            data: { fill: "blue" }, labels: { fill: "blue" }
          }}
          size={(datum, active) => active ? 5 : 3}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryTooltip />}
          
        />

        <VictoryLine
          data={TempData}
          style={{
            data:
              { stroke: "green", strokeWidth: 0 }
          }}
          x="experiment"
          y="actual"


        />

      </VictoryChart>



    </div>
  )
}

export default Weather;