function check() {
	
	if($("#email").val() == null || $("#email").val() == "" || $("#email").val() == undefined) {
		$("#email-error").css('color','#cf1133').html("Please enter email").show();
		setTimeout(function(){$("#email-error").html("");},2000);
		return false;
	}
	
	if(!IsValidEmail($("#email").val())) {
		$("#email-error").css('color','#cf1133').html("Please enter valid email id").show();
		setTimeout(function(){$("#email-error").html("");},2000);
		return false;
	}
	return true;
}



function IsValidEmail(email) {
	var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	return expr.test(email);
}

function stopViewAssetFX(){
	var vAssetID = $('#hidden_viewAssetID').val();
	console.log("killing running all view asset interval : "+ vAssetID);
	clearInterval(vAssetID);

}

function pdfrender(iframeName, url, title, urlcheck ,filealias, assetType ,finalurl) {
  console.log("====TITLE===",title);
  title = title.replace(".html",".pdf");
  // var viewer = new ej.pdfviewer.PdfViewer({
  //   documentPath: title,
  //   serviceUrl: 'http://localhost:6001/api/pdfviewer'
  // });
  // ej.pdfviewer.PdfViewer.Inject(ej.pdfviewer.Toolbar, ej.pdfviewer.Magnification, ej.pdfviewer.BookmarkView, ej.pdfviewer.ThumbnailView, ej.pdfviewer.TextSelection, ej.pdfviewer.TextSearch, ej.pdfviewer.Print, ej.pdfviewer.Navigation, ej.pdfviewer.LinkAnnotation, ej.pdfviewer.Annotation, ej.pdfviewer.FormFields, ej.pdfviewer.FormDesigner);
  // viewer.appendTo('#pdfViewer');
  viewer.load(title);
// 		stopViewAssetFX();
// 		// window.removeEventListener('message', messageListener, false);
// 	  //  $(this).first-child().appendTo('ul.list');
// 		//$(this).parent().append("ul li:first-child()");
// 		$("#hidden_fileName").val(title);
// 		$("#hidden_filealias").val(filealias);
// 		$("#hidden_mediatype").val(assetType);
// 		var socailurl =  finalurl+'/ss_at/wat/'+filealias+'/'+title;
// 		$('#ssURL').val(socailurl);
// 		var url = url;
// 		pdfGen(url,title, urlcheck , finalurl);	
// 		$('#downloadCtaTop').val(url);
// 		$('.mobileNav-div').animate({scrollTop:0}, 'slow');
// 		$(document).scrollTop(0);
}

function isEmpty(val){
    return (val === undefined || val == null ||  val == 'null' || val == 'NULL' ||  val.length <= 0) ? true : false;
}

// for download pdf
function download_file() {
	//document.getElementById('loader').style.display = "block";
	//document.getElementById('loader-overlay').style.display = "block";
	showProcessor();
	clickedDownloadAsset();
	var oReq = new XMLHttpRequest();
   	var URLToPDF = $('#downloadCtaTop').val();
   	oReq.open("GET", URLToPDF, true);
   	oReq.responseType = "blob";
   	oReq.onload = function(e) {
   	    var file = new Blob([oReq.response], { 
   	        type: 'application/pdf' 
   	    });
   	    var fileUrl = $('#downloadCtaTop').val();
		var lastSlash = fileUrl.lastIndexOf('filename=');
		var downloadFilename = fileUrl.substr(lastSlash +9);
        var dlink = document.createElement('a');
        dlink.download = downloadFilename;
        dlink.href = window.URL.createObjectURL(file);
		document.body.appendChild(dlink);
       	dlink.click();
        setTimeout(function(){
            document.body.removeChild(dlink);
            window.URL.revokeObjectURL(oReq.response);  
            }, 1000);  
           
        hideProcessor();
        //document.getElementById('loader').style.display = "none";
       	//document.getElementById('loader-overlay').style.display = "none";
   	};
   	oReq.send();
}

