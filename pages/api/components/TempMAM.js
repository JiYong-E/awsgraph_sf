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

import moment from 'moment';
import html2canvas from 'html2canvas';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function TempMAM({ data, lineColor, fillGraph, selectedDate, title, startIdx, endIdx, makeGraph, tension }){

    if (!data) {
        return;
    }

    const DLIdata = data[1].content;

    const pareData = JSON.parse(DLIdata);


    const keys = Object.keys(pareData);
    const values = Object.values(pareData);

    const selectedKeys = keys.slice(startIdx, endIdx);
    const selectedValues = values.slice(startIdx, endIdx);


    const AvgData = data[1].content;
    const MaxData = data[2].content;
    const MinData = data[3].content;



    const AvgpareData = JSON.parse(AvgData);
    const MaxpareData = JSON.parse(MaxData);
    const MinpareData = JSON.parse(MinData);



    const Avgvalues = Object.values(AvgpareData);
    const Maxvalues = Object.values(MaxpareData);
    const Minvalues = Object.values(MinpareData);

    const AvgselectedValues = Avgvalues.slice(startIdx, endIdx);
    const MaxselectedValues = Maxvalues.slice(startIdx, endIdx);
    const MinselectedValues = Minvalues.slice(startIdx, endIdx);


    const Avgdata1 = AvgselectedValues
    .filter((value, index) => index % 1 === 0); 

    const Maxdata1 = MaxselectedValues
    .filter((value, index) => index % 1 === 0); 

    const Mindata1 = MinselectedValues
    .filter((value, index) => index % 1 === 0);


    // console.log("Selected Keys:", selectedKeys);
    // console.log("Selected Values:", selectedValues);


    const makeGraphValue = makeGraph * 10 || 20;


    const tensionValue = tension / 100 || 0;



    const labels = selectedKeys
    .map((dateString, index) => (index % 1 === 0) ? moment(dateString, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD') : '')
    .filter(label => label !== ''); 

    const data1 = selectedValues
    .filter((value, index) => index % 1 === 0); 


    const [titleSize, setTitleSize] = useState(20);

    const [xSize, setXSize] = useState(14);

    const [ySize, setYSize] = useState(15);

    const [xtickSize, setXtickSize] = useState(14);

    const [ytickSize, setYtickSize] = useState(15);

    const [pointSize, setPointSize] = useState(0);

    const [rgbColorPoint1, setRgbColorPoint1] = useState('#ff0000');

    const [rgbColorPoint2, setRgbColorPoint2] = useState('#ff0000');

    const [rgbColorPoint3, setRgbColorPoint3] = useState('#ff0000');

    const [rgbColorLine1, setRgbColorLine1] = useState('#EC1B1F');

    const [rgbColorLine2, setRgbColorLine2] = useState('#2B3E9E');

    const [rgbColorLine3, setRgbColorLine3] = useState('#518C4F');

    

    const handleColorChange1 = (newColor) => {
      setRgbColorPoint1(newColor.hex);
    }

    const handleColorChange2 = (newColor) => {
      setRgbColorPoint2(newColor.hex);
    }

    const handleColorChange3 = (newColor) => {
      setRgbColorPoint3(newColor.hex);
    }

    const handleColorChange4 = (newColor) => {
      setRgbColorLine1(newColor.hex);
    }

    const handleColorChange5 = (newColor) => {
      setRgbColorLine2(newColor.hex);
    }

    const handleColorChange6 = (newColor) => {
      setRgbColorLine3(newColor.hex);
    }

    const chartRef = useRef(null);
    let chartInstance = null;

    const data1_max = Math.ceil(Math.max.apply(null, Maxdata1));

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
                    label: "Avg",
                    data: Avgdata1,
                    borderColor: rgbColorLine1 || "#00ff00",
                    pointRadius: pointSize || 0, 
                    pointBackgroundColor: rgbColorPoint2 || "rgba(0, 99, 132, 1)",
                    pointBorderColor: "rgba(255, 255, 255, 1)",
                    pointHoverRadius: 20, 
                    pointHoverBackgroundColor: "rgba(255, 99, 132, 0.2)",
                    pointHoverBorderColor: "rgba(255, 255, 255, 0.3)",
                    pointHitRadius: 10,
                    tension: tensionValue,
                  },
                    {
                        label: "Max",
                        data: Maxdata1,
                        borderColor: rgbColorLine2 || "#ff0000",
                        pointRadius: pointSize || 0, 
                        pointBackgroundColor: rgbColorPoint1 || "rgba(255, 0, 132, 1)",
                    pointBorderColor: "rgba(255, 255, 255, 1)",
                    pointHoverRadius: 20, 
                    pointHoverBackgroundColor: "rgba(255, 99, 132, 0.2)",
                    pointHoverBorderColor: "rgba(255, 255, 255, 0.3)",
                    pointHitRadius: 10,
                    tension: tensionValue,
                    },
                    {
                        label: "Min",
                        data: Mindata1,
                        borderColor: rgbColorLine3 || "#0000ff",
                        pointRadius: pointSize || 0,
                        pointBackgroundColor: rgbColorPoint3 || "rgba(255, 99, 0, 1)",
                    pointBorderColor: "rgba(255, 255, 255, 1)",
                    pointHoverRadius: 20, 
                    pointHoverBackgroundColor: "rgba(255, 99, 132, 0.2)",
                    pointHoverBorderColor: "rgba(255, 255, 255, 0.3)",
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
                  align: "left",
                  labels: {
                    font: {
                      size: 16,
                      weight: 'bold',
                    }
                  },
                },
                title: {
                  display: true,
                  text: title || 'AVG Temperature Graph',
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
                    text: "Temperature(℃)",
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



      const [isToggleOn, setIsToggleOn] = useState(false);
      const [activePicker, setActivePicker] = useState(null);


      const handleToggleChange = (pickerNumber) => {
        setActivePicker(pickerNumber);
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

            
            <button onClick={() => handleToggleChange(1)}>Max</button>
            <button onClick={() => handleToggleChange(2)}>Average</button>
            <button onClick={() => handleToggleChange(3)}>Min</button>

            <div id='PointBtn'>
              <ChromePicker className={isToggleOn && activePicker === 1 ? 'block' : 'none'} color={rgbColorPoint1} onChange={handleColorChange1}/>

              <ChromePicker className={isToggleOn && activePicker === 2 ? 'block' : 'none'} color={rgbColorLine1} onChange={handleColorChange4}/>

              <ChromePicker className={isToggleOn && activePicker === 3 ? 'block' : 'none'} color={rgbColorPoint3} onChange={handleColorChange3}/>

              <ChromePicker className={isToggleOn && activePicker === 1 ? 'block' : 'none'} color={rgbColorLine2} onChange={handleColorChange5}/>

              <ChromePicker className={isToggleOn && activePicker === 2 ? 'block' : 'none'} color={rgbColorPoint2} onChange={handleColorChange2}/>

              <ChromePicker className={isToggleOn && activePicker === 3 ? 'block' : 'none'} color={rgbColorLine3} onChange={handleColorChange6}/>
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
