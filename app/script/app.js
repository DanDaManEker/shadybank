//page on load - bootstrapping the app!
$(document).ready(function(){
    //attach click event to color change list
    $("ul li[value]").click(function(){
        colorChange($(this).attr("value"))
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
            panelBody.slideDown();
            switcherBtn.addClass("glyphicon-menu-up").removeClass("glyphicon-menu-down");
        }
    });

    drawPieChart();//this is the pie chart
    drawColumnChart();//this is the rich vs broke column chart
    $(".progress-bar-ascending").animate({
        width: "75%"
    }, 2500);
    //progress(100, $('#progress'));

    getData();
    shadyStolenFunds();

    //init the clock counter
    var cdClock = $('#clock').countdown('2016/10/10 12:34:56')
        .on('update.countdown', function(event) {
        $(this).html(event.strftime('%D days %H:%M:%S'));
    });
    $("#steal-money-btn").on('click', function(){
        cdClock.countdown('2016/12/31 12:34:56');
        //need to zero down the funds/timer...we'll see
        //need to add a next theft will be available on a date in between the one set and today
    });
}); //end of document ready

function colorChange(panelColor) {

    $(".shady-panel-heading").removeClass("background-color-blue background-color-red background-color-yellow background-color-green background-color-purple").addClass("background-color-" + panelColor);
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

function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 1000).html("$"+ percent);
}
//this is the animated progress bar

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

//get the data for the slaves table
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