function download_fileonload() {
	var oReq = new XMLHttpRequest();
	var URLToPDF = $('#downloadCtaTop').val();
	clickedDownloadAsset();
	// Configure XMLHttpRequest
	oReq.open("GET", URLToPDF, true);

	// Important to use the blob response type
	oReq.responseType = "blob";

	oReq.onload = function(e) {
   	    var file = new Blob([oReq.response], { 
   	        type: 'application/pdf' 
   	    });
		var lastSlash = URLToPDF.lastIndexOf('filename=');
		var downloadFilename = URLToPDF.substr(lastSlash +9);
        var dlink = document.createElement('a');
        dlink.download = downloadFilename;
        dlink.href = window.URL.createObjectURL(file);
           
		document.body.appendChild(dlink);
        dlink.click();
        setTimeout(function(){
            document.body.removeChild(dlink);
            window.URL.revokeObjectURL(oReq.response);  
            }, 1000);  
	};

	oReq.send();
}

function hideProcessor() {
  $("#overlayLoader, #loaderAll").hide();
  $("body").removeClass('overflowHide');
}

function showProcessor() {
  $("#overlayLoader, #loaderAll").show();
  $("body").addClass('overflowHide');
  
}

function postMsg(id){
    var msg = {method:"addEventListener", value: 'playProgress'};
    var iframe = document.getElementById(id), cW;
    if(iframe) cW = iframe.contentWindow;
    if(!cW){setTimeout(function(){postMsg(id)}, 200); return;}
    cW.postMessage(JSON.stringify(msg), '*');
    }
    
var messageListener = function(e){
		var evt = JSON.parse(e.data);
		  
		if(evt.event==='ready') {
		 $('#viewruntime').val('0.00');
          postMsg(evt.player_id);
        }
      
      if(evt.event==='playProgress') {
              onPlayProgress(evt.data);
          }
      }
  
  function onPlayProgress(data) {
      viewedTime = data.seconds;
      $("#viewruntime").val(data.seconds);
      //console.log(data.duration + " -- "+ data.seconds);
  }  

$(document).ready(function () {
  "use strict";
    var windowWidth = $(window).width();
  $("#pdfViewer").on("contextmenu", function () {
    return false;
  });
  var LoadTitle = $("#nowViewing li:first-child").attr('title');
  if(LoadTitle.length > 70)
        {
            if(windowWidth > 1800 && LoadTitle.length > 70)
                {
                    $(".asset-label h2").html(LoadTitle);
                }else if(windowWidth > 1023 && LoadTitle.length > 70){
                     $(".asset-label h2").html(jQuery.trim(LoadTitle).substring(0, 70).trim(this) + "...");
                }else if(windowWidth > 480 && LoadTitle.length > 40){
                     $(".asset-label h2").html(jQuery.trim(LoadTitle).substring(0, 50).trim(this) + "...");
                }else if(windowWidth > 0 && LoadTitle.length > 35){
                     $(".asset-label h2").html(jQuery.trim(LoadTitle).substring(0, 35).trim(this) + "...");
                }else{
                    $(".asset-label h2").html(LoadTitle);
                }
            
        }
  $(".asset-label h2").attr('title', LoadTitle);

  $("#nowViewing li").click(function () {
    //$(".left_links li").removeClass("active");
    var aTitle = $(this).attr('title');
    $(this).addClass("active");
     if(aTitle.length > 70)
        {
             //$(".asset-label h2").html(jQuery.trim(aTitle).substring(0, 70).trim(this) + "...");
            if(windowWidth > 1800 && aTitle.length > 70)
                {
                    $(".asset-label h2").html(aTitle);
                }else if(windowWidth > 1023 && aTitle.length > 70){
                     $(".asset-label h2").html(jQuery.trim(aTitle).substring(0, 70).trim(this) + "...");
                }else if(windowWidth > 480 && aTitle.length > 40){
                     $(".asset-label h2").html(jQuery.trim(aTitle).substring(0, 50).trim(this) + "...");
                }else if(windowWidth > 0 && aTitle.length > 35){
                     $(".asset-label h2").html(jQuery.trim(aTitle).substring(0, 35).trim(this) + "...");
                }else{
                    $(".asset-label h2").html(aTitle);
                }
        }
    $(".asset-label h2").attr('title', aTitle);
  });

  //for more content from
  $(document).on('click', '#moreContentFrom li', function () {
	  
	if ($(window).width() <= 1023) {
		  $('.mobileNav-div').animate({scrollTop:0}, 'slow');
	      $(".mobileNav-div").hide();
	 }
    var aTitle = $(this).attr('title');
    var bTitle = $("#nowViewing li").attr('title');
    //alert($(this).attr('title'));

    $("#moreContentFrom").append("<li title='" + bTitle + "'>" + $("#nowViewing li").html() + "</li>");
    $("#nowViewing").html(' ');
    //alert($(this).html());
    $("#nowViewing").append("<li class='active' title='" + aTitle + "'>" + $(this).html() + "</li>");
     if(aTitle.length > 70)
        {
             //$(".asset-label h2").html(jQuery.trim(aTitle).substring(0, 70).trim(this) + "...");
                if(windowWidth > 1800 && aTitle.length > 70)
                {
                    $(".asset-label h2").html(aTitle);
                }else if(windowWidth > 1023 && aTitle.length > 70){
                     $(".asset-label h2").html(jQuery.trim(aTitle).substring(0, 70).trim(this) + "...");
                }else if(windowWidth > 480 && aTitle.length > 40){
                     $(".asset-label h2").html(jQuery.trim(aTitle).substring(0, 50).trim(this) + "...");
                }else if(windowWidth > 0 && aTitle.length > 35){
                     $(".asset-label h2").html(jQuery.trim(aTitle).substring(0, 35).trim(this) + "...");
                }else{
                    $(".asset-label h2").html(aTitle);
                }
        }else{
            $(".asset-label h2").html(aTitle);
        }
    $(this).remove();

  });


  var winHe = $(window).height() - 120;
  $('#docFile').css("height", winHe + "px");

  var winHeNav = $(window).height();

  if ($(window).width() <= 1023) {
  	$('#docFile').css("height", winHeNav - 145 + "px");
    $(".ls_mob").click(function () {
      $('#pdf_details').css("height", winHeNav - 58 + "px");
      $(".mobileNav-div").toggle();
      $('.mobileNav-div').css("height", winHeNav - 73 + "px");


    });
    
    $(window).on('resize', function () {
        var win = $(this);
        $('#pdf_details').css("height", win + "px");
        $('.mobileNav-div').css("height", winHeNav - 73 + "px");
      });

    //alert(winHeNav);
    $('#nowViewing li').click(function () {
      $(".mobileNav-div").hide();
    });
  }else{
	  $('#docFile').css("height", winHeNav - 95 + "px");

  }
  
  /* window.onresize = function()
	{
		$("#the-canvas").html('');
		showProcessor();
		location.reload();	
	}*/
	if($(window).width() < 1024)
			{
			$('meta[name="viewport"]').prop('content', 'width=device-width, initial-scale=1.0');
			}else{
				
			$('meta[name="viewport"]').prop('content', 'width=initial, initial-scale=0');
			}
  
});


