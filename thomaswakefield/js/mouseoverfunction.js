$(document).ready(function(){

//$("div").css("border","1px solid blue");

var count = 0;

var array = ["filler", "area[alt='comment1']", "area[alt='comment2']", "area[alt='comment3']", "area[alt='comment4']", "area[alt='comment5']", "area[alt='comment6']", "area[alt='comment7']", "area[alt='comment8']", "area[alt='comment9']", "area[alt='comment10']", "area[alt='comment11']", "area[alt='comment12']", "area[alt='comment13']", "area[alt='comment14']", "area[alt='comment15']", "area[alt='comment16']", "area[alt='comment17']", "area[alt='comment18']", "area[alt='comment19']", "area[alt='comment20']", "area[alt='comment21']", "area[alt='comment22']", "area[alt='comment23']", "area[alt='comment24']", "area[alt='comment25']", "area[alt='comment26']", "area[alt='comment27']", "area[alt='comment28']", "area[alt='comment29']", "area[alt='comment30']", "area[alt='comment31']", "area[alt='comment32']", "area[alt='comment33']", "area[alt='comment34']", "area[alt='comment35']", "area[alt='comment36']", "area[alt='comment37']", "area[alt='comment38']", "area[alt='comment39']", "area[alt='comment40']", "area[alt='comment41']", "area[alt='comment42']", "area[alt='comment43']", "area[alt='comment44']", "area[alt='comment45']", "area[alt='comment46']", "area[alt='comment47']", "area[alt='comment48']", "area[alt='comment49']", "area[alt='comment50']", "area[alt='comment51']", "area[alt='comment52']", "area[alt='comment53']", "area[alt='comment54']", "area[alt='comment55']", "area[alt='comment56']", "area[alt='comment57']", "area[alt='comment58']", "area[alt='comment59']", "area[alt='comment60']", "area[alt='comment61']", "area[alt='comment62']", "area[alt='comment63']", "area[alt='comment64']", "area[alt='comment65']", "area[alt='comment66']", "area[alt='comment67']", "area[alt='comment68']", "area[alt='comment69']", "area[alt='comment70']", "area[alt='comment71']"];

$("#gen").mapster({
	fillColor:'7ec7dc',
	fillOpacity:.1,
	stroke:true,
	render_select:{
		strokeWidth:1.5,
		fillColor:'ff0000',	
		strokeColor:'ff0000'

		},
	render_highlight:{
		strokeWidth:3,
	    fillOpacity:.25,
		fillColor:'ff0000',
		strokeColor:'ff0000'

		},
    mapKey:'data-title',
    /*
    boundList: '.popup',
    listKey: 'data-title',
    listSelectedClass: 'selected',
	*/
    areas:[
    {key:"popup1"},
    {key:"popup2",
    render_select:{
    	//fillColor:'00ff00'
    	}
    },
    {key:"popup3"},
    {key:"popup4"}

]
});

  // this function allows you to drag the comments. make sure it stays before the hide function
  $(function() {
  	    $(".popup")
      .wrap('<div/>')
        .css({'overflow':'hidden'})
          .parent()
            .css({'display':'inline-block',
                  'overflow':'hidden',
                  'height':function(){return $('.resizable',this).height();},
                  'width':  function(){return $('.resizable',this).width();},
                  'paddingBottom':'12px',
                  'paddingRight':'12px'
                  
                 })
   
    $( '.popup')
       .draggable()
       .resizable()
       .find('.resizable')
                      .css({overflow:'auto',
                            width:'100%',
                            height:'100%'});
  });

// EDIT THE FOLLOWING FUNCTION SO THAT IT IS ONLY FOR AN X IN THE CORNER


       
$("area[alt='comment1']").click(function(){
	toggleCommentLeft(this,"#popup1")
});
$("area[alt='comment2']").click(function(){
		toggleCommentLeft(this,"#popup2")
})
$("area[alt='comment3']").click(function(){
	/*
	var p = "\"#" + this.title + "\"";
	console.log(p)	
	*/	
	toggleCommentLeft(this,"#popup3")
})
$("area[alt='comment4']").click(function(){
		toggleCommentLeft(this,"#popup4")
})
$("area[alt='comment5']").click(function(){
		toggleCommentLeft(this,"#popup5")
})
$("area[alt='comment6']").click(function(){
		toggleCommentLeft(this,"#popup6")
})
$("area[alt='comment7']").click(function(){
		toggleCommentLeft(this,"#popup7")
})
$("area[alt='comment8']").click(function(){
		toggleCommentLeft(this,"#popup8")
})
$("area[alt='comment9']").click(function(){
		toggleCommentLeft(this,"#popup9")
})
$("area[alt='comment10']").click(function(){
		toggleCommentLeft(this,"#popup10")
})
$("area[alt='comment11']").click(function(){
		toggleCommentLeft(this,"#popup11")
})
$("area[alt='comment12']").click(function(){
		toggleCommentLeft(this,"#popup12")
})
$("area[alt='comment13']").click(function(){
		toggleCommentLeft(this,"#popup13")
})
$("area[alt='comment14']").click(function(){
		toggleCommentLeft(this,"#popup14")
})
$("area[alt='comment15']").click(function(){
		toggleCommentLeft(this,"#popup15")
})
$("area[alt='comment16']").click(function(){
		toggleCommentLeft(this,"#popup16")
})
$("area[alt='comment17']").click(function(){
		toggleCommentRight(this,"#popup17")
})
$("area[alt='comment18']").click(function(){
		toggleCommentRight(this,"#popup18")
})
$("area[alt='comment19']").click(function(){
		toggleCommentRight(this,"#popup19")
})
$("area[alt='comment20']").click(function(){
		toggleCommentRight(this,"#popup20")
})
$("area[alt='comment21']").click(function(){
		toggleCommentRight(this,"#popup21")
})
$("area[alt='comment22']").click(function(){
		toggleCommentRight(this,"#popup22")
})
$("area[alt='comment23']").click(function(){
		toggleCommentRight(this,"#popup23")
})
$("area[alt='comment24']").click(function(){
		toggleCommentRight(this,"#popup24")
})
$("area[alt='comment25']").click(function(){
		toggleCommentRight(this,"#popup25")
})
$("area[alt='comment26']").click(function(){
		toggleCommentRight(this,"#popup26")
})
$("area[alt='comment27']").click(function(){
		toggleCommentRight(this,"#popup27")
})
$("area[alt='comment28']").click(function(){
		toggleCommentRight(this,"#popup28")
})
$("area[alt='comment29']").click(function(){
		toggleCommentRight(this,"#popup29")
})
$("area[alt='comment30']").click(function(){
		toggleCommentRight(this,"#popup30")
})
$("area[alt='comment31']").click(function(){
		toggleCommentRight(this,"#popup31")
})
$("area[alt='comment32']").click(function(){
		toggleCommentRight(this,"#popup32")
})
$("area[alt='comment71']").click(function(){
		toggleCommentLeft(this,"#popup71")
})
$("area[alt='comment33']").click(function(){
		toggleCommentRight(this,"#popup33")
})
$("area[alt='comment34']").click(function(){
		toggleCommentRight(this,"#popup34")
})
$("area[alt='comment35']").click(function(){
		toggleCommentRight(this,"#popup35")
})
$("area[alt='comment36']").click(function(){
		toggleCommentLeft(this,"#popup36")
})
$("area[alt='comment37']").click(function(){
		toggleCommentLeft(this,"#popup37")
})
$("area[alt='comment38']").click(function(){
		toggleCommentLeft(this,"#popup38")
})
$("area[alt='comment39']").click(function(){
		toggleCommentLeft(this,"#popup39")
})
$("area[alt='comment40']").click(function(){
		toggleCommentLeft(this,"#popup40")
})
$("area[alt='comment41']").click(function(){
		toggleCommentLeft(this,"#popup41")
})
$("area[alt='comment42']").click(function(){
		toggleCommentLeft(this,"#popup42")
})
$("area[alt='comment43']").click(function(){
		toggleCommentLeft(this,"#popup43")
})
$("area[alt='comment44']").click(function(){
		toggleCommentLeft(this,"#popup44")
})
$("area[alt='comment45']").click(function(){
		toggleCommentLeft(this,"#popup45")
})
$("area[alt='comment46']").click(function(){
		toggleCommentLeft(this,"#popup46")
})
$("area[alt='comment47']").click(function(){
		toggleCommentLeft(this,"#popup47")
})
$("area[alt='comment48']").click(function(){
		toggleCommentLeft(this,"#popup48")
})
$("area[alt='comment49']").click(function(){
		toggleCommentLeft(this,"#popup49")
})
$("area[alt='comment50']").click(function(){
		toggleCommentLeft(this,"#popup50")
})
$("area[alt='comment51']").click(function(){
		toggleCommentLeft(this,"#popup51")
})
$("area[alt='comment52']").click(function(){
		toggleCommentLeft(this,"#popup52")
})
$("area[alt='comment53']").click(function(){
		toggleCommentLeft(this,"#popup53")
})
$("area[alt='comment54']").click(function(){
		toggleCommentLeft(this,"#popup54")
})
$("area[alt='comment55']").click(function(){
		toggleCommentLeft(this,"#popup55")
})
$("area[alt='comment56']").click(function(){
		toggleCommentLeft(this,"#popup56")
})
$("area[alt='comment57']").click(function(){
		toggleCommentLeft(this,"#popup57")
})
$("area[alt='comment58']").click(function(){
		toggleCommentLeft(this,"#popup58")
})
$("area[alt='comment59']").click(function(){
		toggleCommentLeft(this,"#popup59")
})
$("area[alt='comment60']").click(function(){
		toggleCommentLeft(this,"#popup60")
})
$("area[alt='comment61']").click(function(){
		toggleCommentLeft(this,"#popup61")
})
$("area[alt='comment62']").click(function(){
		toggleCommentLeft(this,"#popup62")
})
$("area[alt='comment63']").click(function(){
		toggleCommentLeft(this,"#popup63")
})
$("area[alt='comment64']").click(function(){
		toggleCommentLeft(this,"#popup64")
})
$("area[alt='comment65']").click(function(){
		toggleCommentLeft(this,"#popup65")
})
$("area[alt='comment66']").click(function(){
		toggleCommentLeft(this,"#popup66")
})
$("area[alt='comment67']").click(function(){
		toggleCommentLeft(this,"#popup67")
})
$("area[alt='comment68']").click(function(){
		toggleCommentLeft(this,"#popup68")
})
$("area[alt='comment69']").click(function(){
		toggleCommentLeft(this,"#popup69")
})
$("area[alt='comment70']").click(function(){
		toggleCommentLeft(this,"#popup70")
})





$("#make-small").bind("click",function(){
	$("#gen").mapster("resize",600,0,1e3)
	});
$("#make-large").bind("click",function(){
	$("#gen").mapster("resize",1200,0,1e3)
	});
$("#make-normal").bind("click",function(){
	$("#gen").mapster("resize",825,0,1e3)
	});
$("#make-any").bind("click",function() {
        $("#gen").mapster("resize", $('#new-size').val(), 0, 1000);
    });

$("#close-all").bind("click",function() {

    $(".popup").hide() 
    for(var i = 1;i < 72; i++) {
     $(array[i]).mapster('deselect')
    }


});

function bringForward(popup){
	var pop=$(".popup");
	var popLength=$("div").length;
	/*var count=parseInt($(popup).css("z-index"));*/
	count=count+1;
	$(popup).css("z-index",count)
	}

function toggleCommentLeft(comment,popup){
	bringForward(popup);
	var x, y, position=$(comment).attr("coords").split(",");
	x=+position[0];
	y=+position[1]+100;
	count=count+1;
	$(popup).css("z-index",count)
	$(popup).css({
		position:"absolute",
		top:y+"px",
		left:x+"px"
		}).toggle()
	}


function toggleCommentRight(comment,popup){
	bringForward(popup);
	var x, y, position=$(comment).attr("coords").split(",");
	x=+position[0]+350;
	y=+position[1]+100;
	count=count+1;
	$(popup).css("z-index",count)
	$(popup).css({
		position:"absolute",
		top:y+"px",
		left:x+"px"
		}).toggle()

}

$('.close').mouseover(function(){
        $(this).addClass('closeColor');
    }).mouseout(function(){
        $(this).removeClass('closeColor');
});

/*
$(".close").mouseover(function(){

	$(this).css({
	color: "#f50e0e",
	})
});

$(".close").mouseout(function(){

	$(this).css({
	color: "#212121",
	})

});
*/

$(".popup").mousedown(function(){

    count=count+1;
	$(this).css("z-index",count) 
	$(this).css({
		position:"absolute",
		}).show()
});

$(".close").on("click", function(){

	var x = $(this).parent().parent().parent();
	var num = $(x).attr("number");

     $(x).hide() 


     $(array[num]).mapster('deselect');


     /* $("area[alt='comment1']").mapster('deselect'); */

    console.log($(num)) 
    console.log($(x)) 
    console.log($(array[num])) 

});


/*
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(300, 150);
ctx.stroke();
    $(c).show();
    */




});