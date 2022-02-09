var numlist = [];
var clickCounter = 0;
var matchingCounter = 0;
var firstClick = 0;

var matching = document.querySelector('.matching');
var time = document.querySelector('.time');

var cong = document.querySelector('.cong');

//스톱워치 붙여온 코드
// timer();를 호출하여 시작함.
var sec = 0;
var min = 0;
var hrs = 0;
var t;

//틱 계산
function tick(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hrs++;
        }
    }
}

//화면을 갱신하기 위한 함수
function add() {
    tick();
    time.textContent = 'Time : ' + (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}

//시간이 흐르게 하는 함수
function timer() {
    t = setTimeout(add, 1000);
}

//여기까지

function init()
{
    //숫자짝을 생성하기위한 배열 
    numlist = [];
    //현재 몇번 클릭했는지를 알기 위한 카운터
    clickCounter = 0;
    //몇개의 짝을 맞췄는지에 대한 카운터
    matchingCounter = 0;
    //첫번째 클릭에 담긴 숫자를 알기 위한 카운터
    firstClick = 0;
    //현재 몇개의 짝을 매치시켰는지 사용자에게 보여주는 메세지창
    matching.textContent = 'Find Matching : ';
    //짝맞추기를 시작한지 얼마나 지났는지 사용자에게 보여주는 메세지창
    time.textContent = 'Time : 00:00:00';

    //8개의 짝을 다 맞췄을 경우 축하 메세지를 보내는 창
    cong.textContent = '';
    cong.backgroundColor = 'white';

    sec = 0;
    min = 0;
    hrs = 0;
    clearTimeout(t);
}


//리스트형식으로 숫자를 생성함, 생성되는 숫자는 [1,1,2,2,3,3...8,8]
function generate()
{
    //생성자, 초기화를 담당함
    init();

    for(i=1; i<9; i++)
    {
        for(j=0; j<2; j++)
        {
            //배열에 1부터 8까지의 숫자를 두개씩 밀어넣음
            numlist.push(i)
        }
    }

    //생성된 숫자 섞기
    shuffle(numlist);

    //재배열
    arrangement();

    //시작 버튼을 누르고 5초 후 
    setTimeout(function() {
        for(i=0; i<16; i++)
        {
            //재배열된 숫자를 가리고 버튼을 활성화시킴
            document.querySelectorAll(".number")[i].disabled = false;
            document.querySelectorAll(".number")[i].setAttribute("value", "")
        }
      }, 5000);
    
    //5초 후 타이머 시작
    setTimeout(function() {
        timer();
    }, 5000);
      
}

//생성된 숫자를 섞어줌, -0.5는 0~1까지 생성되는 랜덤함수의 정확히 절반이기 때문.
function shuffle(array) 
{ 
    array.sort(() => Math.random() - 0.5); 
}

//함수가 호출 될 시 클래스로 넘버를 가지고 있는 요소에 대하여 벨류와 아이디값을 집어넣음. 
function arrangement()
{
    for(i=0; i<16; i++)
    {
        //재배열되는동안 버튼을 비활성화 시키고, 밸류와 네임에 배열의 순서에 값을 매칭시켜서 넣음
        document.querySelectorAll(".number")[i].disabled = true;
        document.querySelectorAll(".number")[i].setAttribute("value", numlist[i])
        document.querySelectorAll(".number")[i].setAttribute("name", numlist[i])
    }
}

//클릭 시 첫 클릭 값, 두번째 클릭 값을 받고 검증함수로 넘어감
function checkValue(valueForName, idSearch)
{
    if (clickCounter == 0)
    {
        //첫번째 클릭시, 넘어온 값을 firstclick에 담음
        firstClick = valueForName;
        //첫번째 클릭시 넘어온 값을 firstId에 담음
        firstId = idSearch
        //firstId에 담긴 값과 현재 네임에 담긴 벨류값을 showPanel함수에 넘김
        showPanel(idSearch,valueForName);
        //클릭카운터를 1 올림 clickCounter == 1
        clickCounter++;
    }
    else
    {
        showPanel(idSearch,valueForName);
        //두번째 클릭까지 완료되었으므로, 매칭함수에 값을 넘겨 판단시킴, 넘기는 매개변수로는 첫 클릭 값, 두번째 클릭 값, 첫 아이디, 두번째 아이디
        matchingValue(firstClick, valueForName, firstId, idSearch);
    }

}

//넘겨받은 아이디값으로 클릭된 버튼의 위치를 찾고 벨류를 바꾼다.
//클릭은 한번만 가능하게 버튼을 비활성화 시킨다..
function showPanel(idSearch,nameForValue)
{
    document.querySelectorAll(".number")[idSearch].setAttribute("value",nameForValue);
    document.querySelectorAll(".number")[idSearch].disabled = true;
}

//넘겨받은 아이디값으로 클릭된 버튼의 위치를 찾고 밸류를 비운다.
function disabledPanel(idSearch)
{
    document.querySelectorAll(".number")[idSearch].setAttribute("value","");
    document.querySelectorAll(".number")[idSearch].disabled = false;
}

//검증함수, first클릭과 두번째 클릭이 같을 경우 매칭카운터를 올림
//그리고 클릭 카운터를 초기화시킨다.
//첫째와 두번째가 같지 않을경우, 매칭카운터를 올리지 않고 클릭 카운터만 초기화시킴
function matchingValue(fist, second, fid, sid)
{
    if (fist == second)
    {
        //두 값이 일치하므로 매칭카운터를 올린다
        matchingCounter++;
        //클릭 카운터를 초기화함
        clickCounter = 0;
        //사용자에게 보여주는 캐칭값을 올려줌
        matching.textContent = 'Find Matching : ' + matchingCounter;
    }
    else
    {
        //클릭 카운터를 초기화함
        clickCounter = 0;
        //1초 뒤 두 패널이 안보이게 하고 활성화시킴.
        setTimeout(function() {
            disabledPanel(fid)
            disabledPanel(sid)
        }, 1000);
    }

    //매칭카운터가 8이 되었을 경우
    if (matchingCounter == 8)
      {
        //타이머의 움직임을 멈추기 위한 함수
        clearTimeout(t);
        //축하메세지를 출력함
        cong.textContent = 'Congratulations! You Win!';
        cong.style.backgroundColor = 'green';
      }

}

//화면이 로딩되고 실행되는 것들. 기본 버튼을 디저블함.
window.onload=function()
{ 
    for(i=0; i<16; i++)
    {
        //시작 시 기본 상태의 버튼을 누르지 못하게 비활성화 시킴
        document.querySelectorAll(".number")[i].disabled = true;
    }
    
}
