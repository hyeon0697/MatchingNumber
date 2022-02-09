var numlist = [];
var clickCounter = 0;
var matchingCounter = 0;
var firstClick = 0;
var secondClick = 0;


//리스트형식으로 숫자를 생성함, 생성되는 숫자는 [1,1,2,2,3,3...8,8]
function generate()
{
    for(i=1; i<9; i++)
    {
        for(j=0; j<2; j++)
        {
            numlist.push(i)
        }
    }
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
        document.querySelectorAll(".number")[i].setAttribute("value", numlist[i])
        document.querySelectorAll(".number")[i].setAttribute("name", numlist[i])
    }
}

//클릭 시 첫 클릭 값, 두번째 클릭 값을 받고 검증함수로 넘어감
function checkValue(valueForName, idSearch)
{
    if (clickCounter == 0)
    {
        firstClick = valueForName;
        showPanel(idSearch,valueForName);
        clickCounter++;
    }
    else
    {
        secondClick = valueForName;
        matchingValue(firstClick, valueForName);
    }

}

function showPanel(idSearch,nameForValue)
{
    document.querySelectorAll(".number")[idSearch].setAttribute("value",nameForValue);
}

//검증함수, first클릭과 두번째 클릭이 같을 경우 매칭카운터를 올림
//그리고 클릭 카운터를 초기화시킨다.
//첫째와 두번째가 같지 않을경우, 매칭카운터를 올리지 않고 클릭 카운터만 초기화시킴
function matchingValue(fist, second)
{
    if (fist == second)
    {
        matchingCounter++;
        clickCounter = 0;
        console.log("wow");
        console.log(matchingCounter);
    }
    else
    {
        clickCounter = 0;
    }

}


window.onload=function()
{ 
    var x = document.querySelectorAll(".number").length;
    console.log(x);

    generate();

    shuffle(numlist);
    console.log(numlist);

    arrangement();

    setTimeout(function() {
        for(i=0; i<16; i++)
        {
            document.querySelectorAll(".number")[i].setAttribute("value", "")
        }
      }, 5000);
}

