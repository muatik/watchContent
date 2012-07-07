$.watchContent={
	containers:new Array()
}

jQuery.fn.watchContent = function (options) {
	

	if(options=='stop'){
		this.each( function() {
			stop($(this));
		})
		return false;
	}

	var settings = $.extend( {
		'callback':null,
		'interval':300 // in milisecond
	}, options );
	
	
	return this.each( function() {
		
		var $this=$(this);
		
		var unqClass='_watchContainerId' + Math.floor( Math.random()*1000 );
		$this.addClass(unqClass);

		$.watchContent.containers.push({
			'id': unqClass,
			'content': $this.html()
		});

		setInterval( 
			function (){
				if(!checker($this))
					return false;

				if(settings.callback)
					settings.callback($this);
			},
			settings.interval	
		)

	});
	
	function stop(container){

		var unqClass=container.attr('class').match(/_watchContainerId\d+/);
		var containers=$.watchContent.containers;

		for(var i in containers)
			if (containers[i].id==unqClass){
				// removing the element
				var c1=containers.slice(0);
				var c2=containers.slice(0);
				c1=c1.splice(0,i)
				c2=c2.splice(parseInt(i)+1)
				$.watchContent.containers=c1.concat(c2);
				return false;
			}
	}

	function checker(container) {
		
		var containers=$.watchContent.containers;
		var unqClass=container.attr('class').match(/_watchContainerId\d+/);
		var c;

		// looking for old content
		for(var i in containers) {
			if (containers[i].id==unqClass){
				c=containers[i];
				var prevContent=c.content;
				break;
			}
		}
		
		if(!c) 
			return stop(container);

		if( prevContent != container.html() ){
			c.content=container.html();
			return true;
		}

		return false;
	
	}

};
