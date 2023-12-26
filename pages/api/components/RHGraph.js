import { useEffect, useRef, useState } from 'react';
import {
    Chart,
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

export default function RHGraph({ data, lineColor, fillGraph, selectedDate, title, makeGraph, tension }){

  if(data == null){
    return ;
}  
    
    const combinedContent = data.map(item => item.content).join('');


    const firstColumnValues = [];
    const secondColumnValues = [];


    const rows = combinedContent.split(/\r?\n/);
    for (let i = 0; i < rows.length; i++) {
    const columns = rows[i].split(',');


    if (columns.length >= 2) {
        const firstColumnValue = columns[0];
        const secondColumnValue = columns[2];
        firstColumnValues.push(firstColumnValue);
        secondColumnValues.push(secondColumnValue);
    }
    }

    const makeGraphValue = makeGraph * 10 || 20;


    const tensionValue = tension / 100 || 0.1;

    const labels = firstColumnValues
    .map((dateString, index) => (index % makeGraphValue === 0) ? moment(dateString, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD') : '')
    .filter(label => label !== ''); 

    const data1 = secondColumnValues
    .filter((value, index) => index % makeGraphValue === 0); 


    const [titleSize, setTitleSize] = useState(20);

    const [xSize, setXSize] = useState(14);

    const [ySize, setYSize] = useState(15);

    const [xtickSize, setXtickSize] = useState(14);

    const [ytickSize, setYtickSize] = useState(15);

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
          LineElement,
          Title,
          Legend,
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
                  pointBorderWidth: 0, 
                  pointHoverRadius: 10, 
                  pointHoverBackgroundColor: "rgba(255, 99, 132, 0.2)",
                  pointHoverBorderColor: "rgba(255, 255, 255, 0.3)",
                  fill: fillGraph ? {
                    target: 'origin',
                    above: rgbColor,
                    below: rgbColor,
                  } : false,
                  pointHitRadius: 10,
                  tension: tensionValue,
                },

              ],
              
          },
          options: {

            animation: {
              duration: 0,
            },

            plugins: {


              tooltip: {
                enabled: true,
                titleColor: "rgba(0, 0, 0, 1)",
                bodyColor: "rgba(0, 0, 0, 1)",
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderColor: "rgba(0, 0, 0, 1)",
                borderWidth: 2,
                displayColors: true,
                padding: 10,
                callbacks: {
                  title: function(context) {
                    return context[0].label;
                  },
                  label: function(context) {
                    return context.formattedValue + "%";
                  },
                },
              },

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
                text: title,
                color: "rgba(0, 0, 0, 1)",
                font: {
                  size: titleSize || 20,
                  weight: 'bold',
                }
              },
            },

            
            scales: {
              x: {
                grid: {
                  display: xgrid ? false : true,
                },
                display: true,
                title: {
                  display: true,
                  text: "Date(YYYY-MM-DD)",
                  color: "rgba(0, 0, 0, 1)",
                  font: {
                    size: xSize || 14,
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
                    size: xtickSize || 14,
                    weight: 'bold',
                  }
                },

              },
              
              y: {
                grid: {
                  display: ygrid ? false : true,
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 11,
                  offset: true,
                  padding: 10,
                  color: "rgba(0, 0, 0, 1)",
                  font: {
                    size: ytickSize || 15,
                    weight: 'bold',
                  }
                },
                title: {
                  display: true,
                  text: "RH(%)",
                  color: "rgba(0, 0, 0, 1)",
                  padding: 10,
                  font: {
                    size: ySize || 15,
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
    }, [secondColumnValues, selectedDate]);


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

    const [xgrid, setXgrid] = useState(false);

    const handleXgridChange = (event) => {
      const newXgrid = event.target.checked;
      setXgrid(newXgrid);
    }

    const [ygrid, setYgrid] = useState(false);

    const handleYgridChange = (event) => {
      const newYgrid = event.target.checked;
      setYgrid(newYgrid);
    }

    const handleIncrementtitle = () => {
      if(titleSize < 30){
        setTitleSize(titleSize + 1);
      }
    };
  
    const handleDecrementtitle = () => {
      if(titleSize > 10){
        setTitleSize(titleSize - 1);
      }
    };

    const handleIncrementx = () => {
      if(xSize < 30){
        setXSize(xSize + 1);
      }
    };

    const handleDecrementx = () => {
      if(xSize > 0){
        setXSize(xSize - 1);
      }
    };

    const handleIncrementy = () => {
      if(ySize < 30){
        setYSize(ySize + 1);
      }
    };

    const handleDecrementy = () => {
      if(ySize > 0){
        setYSize(ySize - 1);
      }
    };

    const handleIncrementxtick = () => {
      if(xtickSize < 30){
        setXtickSize(xtickSize + 1);
      }
    };

    const handleDecrementxtick = () => {
      if(xtickSize > 0){
        setXtickSize(xtickSize - 1);
      }
    };

    const handleIncrementytick = () => {
      if(ytickSize < 30){
        setYtickSize(ytickSize + 1);
      }
    };

    const handleDecrementytick = () => {
      if(ytickSize > 0){
        setYtickSize(ytickSize - 1);
      }
    };

    return (
        <div id="chart-wrap">
            <div id='container-graph'>
              <div id='graph-container'>
                <canvas ref={chartRef} id='TempChart' />
              </div>
            </div>

            <div id='setFont'>
              <label>Title Size:</label>
              <input type="number" value={titleSize} readOnly onChange={(e) => setTitleSize(Number(e.target.value))} />
              <button className='daysbtn1 title1' onClick={handleIncrementtitle}>△</button>
              <button className='daysbtn1 title2' onClick={handleDecrementtitle}>▽</button>         
            </div>
            <div id='setFont'>
              <label>X Title Size:</label>
              <input type="number" value={xSize} readOnly onChange={(e) => setXSize(Number(e.target.value))} />
              <button className='daysbtn1 title1' onClick={handleIncrementx}>△</button>
              <button className='daysbtn1 title2' onClick={handleDecrementx}>▽</button>         
            </div>
            <div id='setFont'>
              <label>Y Title Size:</label>
              <input type="number" value={ySize} readOnly onChange={(e) => setYSize(Number(e.target.value))} />
              <button className='daysbtn1 title1' onClick={handleIncrementy}>△</button>
              <button className='daysbtn1 title2' onClick={handleDecrementy}>▽</button>   
            </div>
            <div id='setFont'>
              <label>X Tick Size:</label>
              <input type="number" readOnly value={xtickSize} onChange={(e) => setXtickSize(Number(e.target.value))} />
              <button className='daysbtn1 title1' onClick={handleIncrementxtick}>△</button>
              <button className='daysbtn1 title2' onClick={handleDecrementxtick}>▽</button>   
            </div>
            <div id='setFont'>
              <label>Y Tick Size:</label>
              <input type="number" readOnly value={ytickSize} onChange={(e) => setYtickSize(Number(e.target.value))} />
              <button className='daysbtn1 title1' onClick={handleIncrementytick}>△</button>
              <button className='daysbtn1 title2' onClick={handleDecrementytick}>▽</button>   
            </div>
            <div id='setFont' className='grid'>
              <label>X Grid:</label>
              <input type="checkbox" checked={xgrid} onChange={handleXgridChange} />
            </div>
            <div id='setFont' className='grid'>
              <label>Y Grid:</label>
              <input type="checkbox" checked={ygrid} onChange={handleYgridChange} />
            </div>

            <button onClick={capturePage}>
              <div class="svg-wrapper-1">
                <div class="svg-wrapper">
                  <svg class="icon" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z">
                    </path>
                    </svg>
                </div>
              </div>
              <span>Save</span>
          </button>
          
        </div>
    );
}