//social sharing function
var twitterShare = document.querySelector('[data-js="twitter-share"]');

          twitterShare.onclick = function(e) {
           var assetURL = document.URL;
          e.preventDefault();
          var twitterWindow = window.open('https://twitter.com/share?url=' + assetURL, 'twitter-popup', 'height=350,width=600');
          if(twitterWindow.focus) { twitterWindow.focus(); }
          return false;
          }

          var facebookShare = document.querySelector('[data-js="facebook-share"]');

          facebookShare.onclick = function(e) {
          var assetURL = document.URL;
          e.preventDefault();
          var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + assetURL, 'facebook-popup', 'height=350,width=600');
          if(facebookWindow.focus) { facebookWindow.focus(); }
          return false;
          }
          
          var linkedinShare = document.querySelector('[data-js="linkedin-share"]');

          linkedinShare.onclick = function(e) {
          var assetURL = document.URL;
          e.preventDefault();
          var linkedinWindow = window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + assetURL, '&title=Creating+social+sharing+links', 'linkedin-popup', 'height=350,width=600');
          if(linkedinWindow.focus) {linkedinWindow.focus(); }
          return false;
          }
          
          function decorateWhatsAppLink() {
          var assetURL = document.URL;
          var url = 'whatsapp://send?text=';
          var text = 'Hey check out this awesome Visionayr Experience at'+assetURL;
          var encodedText = encodeURIComponent(text);
          var $whatsApp = $('.whatsapp');
          $whatsApp.attr('href', url + encodedText);
          }
          decorateWhatsAppLink();
          var visemailBodyContent = $('#visemailBodyContent').val();
          var visEmailSubjectLine = $('#visEmailSubjectLine').val();
          var emailShare = $('#byEmailShare');
          byEmailShare.onclick = function()
          {
          	var assetURL = "mailto:?subject="+visEmailSubjectLine+"&body="+visemailBodyContent+" "+document.URL;
			//alert(emailShare.attr('href', assetURL));
			emailShare.attr('href', assetURL);
          }

