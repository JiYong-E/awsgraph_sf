import Link from 'next/link';
import { useState } from 'react';

export default function RegiPlant() {
  const [plantBase, setPlantBase] = useState(5);
  const [plantDate, setPlantDate] = useState('2023-09-27');
  const [plantName, setPlantName] = useState('');

  const handleSubmit = () => {

      fetch('https://awsgraph.vercel.app/api/components/RegiPlant', {
      // fetch('http://localhost:3000/api/components/RegiPlant', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plantBase: plantBase,
        plantDate: plantDate,
        plantName: plantName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert('등록되었습니다.');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('등록에 실패했습니다.');
      });
  };

  const handleClear = () => {
    setPlantBase(5);
    setPlantDate('2023-09-27');
    setPlantName('');
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

        <div id='infoform'>
          <div id='inforegi'>
            <h1>Register Plant</h1>
            <p>식물 이름과 심은 날짜를 입력해주세요</p>
            <p>2023-09-27 이후 심은 식물만 등록해주세요</p>
            <p>브라우저에 등록이 완료되었다고 알람이 <br></br>나오니 잠시만 기다려주세요</p>
          </div>
  
          <div className="form">
            <label className="lb">Base Temperature:</label>
            <input name="nome" type="number" value={plantBase} onChange={(e) => setPlantBase(parseInt(e.target.value, 10))} class="infos"/>
  
            <label for="email" className="lb">Plant Name:</label>
            <input name="email" id="email" type="text" value={plantName}
            onChange={(e) => setPlantName(e.target.value)} class="infos"/>
  
            <label for="data" class="lb">Plant Date:</label>
            <input name="data" id="data" type="date" value={plantDate}
            onChange={(e) => setPlantDate(e.target.value)} class="infos"/>
  
            <button id="send" onClick={handleSubmit}>Send</button>
            <button id="limpar" type="reset" onClick={handleClear}>Clear </button>
          </div>
        </div>

    </div>
  );
}
