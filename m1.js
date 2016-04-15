/**
 * Created by Administrator on 2016/4/14.
 */
var data = [1,2,3,4,5,6];
var currIndex = 0;
var rendNum = 3;
var isTouch = false;

$(function() {

    console.log('data: ', data);


    for (var i = 0; i < data.length; i++) {
        var index = data[i];
        $("#dot").append('<div class="circle circle-' + index + '"></div>')
        $(".circle-" + index).css("margin-left", "15px");

    }

    //$("#container").css('x',-$(window).width()+"px");


    var container = document.getElementById("container");
    var pages = document.querySelectorAll('.page');
    var slip = Slip(container, 'x').webapp(pages);
    //slip.setAni();
    rendCurr();
    //slip.setCoord({x: -$(window).width(), y: 0});


    slip.start(function () {
        isTouch = true;
        console.log('start', this.page);
        var _num = data[currIndex];
        $(".circle-" + _num).css("background", "#BCBCBC");
    })
    slip.end(function () {
        console.log('end', this.page, this.orient[0]);
        if (this.orient[0] == 'left') {
            currIndex++;
        } else {
            currIndex--;
        }
        currIndex = indexCheck(currIndex);
        var _num = data[currIndex];
        $(".circle-" + _num).css("background", "red");
        setTimeout(rendCurr,400);
        setTimeout(function(){isTouch=false},4400);
    });
    function rendCurr() {


        $("#container").css('width', $(window).width() * rendNum + 'px');
        for (var i = 0; i < rendNum; i++) {
            var diff = -((rendNum - 1) / 2) + i;
            //console.log('rendnum :',index);
            index = currIndex + diff;
            index = indexCheck(index);

            var _num = data[index];
            console.log('index ', index,'_num', _num,'currIndex',currIndex);
            //$("#container").append('<div class="page page-'+diff+'"></div>')
            $(".page-" + diff).css("background-image", "url(" + _num + ".png)");

            $(".page").css('width', $(window).width() + "px");
            $(".page").css('height', ($(window).width() / 640) * 360 + "px");
            if (index == currIndex)$(".circle-" + _num).css("background", "red");
        }
        slip.setAni(0);
        slip.setCoord({'x': -$(window).width()});
    }

    function indexCheck(index) {
        if (index > data.length - 1)index = 0;
        if (index < 0)index = data.length + index;
        return index;
    }

    var that = this;
    setInterval(function(){
        if(!isTouch)
        {
            var _num = data[currIndex];
            $(".circle-" + _num).css("background", "#BCBCBC");
            currIndex++;
            currIndex = indexCheck(currIndex);
            slip.setAni(400);
            slip.setCoord({'x': -$(window).width()*2});
            setTimeout(rendCurr,400);
        }

    },4000);
});