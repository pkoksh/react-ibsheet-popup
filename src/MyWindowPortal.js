import React, {Component} from 'react';
import IBSheetLoader from '@ibsheet/loader';
import ReactDOM from 'react-dom';

function copyStyles(sourceDoc, targetDoc) {
    Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
      if (styleSheet.cssRules) { // true for inline styles
        const newStyleEl = sourceDoc.createElement('style');
  
        Array.from(styleSheet.cssRules).forEach(cssRule => {
          newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
        });
  
        targetDoc.head.appendChild(newStyleEl);
      } else if (styleSheet.href) { // true for stylesheets loaded from a URL
        const newLinkEl = sourceDoc.createElement('link');
  
        newLinkEl.rel = 'stylesheet';
        newLinkEl.href = styleSheet.href;
        targetDoc.head.appendChild(newLinkEl);
      }
    });
  }
  
class MyWindowPortal extends React.Component {

    
    
    constructor(props) {
        super(props);
        this.pageInfo = {'pageSheets':[]};
        this.containerEl = document.createElement('div'); // STEP 1: create an empty div
        this.containerEl.className = "container";
        this.externalWindow = null;
    }
  
    componentDidMount() {
      // STEP 3: open a new browser window and store a reference to it
      this.externalWindow = window.open('./pop.html', '', 'width=700,height=600,left=200,top=200');
  
    //   var ibsheetScript = this.externalWindow.document.createElement("script");
    //   ibsheetScript.onload = function(){
    //       debugger;
    //   }
    //   ibsheetScript.src="./lib/ibsheet/ibsheet.js";  
    //   this.externalWindow.document.head.appendChild(ibsheetScript);


      // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
      this.externalWindow.document.body.appendChild(this.containerEl);
      
      this.externalWindow.document.title = 'A React portal window';
      copyStyles(document, this.externalWindow.document);
      

      // update the state in the parent component if the user closes the 
      // new window
      this.externalWindow.addEventListener('beforeunload', () => {
        this.props.closeWindowPortal();
      });

      this.externalWindow.addEventListener('load',() => {
          debugger;
        //sheet 객체 생성
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
        var DATA = [{"sDept":"CEO","sTeam":"임원","sPosition":"대표이사","sName":"황정열","sGender":"男","sAgeRange":"50대","sAddr":"서울","sAge":50,"sPeriod":15,"sSalary":10122200,"sBonus":1012220},{"sDept":"SI사업부","sTeam":"임원","sPosition":"상무","sName":"강대호","sGender":"男","sAgeRange":"40대","sAddr":"경기","sAge":47,"sPeriod":15,"sSalary":6756170,"sBonus":675617},{"sDept":"SI사업부","sTeam":"개발1팀","sPosition":"부장","sName":"김미경","sGender":"女","sAgeRange":"30대","sAddr":"강원","sAge":39,"sPeriod":12,"sSalary":4180950,"sBonus":418095},{"sDept":"SI사업부","sTeam":"개발1팀","sPosition":"과장","sName":"김선희","sGender":"女","sAgeRange":"30대","sAddr":"경기","sAge":34,"sPeriod":7,"sSalary":3217000,"sBonus":321700},{"sDept":"SI사업부","sTeam":"개발1팀","sPosition":"과장","sName":"최세희","sGender":"女","sAgeRange":"30대","sAddr":"경기","sAge":32,"sPeriod":3,"sSalary":2750800,"sBonus":275080},{"sDept":"SI사업부","sTeam":"개발1팀","sPosition":"대리","sName":"이명희","sGender":"女","sAgeRange":"20대","sAddr":"서울","sAge":29,"sPeriod":3,"sSalary":2571900,"sBonus":257190},{"sDept":"SI사업부","sTeam":"개발1팀","sPosition":"사원","sName":"노효일","sGender":"男","sAgeRange":"20대","sAddr":"서울","sAge":23,"sPeriod":1,"sSalary":1520150,"sBonus":152020},{"sDept":"SI사업부","sTeam":"개발1팀","sPosition":"사원","sName":"원영국","sGender":"男","sAgeRange":"20대","sAddr":"경기","sAge":28,"sPeriod":2,"sSalary":2557000,"sBonus":255700},{"sDept":"SI사업부","sTeam":"개발1팀","sPosition":"사원","sName":"이지선","sGender":"女","sAgeRange":"20대","sAddr":"서울","sAge":24,"sPeriod":2,"sSalary":2007500,"sBonus":200750},{"sDept":"인사부","sTeam":"인사1팀","sPosition":"부장","sName":"김상도","sGender":"男","sAgeRange":"40대","sAddr":"경기","sAge":40,"sPeriod":9,"sSalary":4290850,"sBonus":429085},{"sDept":"인사부","sTeam":"인사1팀","sPosition":"대리","sName":"한보라","sGender":"女","sAgeRange":"20대","sAddr":"서울","sAge":28,"sPeriod":5,"sSalary":1959500,"sBonus":195950},{"sDept":"인사부","sTeam":"인사2팀","sPosition":"사원","sName":"장태우","sGender":"男","sAgeRange":"20대","sAddr":"서울","sAge":28,"sPeriod":1,"sSalary":1959500,"sBonus":195950},{"sDept":"인사부","sTeam":"인사2팀","sPosition":"차장","sName":"정필석","sGender":"男","sAgeRange":"40대","sAddr":"경기","sAge":40,"sPeriod":4,"sSalary":3851150,"sBonus":385120},{"sDept":"솔루션사업부","sTeam":"임원","sPosition":"이사","sName":"조성목","sGender":"男","sAgeRange":"40대","sAddr":"경기","sAge":41,"sPeriod":15,"sSalary":6313700,"sBonus":631370},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPosition":"부장","sName":"유봉근","sGender":"男","sAgeRange":"40대","sAddr":"서울","sAge":42,"sPeriod":5,"sSalary":5187610,"sBonus":518760},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPosition":"차장","sName":"오필환","sGender":"男","sAgeRange":"30대","sAddr":"서울","sAge":37,"sPeriod":4,"sSalary":3412510,"sBonus":341250},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPosition":"차장","sName":"송복석","sGender":"男","sAgeRange":"30대","sAddr":"경기","sAge":39,"sPeriod":6,"sSalary":3871680,"sBonus":387170},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPosition":"과장","sName":"김남연","sGender":"男","sAgeRange":"30대","sAddr":"서울","sAge":36,"sPeriod":4,"sSalary":3500700,"sBonus":350070},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPosition":"대리","sName":"한혜선","sGender":"女","sAgeRange":"20대","sAddr":"서울","sAge":29,"sPeriod":2,"sSalary":2746000,"sBonus":274600},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPosition":"사원","sName":"조미미","sGender":"女","sAgeRange":"20대","sAddr":"서울","sAge":25,"sPeriod":2,"sSalary":2297040,"sBonus":229700},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPosition":"사원","sName":"고은혜","sGender":"女","sAgeRange":"20대","sAddr":"서울","sAge":26,"sPeriod":1,"sSalary":2390740,"sBonus":239070},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPosition":"사원","sName":"성열","sGender":"男","sAgeRange":"20대","sAddr":"서울","sAge":27,"sPeriod":1,"sSalary":2409000,"sBonus":240900},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPosition":"사원","sName":"김영중","sGender":"女","sAgeRange":"20대","sAddr":"인천","sAge":28,"sPeriod":3,"sSalary":2871100,"sBonus":287110}];

        //loader를 이용한 시트 생성 (임의의 id로 시트객체가 생성)
        IBSheetLoader.createSheet({
            el:  this.externalWindow.document.getElementById("sheetDIV"),
            options: OPT,
            data: DATA
        }).then((sheet) => {
            // 생성된 시트 id를 pageSheets 배열에 넣어둠
            this.pageInfo["pageSheets"].push(sheet.id);
        });
      })

     
    }
  
    componentWillUnmount() {
        // This will fire when this.state.showWindowPortal in the parent component becomes false
        // So we tidy up by just closing the window
        //ibsheet 제거
        for(var i=0;i<this.pageInfo.pageSheets.length;i++){
            IBSheetLoader.removeSheet(this.pageInfo.pageSheets[i]);
        }
        this.pageInfo = null;

        this.externalWindow.close();
    }
    
    render() {
      // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
      return ReactDOM.createPortal(this.props.children, this.containerEl);
    }
  }

  export default MyWindowPortal