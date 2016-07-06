/**
 * Created by Yuval on 6/20/2016.
 */
var themeColor = ["blue","purple","red","green"];//this var holds the color of the theme//
var panels = [
    {title:" Money Transfer Status ", type: "chart"},
    {title:" Rich VS Broke ", type: "chart"},
    {title:" Online Slaves ", type: "table"},
    {title:" Money Stolen ", type: "data"}
    ];
//console.log(panels[0].title);
//for (index = 0; index < 4; index++) {
//    console.log(panels[index].title);
////}
////for (x=0; x<=20;x++){
////if (x>10){console.log( x+" larger than 10")}
////    else if (x<10){console.log ( x+" smaller than 10")}
////    else {console.log ("equals 10")}
////}
//for (x=0; x<=10;x++){
//    console.log(x+"*9="+ x*9)}
//}
//this event has been triggered once the page is loaded.
$(document).ready(function(){
    //attach click event to color change list
    $("ul li[value]").click(function(){
        colorChange($(this).attr("value"))
    });
        $("#steal-money-btn").click(function(){
            console.log("Button Was Clicked");
        });
    //click on shady-switcher button
    $(".shady-switcher").click(function(){
        var switcherBtn = $(this);
        var panelBody = switcherBtn.parents("div.panel").children("div.panel-body");
        if (switcherBtn.hasClass("glyphicon-menu-up"))
        {
            //if panel is expanded do something
             panelBody.slideUp();
            switcherBtn.addClass("glyphicon-menu-down").removeClass("glyphicon-menu-up");
        }
        else{
            panelBody.slideDown()
            switcherBtn.addClass("glyphicon-menu-up").removeClass("glyphicon-menu-down");
        }
    });

                drawPieChart();//this is the pie chart
                drawColumnChart();//this is the rich vs broke column chart

                getData();
                shadyStolenFunds();
}); //end of document ready

function colorChange(panelColor){

    $(".shady-panel-heading").removeClass("background-color-blue background-color-red background-color-yellow background-color-green background-color-purple").addClass("background-color-" + panelColor);
}
function textColor(panelTitle) {
    var choosePanelTitle = document.getElementsByClassName("panel-title");
    for (i = 0; i < choosePanelTitle.length; i++) {
        choosePanelTitle[i].style.color = panelTitle
    }
}
function arrowDirection (dir){

    console.log(dir);
}
//arrowDirection("left");
//arrowDirection("right");


//console.log(themeColor);
//themeColor = "purple";
//if (themeColor != "Red")
//{console.log("The Theme Color Is "+themeColor);}
//for (i= 0;i<themeColor.length;i++){console.log(themeColor [i])};//{means function}, [means array], {statment}


//function numberChoice (x,y){
//    console.log(x*y)
//}
//numberChoice(5,10);
//
//function dayOfWeek(dayOfWeek){
//    console.log("today is "+dayOfWeek)
//}
//dayOfWeek("Mon");
//dayOfWeek("Tue");
//dayOfWeek("Shabes!");
//
//function request(person,plusAge){
//    console.log(person+" is "+plusAge)
//}
//request("john",15);
//request("Tom",35);
//
//function biggySmalls (x,y){
//    if(x>y){
//    console.log("Number one is bigger bro");}
//    else if(x<y){
//    console.log("Tupac is alive");}
//    else{
//    console.log("I'm broke");}
//}
//biggySmalls(10,9);
//
//function myMonth(myMonth){
//    if (myMonth=="May")
//    console.log("What Beautiful Weather");
//    else if (myMonth)
//    console.log(myMonth)
//}
//myMonth("May");
//myMonth("September");
//
//$(".panel");
//$("div");
//$("#middle");
//$("button.btn1");
//
//function hadasha(x){
//    if(typeof(x)=="number")
//    console.log(x+2);
//    else
//    console.log(typeof(x));
//}
//hadasha(3);
//hadasha("tiruf");
//hadasha(true);
//
//function cityName(x){
//    console.log(x);
//}
//var city = "Barcelona";
//cityName(city);
//
//function oneToSeven(x){
//    if (x == 1)
//    return "Sunday";
//    if (x == 2)
//        return "Monday";
//    if (x == 3)
//        return "Tuesday";
//    if (x == 4)
//        return "Wednesday";
//    if (x == 5)
//        return "Thursday";
//    if (x == 6)
//        return "Friday";
//    if (x == 7)
//        return "Shabat Hayom!!!";
//}
//var dayName = oneToSeven(7);
//console.log(dayName);

function status (onOff){
    if (onOff=="on")
    return "online-status";
    if (onOff=="off")
    return "offline-status";
}
//function myHeight(){
//    $.ajax({
//        method: "get",
//        url: "data/height.json"
//    })
//        .done(function(series){
//            //i don't get this part, its the only thing that's stucking me
//        })
//}
var arr1 = [120, 130, 140, 150, 160];
var arr2 = ["Charlie", "Shimon", "Zroobavel", "Mr.Miagi"];
var peeps = [[1,2],[3,4],[5,6]];
alert(peeps[0][0]);
var specs = {
    Developer: "Oneplus",
    color: "Sand Black",
    platform: "Android"
};
var drink ={
    sugar: [true,false],
    company: ["Shwepps","coca cola","martini"],
    size: [250, 330, 500]
}
var personality = {
    name: "John W Bush",
    age: 64,
    email: ["gbush@gmail.com", "gbushkingshlong@yahoo.com"],
    address:{
        houseName: "White House",
        number: 35,
        city: "Washington D.C"

    }
}



function drawPieChart(){
    $.ajax({
        method: "get",
        url: "data/pieChart.json"
    })
        .done(function(series){
            var pieData = {
                labels: ["Funds Currently Held", "Failed Transfers", "Complete Transfers"],
                series: series
            };
            new Chartist.Pie("#pieChart", pieData);
        })
}

function drawColumnChart() {
    $.ajax({
       method: "get",
       url: "data/barChart.json"
   })
       .done(function(series){
           var barData = {
               labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
               series:series
           };
           new Chartist.Bar("#barChart", barData,{
               plugins:[
                   Chartist.plugins.legend({
                       legendNames:["Rich","Broke"]
                   })
               ]
           });
       })


}
//nobody knows :( this function orders a request data
function getData(){
    $.ajax({
        method: "get",
        url: "data/slaves.json"
    })
        .done(function(res) {
            var tableHTML ='';
            var statusClass;
            for(var i=0 ; i<res.length ;i++){
                if (res[i].status=="online")
                    statusClass="glyphicon glyphicon-thumbs-up online-status";
                else {
                    statusClass="glyphicon glyphicon-thumbs-down offline-status";
                }
                tableHTML +=
                    '<tr>'+
                        '<td>'+ res[i].name +'</td>'+
                        '<td><span class="'+statusClass+'" aria-hidden="true"></span></td>'+
                        '<td>'+ res[i].location +'</td>'+
                        '<td>'+ res[i].lastOnline +'</td>'+
                        '</tr>'
            }
            $("#shady-slaves").html(tableHTML);
        });
}
function shadyStolenFunds(){
    $.ajax({
        method: "get",
        url: "data/moneyStolen.json"
    })
        .done(function(moneyStolen){
            $("#shady-objective").html(moneyStolen.shadyFunds)
        })
}