import React from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { Dropdown, Option } from "./Dropdown";

import data from "../data/data.json";

export default class Chart extends React.Component {
  render() {
    return (
        <div className="chart">
            <ResponsiveScatterPlot
                data={data}
                margin={{ top: 60, right: 170, bottom: 100, left: 90 }}
                xScale={{ type: 'linear', min: 0, max: 'auto' }}
                xFormat=">-.2f"
                yScale={{ type: 'linear', min: 0, max: 'auto' }}
                yFormat=" >-$,.2f"
                // https://stackoverflow.com/questions/67241395/how-to-add-custom-color-theme-in-nivo-chart-settings
                // /*
                colors={['#0707FF',
                        '#3737FF',
                        '#B7B7FF',
                        '#D1D1FF',
                        '#D9D9FF',
                        '#DBDBFF',
                        '#DCDCFF',
                        '#E0E0FF',
                        '#E3E3FF',
                        '#E4E4FF',
                        '#ECECFF',
                        '#EFEFFF',
                        '#F0F0FF',
                        '#F1F1FF',
                        '#F4F4FF',]}
                // */
                // Follows this order for LFL #s:
                        // Victoria
                        // Saanich
                        // Oak Bay
                        // Esquimalt
                        // North Saanich
                        // Langford
                        // Central Saanich
                        // Colwood
                        // View Royal
                        // Sooke
                        // Metchosin
                        // Sidney
                        // Highlands
                        // Juan de Fuca (Part 1)
                        // Juan de Fuca (Part 2)
                // Same order but LFL/SqKm
                /*
                colors={['#1515FF',
                    '#D3D3FF',
                    '#A2A2FF',
                    '#B5B5FF',
                    '#E9E9FF',
                    '#E9E9FF',
                    '#EBEBFF',
                    '#E1E1FF',
                    '#DFDFFF',
                    '#F0F0FF',
                    '#F3F3FF',
                    '#E4E4FF',
                    '#F3F3FF',
                    '#F5F5FF',
                    '#F5F5FF']}
                
                */
                
                colorBy="index"
                blendMode="multiply"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Median Age',
                    legendPosition: 'middle',
                    legendOffset: 46
                }}
                onClick={(data) => {
                    this.props.onChartElementClick(data["serieId"]);
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Median Household Income',
                    legendPosition: 'middle',
                    legendOffset: -60,
                    format: ">-$,.0f"
                }}
                markers={[
                    {
                      axis: 'y',
                      value: 62900,
                      lineStyle: { stroke: '#888', strokeWidth: 2 },
                      legend: 'Canadian Median Income $62,900',
                      legendPosition: 'bottom',
                      legendOffset: -60,
                      textStyle: {
                        fill: '#888',
                        fontSize: 12 ,
                      }
                    }
                ]}
                motionConfig={{
                        mass: 87,
                        tension: 427,
                        friction: 500,
                        clamp: false,
                        precision: 0.01,
                        velocity: 0 }}
                legends={[
                    {
                        text: '# of LFLs',
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 130,
                        translateY: 0,
                        itemWidth: 100,
                        itemHeight: 12,
                        itemsSpacing: 5,
                        itemDirection: 'left-to-right',
                        symbolSize: 12,
                        symbolShape: 'square',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
  }
}
