import React, {useState} from 'react' ;
import './App.css';

function App() {

  let [title, titletrans] = useState(['남자 코트 추천','춤추기','노래하기']);
  let titlearr=[...title];  
  let [count, counttrans] = useState(Array(titlearr.length).fill(0));
  let [modal, modaltrans] = useState(false);
  let [detail, detailtrans] = useState(0);
  let [inputs, inputtrans] = useState('');


  return (
    <div className="App">

      <div className="black-nav">
        <div style = {{fontsize: '30px'}}>개발 Blog</div>
      </div>
  

      {
        title.map(function(a,i){
          return(
            <div key={i}>
                  <div className='list'>
                <h3 onClick={()=>{modaltrans(!modal); detailtrans(i);}} >{ a }
                {/* {console.log(i)} */}
                <span onClick={()=>{ //뉴어레이에 맵돌려보자
                  let newArray=[...count];
                 newArray[i]+=1
                  counttrans(newArray);
                }}>👍</span>
                  
                  {count[i]}</h3>
                <p>2월 17일 발행</p>
                <hr/>
                </div>
      
              </div>

          )

        })

      }

      <div className="publish">
        <input onChange={(e)=>{inputtrans(e.target.value)}}/>
        <button onClick={()=>{
          var arrayCopy=[...title];
            arrayCopy.unshift(inputs);
            titletrans(arrayCopy);
            
            }}>저장</button>

      </div>


      {
        modal===true
        ? <Modal title={title} detail={detail}/>
        : null
      }

    </div>
  );
}

function Modal(props){
  return(
    <div className='modal'>
      <h3>{props.title[props.detail]}</h3>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}



