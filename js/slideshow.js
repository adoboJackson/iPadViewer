(function($){
    $.slideshow = function(el,options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        var active=0;
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        var slides;
        var tabs;
        var lt_btn=base.$el.find(".backwards");
        var rt_btn=base.$el.find(".forwards");
        // Add a reverse reference to the DOM object
        base.$el.data("slideshow", base);

        base.init = function(){
        	slides=base.$el.find(".app-slideshow__slide");
            //if( typeof( radius ) === "undefined" || radius === null ) radius = "20px";
            slides.each(function(index) {
            	console.log("index:"+index);
				base.$el.find('.app-slideshow__slidetabs').append('<a href="#" class="app-slideshow__tab" data-mynum="'+index+'"></a>');
			});
			tabs=base.$el.find(".app-slideshow__tab");
			tabs.on('click',this.tabClick);
            base.options = $.extend({},$.slideshow.defaultOptions, options);
            $(slides[active]).addClass("active");
        	$(tabs[active]).addClass("active");
            // Put your initialization code here
        };
        base.changeActive=function(event){
        	event.preventDefault();
        	console.log("changeActive");
        	base.$el.find(".active").removeClass("active");
        	if(event.data.direction=="forward"){
        		if(active<slides.length-1){
        			active++;
        		}else{
        			active=0;
        		}
        	}else if(event.data.direction=="backward"){
        		if(active>0){
					active--;
				}else{
					active=slides.length-1;
				}
        	}else{
        		active=event.data.num;
        	}
        	$(slides[active]).addClass("active");
        	$(tabs[active]).addClass("active");
		}
        base.tabClick=function(event){
        	event.preventDefault();
        	active=$(this).data('mynum');
        	base.$el.find(".active").removeClass("active");
        	$(slides[active]).addClass("active");
        	$(tabs[active]).addClass("active");
        }
       rt_btn.on('click',{direction:'forward'},this.changeActive);
       lt_btn.on('click',{direction:'backward'},this.changeActive);
       
        // Run initializer
        base.init();

    };
    
    $.slideshow.defaultOptions = {
        //radius: "20px"
    };
    
    $.fn.slideshow = function(options){
        return this.each(function(){
            (new $.slideshow(this, options));

        	
		   // HAVE YOUR PLUGIN DO STUFF HERE
			
	
		   // END DOING STUFF

        });
    };
    
})(jQuery);