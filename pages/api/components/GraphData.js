import TempGraph2 from "./TempGraph2";
import moment from 'moment';

export default function GraphData({data, id, lineColor, fillGraph}){

    // console.log(id)
    // console.log(data)

    if(data == null){
        return (
            <div>
                <h1>안됨</h1>
            </div>
        );
    }

    if(id == 'temp'){
        const combinedContent = data.map(item => item.content).join('');
        // console.log('combine',combinedContent)

        const firstColumnValues = [];
        const secondColumnValues = [];

        const rows = combinedContent.split(/\r?\n/);
        
        // console.log(rows.length)
        for (let i = 0; i < rows.length; i++) {
            const columns = rows[i].split(',');
            if (columns.length >= 2) {
                const firstColumnValue = columns[0];
                const secondColumnValue = columns[1];
                firstColumnValues.push(firstColumnValue);
                secondColumnValues.push(secondColumnValue);
            }
        }


        // console.log('First Column Values:', firstColumnValues);
        // console.log('Second Column Values:', secondColumnValues);
        // console.log('rows2222: ', rows)
        const labels = firstColumnValues
        .map((dateString, index) => (index % 12 === 0) ? moment(dateString, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD') : '')
        .filter(label => label !== ''); 

        const data1 = secondColumnValues
        .filter((value, index) => index % 12 === 0); 

        return(
            <div>
            <TempGraph2 data1={data1} lineColor={lineColor} labels={labels} id='Graphimg' fillGraph={fillGraph} />
            </div>
        )
    }

    return(
        <div>
            <h1>뭐가 안돼 </h1>
            <p>{id}</p>
        </div>
    )
}
