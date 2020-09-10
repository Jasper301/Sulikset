import React from 'react'
import { VictoryChart, VictoryLine, VictoryBar,VictoryTooltip, VictoryVoronoiContainer, VictoryScatter, CustomTooltip, } from 'victory'



function Weather() {

    const data = [    
        { quarter: "1.1", earnings: 60},
        { quarter: "2.1", earnings: 50 },
        { quarter: "3.1", earnings: 30 },
        { quarter: "4.1", earnings: 20 },
        { quarter: "5.1", earnings: 10 },
        { quarter: "6.1", earnings: 5 }
    
    ];
    

    return (
        
        <div>
            <h1>ilmankosteus </h1>
            

            <VictoryChart
           domain={{ x: [10, 50], y: [10, 50] }}
           domainPadding={{ x: 50, y: 5  }}
            width={1000}
            height={200}>
                <VictoryBar
                    containerComponent={<VictoryVoronoiContainer/>}
                   data={[
                    {x: 10, y: 10, label: "10%"},
                    {x: 15, y: 15, label: "15%"},
                    {x: 20, y: 20, label: "20%"},
                    {x: 25, y: 25, label: "25%"},
                    {x: 30, y: 30, label: "30%"},
                    {x: 35, y: 35, label: "35%"},
                    {x: 40, y: 40, label: "40%"},
                    {x: 45, y: 45, label: "45%"},
                    {x: 50, y: 50, label: "50%"},
                    

                   ]}
                   style={{
                     data: {fill: "tomato", width: 20}
                   }}
                />
            </VictoryChart>
            


        
         <h1>Lämpötila </h1>
        <VictoryChart
            domainPadding={{ x: 30, y: 10 }}
            width={1400}
            height={250}
             domain={{x: [0, 5], y: [-5, 5]}}
            containerComponent={<VictoryVoronoiContainer/>}
            >
                <VictoryScatter
    style={{
      data: {fill: "tomato"}, labels: {fill: "tomato"}
    }}
    size={({ active }) => active ? 5 : 3}
    labels={({ datum }) => datum.y}
    labelComponent={<VictoryTooltip/>}
    data={[
      {x: 1}, 
      {x: 2},  
      {x: 5},  
      {x: 4}, 
    ]}
  />
  <VictoryScatter
    style={{
      data: {fill: "blue"}, labels: {fill: "blue"}
    }}
    size={(datum, active) => active ? 5 : 3}
    labels={({ datum }) => datum.y}
    labelComponent={<VictoryTooltip/>}
    data={[
      {x: 1, y: -3},
      {x: 2, y: -2},
      {x: 3, y: -1},
      {x: 4, y: 0},
      {x: 5, y: 5}
    ]}
  />
 
            <VictoryLine
                data={[
                    { experiment: "1.1.", actual: -10 },
                    { experiment: "2.1.", actual: -5 },
                    { experiment: "3.1.", actual: 0 },
                    { experiment: "4.1.", actual: 5 },
                    { experiment: "5.1.", actual: 5 }
                     
                ]}
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