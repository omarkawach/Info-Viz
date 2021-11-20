import React from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { Dropdown, Option } from "./Dropdown";

import data0 from "../data/data.json";
import data1 from "../data/data1.json";
import data2 from "../data/data2.json";
import data3 from "../data/data3.json";
import data4 from "../data/data4.json";
import data5 from "../data/data5.json";

let colors_number  = ['#0707FF','#3737FF','#B7B7FF','#D1D1FF','#D9D9FF','#DBDBFF','#DCDCFF','#E0E0FF','#E3E3FF','#E4E4FF','#ECECFF','#EFEFFF','#F0F0FF','#F1F1FF','#F4F4FF'];
let colors_density = ['#1515FF','#D3D3FF','#A2A2FF','#B5B5FF','#E9E9FF','#E9E9FF','#EBEBFF','#E1E1FF','#DFDFFF','#F0F0FF','#F3F3FF','#E4E4FF','#F3F3FF','#F5F5FF','#F5F5FF'];
                
//Follows this order for LFL #s & LFL/SqKm:
// Victoria, Saanich, Oak Bay, Esquimalt, North Saanich, Langford, Central Saanich, Colwood, View Royal, Sooke, Metchosin, Sidney, Highlands, Juan de Fuca (Part 1), Juan de Fuca (Part 2)
                        
export default class Chart extends React.Component {
  render() {
    var data;
    var markers = [];
    var axisBottom = {};
    var axisLeft ={};
    var xFormat = " >-$,.2f"
    var yFormat = " >-$,.2f"
    var xScale  = { type: 'linear', min: 0, max: 'auto' }
    var colors = colors_number;
    var annotations = [];
    
    
    // switch for legends
    switch(this.props.state.legend) {
        case 1:
            colors = colors_number;
            break;
        case 2:
            colors = colors_density;
            break;
        default:
            break;
    }
    
    // switch for annotations, based on selection given from map
    // https://nivo.rocks/storybook/?path=/story/swarmplot--using-annotations
    
    // switch(this.props.value.map) {}
    
    // switch for charts
    switch(this.props.state.chart) {
        case 1:
            data = data1;
            markers = [
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
                    },
                    {
                      axis: 'x',
                      value: 82,
                      lineStyle: { stroke: '#888', strokeWidth: 2 },
                      legend: 'Canadian Life Expectancy: 82 years',
                      legendPosition: 'top',
                      legendOffset: 0,
                      textStyle: {
                        fill: '#888',
                        fontSize: 12 ,
                      }
                    }
                ];
            axisBottom = {
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Median Age (years)',
                    legendPosition: 'middle',
                    legendOffset: 46
                }
            axisLeft = {
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Median Household Income',
                    legendPosition: 'middle',
                    legendOffset: -60,
                    format: ">-$,.0f"
                }
            xFormat = ">.0f";
            yFormat = ">-$,.0f";
            xScale  = { type: 'linear', min: 0, max: '82' }
            break;
        case 2:
            data = data2;
            markers = [
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
                ];
            axisBottom = {
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Total Number of Houses',
                    legendPosition: 'middle',
                    legendOffset: 46
                }
            axisLeft = {
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Median Household Income',
                    legendPosition: 'middle',
                    legendOffset: -60,
                    format: ">-$,.0f"
                }
            xFormat = ">.0f";
            yFormat = ">$,.0f";
            xScale  = { type: 'linear', min: 0, max: 'auto' };
            break;
        case 3:
            data = data3;
            markers = [
                    
                ];
            axisBottom = {
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Total Number of Houses',
                    legendPosition: 'middle',
                    legendOffset: 46
                }
            axisLeft = {
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Population Density (People Per SqKm)',
                    legendPosition: 'middle',
                    legendOffset: -60,
                    format: ">.0f"
                }
            xFormat = ">,.0f";
            yFormat = ">,.0f";
            xScale  = { type: 'linear', min: 0, max: 'auto' };
            break;
        case 4:
            data = data4;
            markers = [
                ];
            axisBottom = {
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Little Free Library Density (LFLs Per SqKm)',
                    legendPosition: 'middle',
                    legendOffset: 46
                }
            axisLeft = {
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Population Density (People Per SqKm)',
                    legendPosition: 'middle',
                    legendOffset: -60,
                    format: ">.0f"
                }
            xFormat = ">,.2f";
            yFormat = ">,.0f";
            xScale  = { type: 'linear', min: 0, max: '10' }
            break;
        case 5:
            data = data5;
            markers = [
                    {
                      axis: 'y',
                      value: .226,
                      lineStyle: { stroke: '#888', strokeWidth: 2 },
                      legend: 'Canadian Non-official Language Speakers: 22.6%',
                      legendPosition: 'bottom',
                      legendOffset: -60,
                      textStyle: {
                        fill: '#888',
                        fontSize: 12 ,
                      }
                    },
                    {
                      axis: 'x',
                      value: .223,
                      lineStyle: { stroke: '#888', strokeWidth: 2 },
                      legend: 'Canadian Visible Minorities: 22.3%',
                      legendPosition: 'top',
                      legendOffset: 0,
                      textStyle: {
                        fill: '#888',
                        fontSize: 12 ,
                      }
                    }
                ];
            axisBottom = {
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '% Visible Minorities',
                    legendPosition: 'middle',
                    legendOffset: 46,
                    format: ">.0%"
                }
            axisLeft = {
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '% Non-Official Language Speakers',
                    legendPosition: 'middle',
                    legendOffset: -60,
                    format: ">.0%"
                }
            xFormat = ">.2%";
            yFormat = ">.2%";
            xScale  = { type: 'linear', min: 0, max: '.25' };
            break;   
        default:
            break;
    }
    return (
        <div className="chart">
            <ResponsiveScatterPlot
                data={data}
                margin={{ top: 60, right: 190, bottom: 100, left: 90 }}
                xScale={ xScale }
                xFormat={ xFormat }
                yScale={{ type: 'linear', min: 0, max: 'auto' }}
                yFormat={ yFormat }
                // https://stackoverflow.com/questions/67241395/how-to-add-custom-color-theme-in-nivo-chart-settings
                // /*
                colors={colors}
                colorBy="index"
                blendMode="multiply"
                axisTop={null}
                axisRight={null}
                axisBottom={ axisBottom }
                axisLeft={ axisLeft }
                markers={ markers }
                motionConfig={{
                        mass: 87,
                        tension: 427,
                        friction: 500,
                        clamp: false,
                        precision: 0.01,
                        velocity: 0 }}
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 115,
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
