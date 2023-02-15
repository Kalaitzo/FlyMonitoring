import { type Handlers } from "$fresh/server.ts";
import { renderChart } from "$fresh_charts/mod.ts"
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";
import db from "../model/mongodb.ts";
import TemperatureSensor from "../model/schemas/TemperatureSensor.ts";

export const handler: Handlers = {
    async GET() {
        // Get the last 10 temperature readings then render them if the user is authenticated
        const temperatures = db.collection<TemperatureSensor>('TemperatureSensor')
        const lastTenTemperatures = await temperatures.aggregate([{ $sort: { _id: -1 } }, { $limit: 10 }])

        const arr: Array<number> = [];
        lastTenTemperatures.map((item)=>{
            // console.log(item.value.split('%')[0].slice(1,))
            arr.push(+item.value.split('%')[0].slice(1,))
        })

        return renderChart({
            type: "line",
            data: {
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                datasets: [{
                    label: "Temperatures",
                    data: arr.reverse(),
                    borderColor: ChartColors.Blue,
                    backgroundColor: transparentize(ChartColors.Blue, 0.5),
                    borderWidth: 1,
                },],
            },
            options: {
                devicePixelRatio: 1,
                scales: {
                    x: {
                        ticks: {
                            major: { enable:true },
                            beginAtZero: false ,
                            color:'white',
                        },
                        grid:{
                            color:'#5C7EB5',
                            display: false
                        },
                        title: {
                            display: false,
                        }
                    },
                    y: {
                        ticks: {
                            major: { enable:true },
                            beginAtZero: false ,
                            color:'white'
                        },
                        grid:{
                            color:'#5C7EB5'
                        },
                        title: {
                            display: true,
                            text: 'Temperature in Celsius',
                            color: 'white'
                        }
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgb(255, 255, 255)'
                        }
                    }
                }
            },
        });
    },
};