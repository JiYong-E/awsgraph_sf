// 예시: [id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TempGraph from '../api/components/TempGraph';
import RHGraph from '../api/components/RHGraph';
import { ChromePicker } from 'react-color';
import LightGraph from '../api/components/LightGraph';
import VPDGraph from '../api/components/VPDGraph';
import Link from 'next/link';


export default function YouWant() {
    const router = useRouter();
    const { id } = router.query;


    const [data, setData] = useState(null);
    const [selectedDate, setSelectedDate] = useState('2023-09-27');
    const [numberOfDays, setNumberOfDays] = useState(7);


    useEffect(() => {
        const fetchData = async () => {
            try {
              const differenceInDays = Math.round((new Date(selectedDate) - new Date('2023-09-26')) / (24 * 60 * 60 * 1000));
              const startIdx = differenceInDays - 1; 
              const endIdx = startIdx + numberOfDays; 
          
              const res = await fetch(`/api/components/ReadData?startIdx=${startIdx}&endIdx=${endIdx}`);
              const result = await res.json();
              setData(result);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

        fetchData();
    }, [selectedDate, numberOfDays]);


  const handleDateChange = (event) => {
    const newSelectedDate = event.target.value;
    setSelectedDate(newSelectedDate);
  };

  const [color, setColor] = useState('#ff0000');

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleNumberOfDaysChange = (event) => {
    const newNumberOfDays = parseInt(event.target.value, 10);
    setNumberOfDays(newNumberOfDays);
  };

  const [fillGraph, setFillGraph] = useState(false);

  const handleFillGraphChange = (event) => {
    const newFillGraph = event.target.checked;
    setFillGraph(newFillGraph);
  };

  const endDate = new Date(selectedDate);
  endDate.setDate(endDate.getDate() + numberOfDays - 1);


  const formattedEndDate = endDate.toISOString().split('T')[0];

  const upperCaseId = id === 'temp' ? 'Temperature' : id === 'RH' ? 'Relative Humidity' : id === 'light' ? 'Light' : id === 'VPD' ? 'VPD' : 'Invalid ID';

  const [title, setTitle] = useState(selectedDate + ' ~ ' + formattedEndDate + ' ' + upperCaseId + ' Graph');

  useEffect(() => {
    setTitle(selectedDate + ' ~ ' + formattedEndDate + ' ' + upperCaseId + ' Graph');
  }, [upperCaseId, numberOfDays, selectedDate]);

  const [makeGraph, setMakeGraph] = useState(2);

  const [tension, setTension] = useState(20);


  const [isToggleOn, setIsToggleOn] = useState(true);


  const handleToggleChange = (e) => {

    setIsToggleOn((prevToggleState) => !prevToggleState);
  };

  const handleIncrement = () => {
    if (numberOfDays < 31) {
      setNumberOfDays(numberOfDays + 1);
    }
  };

  const handleDecrement = () => {
    if (numberOfDays > 1) {
      setNumberOfDays(numberOfDays - 1);
    }
  };

  const handleIncrementtension = () => {
    if (tension < 100) {
      setTension(tension + 1);
    }
  };

  const handleDecrementtension = () => {
    if (tension > 0) {
      setTension(tension - 1);
    }
  };

  const handleIncrementcompression = () => {
    if (makeGraph < 12) {
      setMakeGraph(makeGraph + 1);
    }
  };

  const handleDecrementcompression = () => {
    if (makeGraph > 1) {
      setMakeGraph(makeGraph - 1);
    }
  };

  
    return (
        <div id='firstDiv'>

          <div id='goOtherside'>
            <div id='OtherBox'>
              <Link href={'../graph/temp'}><button><span>온도 </span></button></Link>
              <Link href={'../utilgraph/avgtemp'}><button><span>평균온도</span></button></Link>
              <Link href={'../graph/RH'}><button><span>습도</span></button></Link>
              <Link href={'../graph/light'}><button><span>일사량</span></button></Link>
              <Link href={'../graph/VPD'}><button><span>VPD</span></button></Link>
              <Link href={'../utilgraph/GDD'}><button><span>GDD</span></button></Link>
              <Link href={'../utilgraph/DLI'}><button><span>DLI</span></button></Link>
              <Link href={'../regiplant'}><button><span>식물등록</span></button></Link>
            </div>
          </div>

          {id === 'temp' && <TempGraph id='graphImg' data={data} tension={tension} makeGraph={makeGraph} lineColor={color} fillGraph={fillGraph} selectedDate={selectedDate} title={title}/>}
          {id === 'RH' && <RHGraph data={data} tension={tension} makeGraph={makeGraph} lineColor={color} fillGraph={fillGraph} selectedDate={selectedDate} title={title} id='RHGraph' />}
          {id === 'light' && <LightGraph data={data} tension={tension} makeGraph={makeGraph} lineColor={color} fillGraph={fillGraph} selectedDate={selectedDate} title={title} id='LightGraph' />}
          {id === 'VPD' && <VPDGraph data={data} tension={tension} makeGraph={makeGraph} lineColor={color} fillGraph={fillGraph} selectedDate={selectedDate} title={title} id='VPDGraph' />}
          {id !== 'temp' && id !== 'RH' && id !== 'light' && id !=='VPD' && <p>Please provide a valid id.</p>}  
          
          <div id='labelBox' className={isToggleOn ? 'on' : 'off'}>
            <div id="menuToggle" >
                <input id="checkbox" type="checkbox" onClick={handleToggleChange}/>
                <label className='toggle'  htmlFor="checkbox">
                <div class="bar bar--top"></div>
                <div class="bar bar--middle"></div>
                <div class="bar bar--bottom"></div>
              </label>
            </div>
            <div id='labelBozo'>
              <div id='labelbozozo'>
              <label>
              Date:
              <input type='date' value={selectedDate} onChange={handleDateChange} />
            </label>
            <label>
              Tension:
              <input type='number' value={tension} readOnly onChange={(e) => setTension(Math.min(100, Math.max(0, e.target.value)))} min={0} max={100}/>
              <button className='daysbtn' onClick={handleIncrementtension}>△</button>
              <button className='daysbtn' onClick={handleDecrementtension}>▽</button>
            </label>
            <label>
                Number of Days:
                <input type="number" value={numberOfDays} readOnly onChange={handleNumberOfDaysChange} />
                <button className='daysbtn' onClick={handleIncrement}>△</button>
                <button className='daysbtn' onClick={handleDecrement}>▽</button>
            </label>
            <label id='filllabel'>
              Fill Graph: 
              <input type="checkbox" id='fillGraph' checked={fillGraph} onChange={handleFillGraphChange} />
            </label>
            <label>
              Compression Data:
              <input
              type="number"
              value={makeGraph} readOnly
              onChange={(e) => setMakeGraph(Math.min(12, Math.max(1, e.target.value)))}
              min={1}
              max={12}/>   
              <button className='daysbtn' onClick={handleIncrementcompression}>△</button>
              <button className='daysbtn' onClick={handleDecrementcompression}>▽</button>         
            </label>
              </div>
            <div id='chromebozo'>
              <ChromePicker color={color} onChange={handleColorChange} />
            </div>
            </div>
          </div>

        </div>
    );
}
