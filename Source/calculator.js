
$(document).ready(function() {
	
	if ($("comment").text() == "") {
		$("#info").fadeOut(0);
	} else {
		$("body").append("<div id=cover></div>");
		$("body").append("<div id=comment2></div>");
	}

	$("a").each(function() {
		var linkText = $(this).text().replace(/\//g,"/<wbr>");
		$(this).html(linkText);

	});
		
	var hiddenResults = 0;
	
	if ($("#results").offset().top + $("#results").height() > $(window).height()) {
		//alert ($("#results").offset().top + "/" + $("#results").height() + "//" + $(window).height());
		hiddenResults = 1;
		$("#results").css("position", "fixed");
		$("#results").css("left", "0");
		$("#results").css("bottom", ($("#results").height()*-1) + "px");
		$("#input").css("margin-bottom", $("#results").height() + "px");
		
		$("#resultsTitle").fadeIn(1000);

		$("#results").animate({
			bottom: 0
		}, 800, function() {
		});		
	}
	
	$("#results").click(function() {
		if ($("#results").css("bottom") == "0px") {
			$("#results").animate({
				bottom: $("#results").height()*-0.8
			}, 800, function() {
			});
		} else {
			$("#results").animate({
				bottom: 0
			}, 800, function() {
			});		
		}
	});
	
	$(".READONLY .label:contains('---')").parent().hide(0);	
	$(".READONLY .label:contains('~')").parent().hide(0);	
	$("input[class='FPS']").parent().parent().hide(0);	
	
			//next if ( $var->findnodes('./label')	 eq "---");
			//next if ( $var->getAttribute("included") eq "units=FPS");	
	
	
	$(".unit").each(function() {
		//alert ($(this).closest("tr").prev().html());
		$(this).closest("tr").prev().find("td").css("border", 0);
		$(this).closest("tr").prev().find("td").css("padding-bottom", 0);
		$(this).closest("tr").find("td").css("padding-top", 0);
	});

	$("body .CHOICE .choices span").each(function() {
		if ($(this).parent().attr("default") == $(this).text()) {
			$(this).addClass("selected");
			//var output = calculate();
			checkAndCalculate();
		}
	});
	
	$("body .CHOICE .choices span").click(function() {
		$(this).parent().find(".selected").removeClass("selected");
		$(this).addClass("selected");
		$(this).parent().parent().find("input").val($(this).attr("value"));
		//var output = calculate();
		checkAndCalculate();
	});
	
	$("body .MCHOICE .mchoice div").click(function() {
		if ($(this).hasClass("selected")) {
			$(this).removeClass("selected");
			$(this).find(".checkbox").html("&#9744;");
		} else {
			$(this).addClass("selected");
			$(this).find(".checkbox").html("&#9745;");
		}
		
		var scr = 0;
		$(this).closest(".choices").find(".mchoice .selected").each(function() {
			scr += $(this).attr("value")*1;	
		});
		$(this).closest(".MCHOICE").find("input").attr("value", scr);
		//var output = calculate();
		checkAndCalculate();

	});	


	$("#calculate").click(function() {
		//var output = calculate();
		checkAndCalculate();
	});
	
	function showResults() {
		if (hiddenResults == 1) {
			$("#results").css("right", "auto");
			$("#results").animate({
				left: "0"
			}, 800, function() {
			});		
		}
		$(".READONLY").each(function() {
			//alert($(this).html());
			//$(this).find(".label").css("font-size", "10%");
			

			$(this).find(".value").animate({
				opacity: 0.1
			}, 200, function() {
			});	
			
			
			$(this).find(".label").animate({
				fontSize: "1em"
			}, 800, function() {
			});
			$(this).find(".value").animate({
				opacity: 1,
				fontSize: "1.6em"
			}, 800, function() {
			});			
		});
	}
	
	function checkAndCalculate() {
			var tmp1 = $("input").size();
			 $("input").each(function() {
				if ($(this).val() > 0 || $(this).val() > "") {
					tmp1--;
					$(this).addClass("selected");
					$(this).removeClass("notSelected");
				} else {
					$(this).addClass("notSelected");
					$(this).removeClass("selected");
				}
			 });
			 if (tmp1 == 0) {
				var output = calculate();
				showResults();
			 } else {
			 	reset();
				$("#result").html("<span class='noResult'>enter or select all input values");
			}
	}
	

	
	$("input").change(function() {	
		checkAndCalculate();
	});
	
	
	function reset() {	
		$(".READONLY").each(function() {
			//alert($(this).html());
			//$(this).find(".label").css("font-size", "10%");
			$(this).find(".value").html("<span class='noInput'>all inputs not entered</span>");
			$(this).find(".label").animate({
				fontSize: "1.6em"
			}, 800, function() {
			});
			$(this).find(".value").animate({
				fontSize: "1em"
			}, 800, function() {
			});			
		});	
	}
	
	$("#result").click(function() {
		if(!/[a-zA-Z]|[?]/.test($(this).text())){
			var result = $(this).text() * 1;
			var decimals = 2;
			result = Math.round(result * (10*decimals))/(10*decimals);
			$(this).text(result);
		}  
	});


	$("#info").click(function() {
		$("#comment, #comment2").show(200);
		//$("#comment2").css("max-height", $("#comment").height()+200);
		//$("#comment2").html($("#comment").html());
		$("#cover").fadeIn(500);
		$("#comment").animate({
			top: "15%"
		}, 300, function() {
		});
		$("#comment2").animate({
			top: "16%"
		}, 300, function() {
		});		
	});
	
	$("#comment").click(function() {
		$("#cover").fadeOut(1000);
		$("#comment, #comment2").animate({
			top: "105%"
		}, 500, function() {
		});
	});	


});