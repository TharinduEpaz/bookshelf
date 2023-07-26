import React from 'react'
import {Bar} from 'reactchartjs'
import {Chart as chartjs} from 'chart.js/auto'

export default function Chart({chartData}) {
  return (
    
    <Bar
        data = {chartData}
    >

    </Bar>

  )
}
