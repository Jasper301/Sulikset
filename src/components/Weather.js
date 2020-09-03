import React from 'react'
import { VictoryChart, VictoryLine, VictoryBar } from 'victory'


function Weather() {

    const data = [    
        { quarter: "1.1", earnings: 60 },
        { quarter: "2.1", earnings: 50 },
        { quarter: "3.1", earnings: 30 },
        { quarter: 4.1, earnings: 20 }
    ];


    return (
        <div>
            <h1>ilmankosteus </h1>
            

            <VictoryChart
            domainPadding={{ x: 50, y: 5  }}
            width={700}
            height={200}>
                <VictoryBar
                    data={data}
                    x="quarter"
                    y="earnings"
                />
            </VictoryChart>
            


        
         <h1>Lämpötila </h1>
        <VictoryChart
            domainPadding={{ x: 30, y: 10 }}
            width={1400}
            height={250}>

            <VictoryLine
                data={[
                    { experiment: "1.1.", actual: -10 },
                    { experiment: "2.1.", actual: -5 },
                    { experiment: "3.1.", actual: 0 },
                    { experiment: "4.1.", actual: 5 },
                    { experiment: "5.1.", actual: 10 },
                    { experiment: "6.1.", actual: 15 }
                ]}
                style={{
                    data:
                        { stroke: "green", strokeWidth: 1 }
                }}
                x="experiment"
                y="actual"

            />

        </VictoryChart>
        </div>    
    )
}

export default Weather;