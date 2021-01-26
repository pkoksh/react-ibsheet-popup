import {useState, useEffect} from 'react';
import IBSheetLoader from '@ibsheet/loader';
import './App.css';






function Home() {
  // 페이지 공통 변수
  let pageInfo = {'pageSheets':[]};
  const sheetSize = {
    width:"100%",
    height:"400px"
  }
  function retrieve(){
    alert(1);
  }

  useEffect(() => {

    // alert("pageLoading")
    // 시트 생성 준비 완료 이벤트
   
        
        var OPT = {
            //공통기능 설정 부분
            "Cfg": {
                // "InfoRowConfig":{Visible:0}
                HeaderCheck:1,
            },
            //중앙(메인) 컬럼 설정
            "Cols": [
                {"Header": "Home","Type": "Bool","Name": "CHK"},
                {"Header": "부서명","Type": "Text","Name": "sDept",Width:100},
                {"Header": "팀명","Type": "Text","Name": "sTeam",Width:90},
                {"Header": "직급","Type": "Text","Name": "sPosition",Width:120},
                {"Header": "성명","Type": "Text","Name": "sName",Width:90},
                {"Header": "성별","Type": "Enum","Name": "sGender","Align": "Center","Enum": "|男|女|기타","EnumKeys": "|男|女|기타"},
                {"Header": "거주지","Type": "Text","Name": "sAddr","Align": "Center",Width:150},
                {"Header": "나이","Type": "Int","Name": "sAge","Width": "130","Align": "Right"},
                {"Header": "근속기간(년)","Type": "Int","Name": "sPeriod","Align": "Right"},
                {"Header": "급여","Type": "Int","Name": "sSalary","Align": "Right","Format": "#,###"},
                {"Header": "상여","Type": "Int","Name": "sBonus","Align": "Right","Format": "#,###"}
            ],
        };
        

        //loader를 이용한 시트 생성 (임의의 id로 시트객체가 생성)
        IBSheetLoader.createSheet({
            el: 'homeSheetDiv',
            options: OPT,
        }).then(function(sheet){
            // alert("createSheet!!");
            // 생성된 시트객체를 페이지 공통 객체에 넣어두고 사용
            pageInfo["sheet1"] = sheet;

            // 생성된 시트 id를 pageSheets 배열에 넣어둠
            pageInfo["pageSheets"].push(sheet.id);
        });

    
    return ()=>{
      // alert("Home pageUnloading");
      if(pageInfo["pageSheets"].length>0){
        for(var i=0;i<pageInfo.pageSheets.length;i++){
          IBSheetLoader.removeSheet(pageInfo.pageSheets[i]);
        }
        pageInfo = null;
      }
    };

  });
  return (
    <div className="contents">
      <header>
        <h1>Home page</h1>
        <button onClick={retrieve}>데이터조회</button>
      </header>
      <article>
        <div id="homeSheetDiv" style={sheetSize}/>
      </article>
    </div>
  );
}

export default Home;
