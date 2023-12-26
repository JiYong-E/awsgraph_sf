import Link from 'next/link';


export default function App() {
  
  return (
    <div>
      
      <div id="cardbox">

        <div id="card">
          <div id="content">
            <p id="heading">안내사항 💬
            </p><p id="para">
              그래프를 이용하시기 전에 안내사항을 꼭 읽어주세요.
            </p>
            <button id="btn"><Link href={'/info'}>Read more</Link></button>
          </div>
        </div>

        <div id="card1">
          <div id="content1">
            <p id="heading">기온 🌡️
            </p><p id="para">
              AWS에서 제공하는 온도 센서의 그래프를 보여줍니다.
            </p>
            <button id="btn"><Link href={'/graph/temp'}>Read more</Link></button>
          </div>
        </div>

        <div id="card">
          <div id="content">
            <p id="heading">평균온도 🌡️
            </p><p id="para">
              최고, 최저, 평균 온도를 보여줍니다.
            </p>
            <button id="btn"><Link href={'/utilgraph/avgtemp'}>Read more</Link></button>
          </div>
        </div>

        <div id="card1">
          <div id="content1">
            <p id="heading">습도 💧
            </p><p id="para">
              AWS에서 제공하는 습도 센서의 그래프를 보여줍니다.
            </p>
            <button id="btn"><Link href={'/graph/RH'}>Read more</Link></button>
          </div>
        </div>

        <div id="card">
          <div id="content">
            <p id="heading">일사량 ☀️
            </p><p id="para">
              AWS에서 제공하는 일사량 센서의 그래프를 보여줍니다.
            </p>
            <button id="btn"><Link href={'/graph/light'}>Read more</Link></button>
          </div>
        </div>

        <div id="card1">
          <div id="content1">
            <p id="heading">DLI ☀️
            </p><p id="para">
              일사량을 토대로 계산한 DLI의 그래프를 보여줍니다.
            </p>
            <button id="btn"><Link href={'/utilgraph/DLI'}>Read more</Link></button>
          </div>
        </div>

        <div id="card">
          <div id="content">
            <p id="heading">VPD 💦
            </p><p id="para">
              온도와 습도를 토대로 계산한 VPD의 그래프를 보여줍니다.
            </p>
            <button id="btn"><Link href={'/graph/VPD'}>Read more</Link></button>
          </div>
        </div>

        <div id="card1">
          <div id="content1">
            <p id="heading">GDD 🌱
            </p><p id="para">
              온도를 토대로 계산한 GDD의 그래프를 보여줍니다.
            </p>
            <button id="btn"><Link href={'/utilgraph/GDD'}>Read more</Link></button>
          </div>
        </div>

        <div id="card">
          <div id="content">
            <p id="heading">식물등록 ✏️
            </p><p id="para">
              현재 키우고 있는 식물을 등록할 수 있습니다.
            </p>
            <button id="btn"><Link href={'/regiplant'}>Read more</Link></button>
          </div>
        </div>
        


      </div>
      
    </div>
  );
}
