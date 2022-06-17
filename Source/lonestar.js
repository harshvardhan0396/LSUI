//// Last changes on 16 Jun 2016

$(document).ready(function() {




//// inserting 'lock' character for blocked topics
	$(".blocked").each(function() {
		$(this).prepend("&#x1f512;");
	});

//// word break for long URLs
	$("a").each(function() {
		if ($(this).text().search(/\//) > 0) {
			var linkText = $(this).text().replace(/\//g,"/<wbr>");
			linkText = linkText.replace(/\%/g,"<wbr>%");
			$(this).html(linkText);
		}
	});
	
	
//// scolling to the exact location (<a name=...>) when a topic is accessed through Index term with a 'pointer'	
	var url = document.URL;
	url = url.replace(/.*\/content\/HTML/, "..");
	if (url.search("#section") > 0) {
	var id =  url.substr(url.search("#")).replace("#","");
				$("a[name='" + id + "']").css("padding-top", "18%");
	}
	else if (url.search("#") > 0) {
		var id =  url.substr(url.search("#")).replace("#","");
				$("a[name='" + id + "']").css("padding-top", "18%");

		// $("a[name='" + id + "']").attr("class", "yellow");
		$("a[name='" + id + "']").parent().attr("class", "lightyellow");
		$('body').animate({
			scrollTop: $("a[name='" + id + "']").parent().offset().top
		}, 800, function() {

		});	
	
	}
	// adjusting width of images with widths larger than 'body' width	
	$("img").each(function() {	
		$(this).load(function() {
			if ($(this).width() > $("body").width()) {
				$(this).attr("width", "100%");
			}
		});
	});
	
	$("img").click(function() {
		if ($(this).attr("width") ==  "100%") {
			$(this).attr("width",  "");
		} else {
			if ($(this).width() > $("body").width()) {
				$(this).attr("width",  "100%");
			}
		}
	});	
// For Grayana3 commented 
//// adjusting width of images with widths larger than 'body' width	
	$("area").each(function() {	
		
		$(this).click( function(event1){
			event1.preventDefault() ;
		}) ;
		$(this).click(function(e){
		    var hrefAtt = $(this).attr('href');
			var myRegexp = /tooltip\:(.*)$/g;
			var match = myRegexp.exec(hrefAtt);
			$(this).attr("alt", "");
		    $(this).attr("title", "");
			$("body").append("<span id='xMark' style='font-size: 16px ;  font-weight: bold;'></span>") ;
			$("#xMark").text(match[1]) ;
			$("#xMark").css('display','block') ;
			var widthOfTip = $("#xMark").width() ;
			var widthOfWindow = $("body").width() ;
			var heightOfWindow = $(window).height() ;
			var heightOfTip = $("#xMark").height() ;
			// alert($(window).scrollTop()) ;
			
			$("#xMark").offset({ top: $(window).scrollTop()+((heightOfWindow/2)-(heightOfTip/2)), left: (($(window).scrollLeft())+((widthOfWindow/2)-(widthOfTip/2))) }) ;
			setTimeout(function(){
				$("#xMark").fadeOut(300) ;
				// $("#xMark").css('display','none') ;
             }, 3000);
			
			
		});

		
	
		$(this).mouseout(function(){
			$("#xMark").css('display','none') ;
		});
		
	});
	
	
	$("img").click(function() {
		if ($(this).attr("width") ==  "100%") {
			$(this).attr("width",  "");
		} else {
			if ($(this).width() > $("body").width()) {
				$(this).attr("width",  "100%");
			}
		}
	});	
	
// //// creating a popup element 
	// if ($("[href^='popup:#']").length > 0) {
			// $("body").append("<div id='popup'></div>");	
	// }
	
// //// converting '<a href="popup:#xyz"...>' wih	'<span class="popup" link="xyz">' element
	// $("[href^='popup:#']").each(function() {
		// var popupRef = $(this).attr("href");
		// popupRef = popupRef.replace("popup:#", "").toLowerCase();		
		// $(this).replaceWith("<span class='popup' link='" + popupRef + "'>" + $(this).html() + "</span>");
	// });

// //// opening popup	
	// $(".popup").click(function(event) {
		// $(".selected").removeClass("selected");
		// $("#popup").hide();
		// $(this).addClass("selected");
		// event.stopImmediatePropagation();
		// var popupRef = $(this).attr("link");
		// popupRef = popupRef.replace("popup:", "").toLowerCase();
		// $("#popup").html($("a[name='" + popupRef + "']").closest("p").html());
		// $("#popup").css("top", ($(this).position().top  - $(document).scrollTop() + 22) + "px");	
		// $("#popup").slideDown(600);
		// // alert($("#popup").css("top")) ;
		// // alert($(window).height()) ;
		// setTimeout(function(){
			// if($("#popup").position().top > ($(window).height() - $("#popup").height())){
			// $("#popup").animate({top: ($(window).height() - $("#popup").height() - 15) + "px"},400) ;
			// $("#popup").animate({height: "auto"},200) ;
			// }
			
		// }, 600) ;
	// });

	//// creating a popup element 
	if ($("[href^='popup:#']").length > 0) {
			$("body").append("<div id='popup'></div>");	
	}
	
//// converting '<a href="popup:#xyz"...>' wih	'<span class="popup" link="xyz">' element
	$("[href^='popup:#']").each(function() {
		var popupRef = $(this).attr("href");
		popupRef = popupRef.replace("popup:#", "").toLowerCase();		
		$(this).replaceWith("<span class='popup' link='" + popupRef + "'>" + $(this).html() + "</span>");
	});

//// opening popup	
	$(".popup").click(function(event) {
		$(".selected").removeClass("selected");
		$("#popup").hide();
		$(this).addClass("selected");
		event.stopImmediatePropagation();
		var popupRef = $(this).attr("link");
		popupRef = popupRef.replace("popup:", "").toLowerCase();
		$("#popup").html($("a[name='" + popupRef + "']").closest("li,p,span").html());
		$("#popup").css("top", ($(this).position().top  - $(document).scrollTop() + 22) + "px");	
		$("#popup").slideDown(600);
		// alert($("#popup").css("top")) ;
		// alert($(window).height()) ;
		setTimeout(function(){
			if($("#popup").position().top > ($(window).height() - $("#popup").height())){
			$("#popup").animate({top: ($(window).height() - $("#popup").height() - 15) + "px"},400) ;
			$("#popup").animate({height: "auto"},200) ;
			}
			
		}, 600) ;
	});

//// appending an element for 'section list' & related functionality
	$("body").append("<div id='sectionList'></div>");
    if($('.sectionName').length > 1){
	var strSectionList = "";
	$(".sectionTitle").each(function() {
		strSectionList += "<h3>"
						+ "<a href='#" +  $(this).attr("id") + "'>"
						+ $(this).find(".sectionName").html()
						+ "</a>"
						+ "</h3>";
	});
	
	$("#sectionList").html(strSectionList);
	
		$('.sectionName').append('<img id="secImage" src="../../../logo/lonestar-icon-96.png" />');
	
	$("#sectionHeader, .sectionName").click(function() {
		$('#popup, #popupIframe').hide();
		$("#sectionList").show(100);
	});
	
	
	$("#sectionList").click(function() {
		$("#sectionList").hide(300);
	});
	}
	//$(".expandedTOC").height($(window).height());
	$(".expandedTOC").height($(document).height());
	
	$( window ).scroll(function() {
		
		var scrollTop = $(window).scrollTop();
			if (scrollTop <= 0) {
						$("#sectionHeader").text("");
						$("#sectionHeader").hide();			
			} else {
				$(".sectionTitle").each( function() {
					var offset = $(this).offset();
					//$(this).find(".prevNext").text(scrollTop + "/" + offset.top);
					if (scrollTop > offset.top) {
						$("#sectionHeader").text($(this).find(".sectionName").text() + "...");
						//$("#sectionHeader").css("left", $("#sectionHeader").width()*-0.5)
						//$("#sectionHeader").css("top", $("#sectionHeader").width()*0.5)
						$("#sectionHeader").show();
					} 
				});
			}
	});
	
	$(window).on("scrollstart",function(){
			$("#sectionHeader").hide();
			$('#popup').hide();
			$(".selected").removeClass("selected");
	});
	
	$(".sectionText, #cover").click(function() {
		$('#popup').hide(100);
		$("#sectionList").hide(100);
	});
	
	$(".next").click(function() {
		$('body').animate({
			scrollTop: $(this).closest(".sectionTitle").next().next(".sectionTitle").offset().top
		}, 800, function() {
			$("#sectionHeader").fadeOut(300);
		});
	});
	
	$(".prev").click(function() {
		$('body').animate({
			scrollTop: $(this).closest(".sectionTitle").prev().prev(".sectionTitle").offset().top
		}, 800, function() {
			$("#sectionHeader").fadeOut(300);
		});
	});	
	
});


function getUrlVars() {
	
	var cssPath = getUrlVars()["styleURL"];
	
	if(cssPath){
		var cssLink = document.createElement("link") 
		cssLink.href = cssPath; 
		cssLink.rel = "stylesheet"; 
		cssLink.type = "text/css"; 	

		var $head = $("head");
		var $headlinklast = $head.find("link[rel='stylesheet']:last");
		var linkElement = cssLink;
		if ($headlinklast.length){
			$headlinklast.after(linkElement);
		}
		else {
			$head.append(linkElement);
		}
	}
}

$(document).ready(function() {
	
	var urlstring = window.location.href;
	if(urlstring.search("styleURL") > 0)
	{
			getUrlVars();
	}

	
	



	$('div[answer]').click( function(){
		if($(this).parent().parent().find("#abc").val()){
			var answer = $(this).attr('answer');
			var url = $(this).attr('url');
			if($(this).parent().parent().find("#abc").val() === answer){
				window.location.assign(url);
			}
			else{
				$("body").append("<span id='xMark' style='font-size: 16px ;  font-weight: bold;'>Wrong Answer</span>") ;
				$("#xMark").css('display','block') ;
				var widthOfTip = $("#xMark").width() ;
				var widthOfWindow = $("body").width() ;
				var heightOfWindow = $(window).height() ;
				var heightOfTip = $("#xMark").height() ;
				// alert($(window).scrollTop()) ;
				$("#xMark").offset({ top: $(window).scrollTop()+((heightOfWindow/2)-(heightOfTip/2)), left: (($(window).scrollLeft())+((widthOfWindow/2)-(widthOfTip/2))) }) ;
				setTimeout(function(){
					$("#xMark").fadeOut(300) ;
					// $("#xMark").css('display','none') ;
				 }, 3000);
				
			}
		}
	});
	
	
	if ($(".QUESTIONS").size() > 0) {
		$("a").css("text-decoration","none") ;
		$("a").css("border","none") ;
		$("a").css("color","#000") ;
		$("a").click( function(event){
			event.preventDefault() ;
		}) ;
	
		$( "body" ).append( "<div class='qCnt'>Attempted "
			+ "<span id='attempted'>0</span> of "
			+ "<span id='total'>"
			+ $("li.Q-A").size()
			+ "</span></div>" ) ;
		
		$(".RESPONSES li").click( function() {
			if( $(this).parent().find("[answer=correct]").length == 1 ){					//if single correct
				$(this).parent().find("li").removeClass("selectedXX") ;
			} else{
				$(this).parents("li").addClass("multiSelect") ;
			}
			$(this).addClass("selectedXX") ;
			$(this).parents("li").addClass("Attempted") ;
			
			var w = $(".qCnt").css("width") ;
			$(".qCnt").css("width", "0");
			$(".qCnt").animate({width: w},200) ;
			
			$("#attempted").text($("li.Attempted").size());
			if ($("li.Attempted").size() >= 0) {
				if( !$(".qCnt").hasClass("evaluate") ){
					$(".qCnt").append("<br/>Tap to Evaluate") ;
					$(".qCnt").addClass("evaluate") ;
					
				}
			}
		}) ;
		
		$(".qCnt").click( function() {
			var score = 0 ;
			
			var w = $(".qCnt").css("width") ;
			$(".qCnt").css("width", "0");
			$(".qCnt").animate({width: w},200) ;
			
			$(".Q-A").each( function() {
				var correctOptions = $(this).find("[answer=correct]").length ;
				var correctSelectedOptions = 0 ;
				
				// if ( $(this).hasClass("Attempted") ){
					$(this).find("ol li").each( function(){
						if ( $(this).attr("answer") == "correct" ){
							if($(this).hasClass("selectedXX") ){
								$(this).addClass("correct").append(' <img src="../../scripts/correct.png" alt="Correct" height="12 em" width="16px">') ;
								$(this).removeClass("selectedXX") ;
								correctSelectedOptions++ ;
							}
							else{
								$(this).addClass("correct lightyellow") ;//.append(' <img src="../../scripts/correct.png" alt="Correct" height="12 em" width="16px">') ;
								$(this).removeClass("selectedXX") ;
							}
						}
						else{
							if($(this).hasClass("selectedXX") ){
								$(this).addClass("wrong").append(' <img src="../../scripts/wrong.png" alt="Wrong" height="12 em" width="16px">') ;
								$(this).removeClass("selectedXX") ;
							}
						}	
					}) ;
				// }
				if(correctOptions === correctSelectedOptions){
					score++ ;
				}	
			}) ;
			
			if( score == $("li.Q-A").size() ){
				$(this).html('<img src="../../scripts/threeStar.png" alt="Correct">'
				+ "<br/>Marvellous! "
				+"<br/>Score: "
				+ score
				+ " out of "
				+ $("li.Q-A").size()
				+ '<span id="reset" style="font-weight: bold ; color: #333 ;"><br/>Reset</span>') ;
			}else{
				if( score < $("li.Q-A").size() && score > $("li.Q-A").size() - 3 ){
					$(this).html('<img src="../../scripts/twoStar.png" alt="Correct">'
					+ "<br/>Great! "
					+"<br/>Score: "
					+ score
					+ " out of "
					+ $("li.Q-A").size()
					+ '<span id="reset" style="font-weight: bold ; color: #333 ;"><br/>Reset</span>') ;
				}else{
					$(this).html('<img src="../../scripts/oneStar.png" alt="Correct">'
					+ "<br/>Good efforts"
					+"<br/>Score: "
					+ score
					+ " out of "
					+ $("li.Q-A").size()
					+ '<span id="reset" style="font-weight: bold ; color: #333 ;"><br/>Reset</span>') ;
				}
			}
			$("#reset").click( function() {
				location.reload() ;
			}) ;
			$(".RESPONSES li").unbind('click') ;
			$(".qCnt").unbind('click') ;
			$("li[answer=correct]").find("a").css("border","thin dotted green").unbind('click') ;
		}) ;
	
	} 
}) ;