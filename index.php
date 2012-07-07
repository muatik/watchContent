<div id="container1">1. hello!</div>
<div id="container2">2. hello!</div>
<div id="container3">3. hello!</div>
<button class="change">Change this.</button>
<button class="change1">Change only the first one.</button>
<button class="stop">stop watching the second one</button>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="watchContent.js"></script>
<script>

$('.change').click(function(){

	var utime=new Date().getTime();
	$('div').each(function(){
		$(this).html($(this).attr('id')+':Did it work? utime:'+utime)
	});

});

$('.change1').click(function(){
	$('#container2').html('the first one is changed, right?');
})

$('.stop').click(function(){
	$('#container2').watchContent('stop');
});

var tell = function(t){
	alert('id:'+t.attr('id')+' - new content: '+t.html());
}

$('div').watchContent({
	'callback':tell,
	'interval':500
});


/*
$('#container1').watchContent({
	'callback':tell,
	'interval':1000
});

$('#container3').watchContent({
	'callback':tell,
	'interval':4000
});

$('#container1').watchContent('stop')
*/
</script>
