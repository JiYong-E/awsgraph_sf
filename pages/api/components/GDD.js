import { useEffect, useRef, useState } from 'react';
import { ChromePicker } from "react-color";
import {
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    BarElement,
  } from "chart.js";
Chart.register(Title);
Chart.register(Legend);
Chart.register(BarElement);

import html2canvas from 'html2canvas';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


export default function GDD({ data, lineColor, fillGraph, selectedDate, title, startIdx, endIdx, makeGraph, tension }){

    if (!data) {
        return;
    }

    // console.log(data[0].content)

    const [base, setData] = useState(null);

    useEffect(() => {
        fetch('https://awsgraph.vercel.app/api/components/GetSession')
        .then(res => res.json())
        .then(base => {

            setData(base);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []); 

    const DLIdata = data[0].content;

    const pareData = JSON.parse(DLIdata);

    const keys = Object.keys(pareData);

    const values = Object.values(pareData);


    const plantDateIndex = keys.indexOf(base?.collection?.plant.plantDate);


    const slicedKeys = keys.slice(plantDateIndex);
    const slicedValues = values.slice(plantDateIndex);

    // console.log(slicedKeys);
    // console.log(slicedValues);


    const basetemperature = base?.collection?.plant.plantBase || 0; 
    const accumulatedGDD = slicedValues.reduce((acc, temperature) => {
        const gdd = Math.max(temperature - basetemperature, 0);
        acc.push(acc.length === 0 ? gdd : acc[acc.length - 1] + gdd);
        return acc;
    }, []);

    // console.log(accumulatedGDD);




    const plantDate = new Date(base?.collection?.plant.plantDate);
    const selectedDateObj = new Date(selectedDate);
    const dateDifference = Math.max((selectedDateObj - plantDate) / (24 * 60 * 60 * 1000), 0);



    const startendDiff = endIdx - startIdx;

    const enddateDifference = Math.max((selectedDateObj - plantDate) / (24 * 60 * 60 * 1000), 0) + startendDiff;


    
    const slicedKeys2 = slicedKeys.slice(dateDifference, enddateDifference);
    const slicedAccumulatedGDD = accumulatedGDD.slice(dateDifference, enddateDifference);

    const firstDate = slicedKeys2[0];

    const lastDate = slicedKeys2[slicedKeys2.length - 1];

    const [GDDtitle, setGDDtitle] = useState(`${firstDate} ~ ${lastDate} GDD Graph`);

    useEffect(() => {
      setGDDtitle(`${firstDate} ~ ${lastDate} GDD Graph`);
    }, [slicedKeys2, slicedAccumulatedGDD]);

    // console.log(slicedKeys2);
    // console.log('slicedAccumulatedGDD',slicedAccumulatedGDD);

    const makeGraphValue = makeGraph * 10 || 20;


    const tensionValue = tension / 100 || 0;

    const [titleSize, setTitleSize] = useState(20);

    const [xSize, setXSize] = useState(14);

    const [ySize, setYSize] = useState(15);

    const [xtickSize, setXtickSize] = useState(14);

    const [ytickSize, setYtickSize] = useState(15);

    const [pointSize, setPointSize] = useState(0);

    const [rgbColorPoint, setRgbColorPoint] = useState('#ff0000');

    const handleColorChange = (newColor) => {
      setRgbColorPoint(newColor.hex);
    }



    const chartRef = useRef(null);
    let chartInstance = null;

    const data1_max = Math.max.apply(null, slicedAccumulatedGDD);
    const roundedMax = data1_max.toFixed(3);
    // console.log(roundedMax);

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
              labels: slicedKeys2,
              datasets: [
                  {
                    label: "Data",
                    data: slicedAccumulatedGDD,
                    borderColor: lineColor || "rgba(255, 99, 132, 1)",
                    pointRadius: pointSize || 0, 
                    pointBackgroundColor: rgbColorPoint || "rgba(255, 99, 132, 1)",
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
                  text: GDDtitle || 'GDD Graph',
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
                    text: "GDD(℃)",
                    color: "rgba(0, 0, 0, 1)",
                    padding: 30,
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
      }, [values]);
  
  
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

      const roundedGDD = Math.round(accumulatedGDD[accumulatedGDD.length - 8] * 100) / 100;


      const [isToggleOn, setIsToggleOn] = useState(false);


      const handleToggleChange = (e) => {

        setIsToggleOn((prevToggleState) => !prevToggleState);
      };

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

      const [GDDstatus, setGDDstatus] = useState(false);

      const handleGDDstatusChange = (event) => {
        setGDDstatus((prevGDDstatus) => !prevGDDstatus);
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

      const handleIncrementpoint = () => {
        if(pointSize < 30){
          setPointSize(pointSize + 1);
        }
      };

      const handleDecrementpoint = () => {
        if(pointSize > 0){
          setPointSize(pointSize - 1);
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

            <div id='setFont'>
              <label>Point Size:</label>
              <input type="number" value={pointSize} onChange={(e) => setPointSize(Math.min(12, Math.max(0, e.target.value)))}
              min={0}
              max={12}
              readOnly
              />
              <button className='daysbtn1 title1' onClick={handleIncrementpoint}>△</button>
              <button className='daysbtn1 title2' onClick={handleDecrementpoint}>▽</button>   
            </div>
            <div id='setFont' className='grid'>
              <label>X Grid:</label>
              <input type="checkbox" checked={xgrid} onChange={handleXgridChange} />
            </div>
            <div id='setFont' className='grid'>
              <label>Y Grid:</label>
              <input type="checkbox" checked={ygrid} onChange={handleYgridChange} />
            </div>

            
            <button onClick={handleToggleChange}>포인트 색상</button>
            <div id='PointBtn'>
              <ChromePicker className={isToggleOn ? 'block' : 'none'} color={rgbColorPoint} onChange={handleColorChange}/>
            </div>

            <button onClick={handleGDDstatusChange}>GDD상태</button>
            <div id='GDDstatus' className={GDDstatus ? 'GDDOn' : 'GDDOff'}>
              <p>현재 GDD: {roundedMax}</p>
              <p>이름: {base?.collection?.plant.plantName}</p>
              <p>기준온도: {base?.collection?.plant.plantBase}℃</p>
              <p>심은 날짜: {base?.collection?.plant.plantDate}</p>
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

