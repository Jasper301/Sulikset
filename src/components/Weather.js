import React, { useState } from 'react'
import { VictoryChart, VictoryBar, VictoryTooltip, VictoryVoronoiContainer, VictoryScatter, VictoryGroup, } from 'victory'



function Weather() {
 
 function convertUTCDateToLocalDate(date){
   new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
   return date;
 }
 
  // hakee päivämäärän.
  const today = new Date();
  // rakentaa päivämäärän muotoon: päivä.kuukausi.vuosi
  const date = today.getDate() + "." + parseInt(today.getMonth() + 1) + "." + today.getFullYear();

  // asettaa säätietojen tilan.
  const initWeather = [];
  const [weather, setWeather] = useState(initWeather);

  // hakee kosteus/lämpötila datanjason muodossa REST API rajapinnasta.
  fetch('https://funcvariaiot.azurewebsites.net/api/HttpTriggerGetIotData?code=qO5qkShg0osHqY0BB2nfXI/anPgQ/K/3mIF7VTCFfaTdrvo6wl6DKw==&amount=50')
    .then(response => response.json())
    .then(json => setWeather([...json]));

  let humtempkey = 1;
  let chartTempData = [];
  let chartHumData = [];

  const rows = () => weather.slice(0, 23).reverse().map(temphum => {
    // loop joka parseroi rajapinnasta saatuja tietoja victorychartin vaatimaan muotoon.
    const fixedTime = String(convertUTCDateToLocalDate(new Date(temphum.PublishedAt)));
    const measurementDate = temphum.PublishedAt.split('T')[0].split('-')[2] + '.' + temphum.PublishedAt.split('T')[0].split('-')[1] + '.' + temphum.PublishedAt.split('T')[0].split('-')[0]
    //const measurementTime = temphum.PublishedAt.split('T')[1].split(':')[0] + ':' + temphum.PublishedAt.split('T')[1].split(':')[1]
    const time = fixedTime.split(' ')[4].split(':')[0] + ":" + fixedTime.split(' ')[4].split(':')[1]
    chartTempData.push({ x: String(time), y: parseInt(temphum.Temp) });
    chartHumData.push({ x: String(time), y: parseInt(temphum.Temp), label: String(temphum.Temp.split('.')[0] + "%") });
    return <div key={humtempkey++}><b>Pvm:</b> {measurementDate}, <b>klo:</b> {time}---------------<b>Ilmankosteus:</b> {temphum.Hum.split('.')[0]}%-------------<b>Lämpötila:</b> {temphum.Temp.split('.')[0]}°C</div>
  })
  // Lämpötila data victorychartin vaatimassa muodossa
  const TempData = chartTempData;
  // Kosteus data victorychartin vaatimassa muodossa.
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
        // Ilmankosteus taulukon leveys.
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
        // Lämpötila taulukon leveys.
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