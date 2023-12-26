import { useEffect, useRef } from 'react';
import {
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
  } from "chart.js";
Chart.register(Title);
Chart.register(Legend);

import moment from 'moment';
import html2canvas from 'html2canvas';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function TempGraph2({ data1, lineColor, labels, fillGraph }){

    console.log('data1', data1)
    console.log('labels', labels)
    console.log('lineColor', lineColor)
    console.log('fillGraph', fillGraph)

    

    const chartRef = useRef(null);
    let chartInstance = null;
  
    useEffect(() => {
      const ctx = chartRef.current.getContext("2d");

      const createChart = () => {
        
        Chart.register(
          LineController,
          CategoryScale,
          LinearScale,
          PointElement,
          LineElement
        );
        chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
                {
                  label: "Data",
                  data: data1,
                  borderColor: lineColor || "rgba(255, 99, 132, 1)",
                  pointRadius: 0, 
                  pointBackgroundColor: "rgba(255, 99, 132, 1)",
                  pointBorderColor: "rgba(255, 255, 255, 1)",
                  pointBorderWidth:0, 
                  pointHoverRadius: 20,
                  pointHoverBackgroundColor: "rgba(255, 99, 132, 0.2)",
                  pointHoverBorderColor: "rgba(255, 255, 255, 0.3)",
                  fill: fillGraph ? {
                    target: 'origin',
                    above: rgbColor,
                    below: rgbColor,
                  } : false,
                  pointHitRadius: 10,
                },
              ],
              
          },
          options: {
            plugins: {
              legend: {
                display: false,
                position: "top",
                align: "center",
                labels: {
                  font: {
                    size: 16,
                    weight: 'bold',
                  }
                },
              },
              title: {
                display: true,
                text: "2023-11-19 ~ 2023-11-27 Temperature Graph",
                color: "rgba(0, 0, 0, 1)",
                font: {
                  size: 30,
                  weight: 'bold',
                }
              },
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Date(YYYY-MM-DD)",
                  color: "rgba(0, 0, 0, 1)",
                  font: {
                    size: 20,
                    weight: 'bold',
                  },
                  padding: 0,
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 14,
                  maxRotation: 50,
                  minRotation: 30,
                  offset: true,
                  padding: 30,
                  font: {
                    size: 14,
                    weight: 'bold',
                  }
                },
              },
              y: {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 11,
                  offset: true,
                  padding: 10,
                  color: "rgba(0, 0, 0, 1)",
                  font: {
                    size: 15,
                    weight: 'bold',
                  }
                },
                title: {
                  display: true,
                  text: "Temperature(℃)",
                  color: "rgba(0, 0, 0, 1)",
                  padding: 30,
                  font: {
                    size: 20,
                    weight: 'bold',
                  }
                },
              },
            },
          },
        });
      };
  
      const destroyChart = () => {
        if (chartInstance) {
          chartInstance.destroy();
          chartInstance = null;
        }
      };
  
      const initializeChart = () => {
        destroyChart(); 
        createChart(); 
      };
  

      initializeChart();
  

      return () => {
        destroyChart();
      };
    }, [data1]);


    const capturePage = async () => {
      try {
        const graphContainer = document.getElementById('graph-container');
        const canvas = await html2canvas(graphContainer);
    

        const image = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = image;
        a.download = 'graph.png';
        a.click();
      } catch (error) {
        console.error('Error capturing page:', error);
      }
    };


    function hexToRgb(hex, alpha) {

      var r = parseInt(hex.slice(1, 3), 16);
      var g = parseInt(hex.slice(3, 5), 16);
      var b = parseInt(hex.slice(5, 7), 16);

      if (isNaN(alpha) || alpha < 0 || alpha > 1) {
          alpha = 1;
      }
  

      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const hexColor = lineColor
    const alphaValue = 0.3;

    const rgbColor = hexToRgb(hexColor, alphaValue);

    return (
        <div id="chart-wrap">

            <h1>TempGraph2</h1>
            <p>lineColor: {lineColor}</p>
            <p>rgbColor: {rgbColor}</p>
            <div id='graph-container'>
              <canvas ref={chartRef} id='TempChart' />
            </div>
            <button onClick={capturePage}>Capture Page</button>
            
        </div>
    );
}

