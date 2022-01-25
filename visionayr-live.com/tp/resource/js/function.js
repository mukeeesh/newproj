
var viewer = new ej.pdfviewer.PdfViewer({
	documentPath: "A-CDO-Guide-to-Customer-Intelligence-IN-Informatica.pdf",
	serviceUrl: 'http://localhost:6001/api/pdfviewer'
});
ej.pdfviewer.PdfViewer.Inject(ej.pdfviewer.Toolbar, ej.pdfviewer.Magnification, ej.pdfviewer.BookmarkView, ej.pdfviewer.ThumbnailView, ej.pdfviewer.TextSelection, ej.pdfviewer.TextSearch, ej.pdfviewer.Print, ej.pdfviewer.Navigation, ej.pdfviewer.LinkAnnotation, ej.pdfviewer.Annotation, ej.pdfviewer.FormFields, ej.pdfviewer.FormDesigner);
viewer.appendTo('#pdfViewer');
// --------------------- To disable any Tool use below Lines with proper tool name in the boolean value ------------------------------//
// viewer.toolbar.showToolbarItem(["OpenOption", "PanTool", "CommentTool", "SelectionTool", "PrintOption", "DownloadOption", "UndoRedoTool", "AnnotationEditTool", "FormDesignerEditTool"], false);
viewer.toolbar.showToolbarItem(["OpenOption"], false);
document.getElementById("pdfViewer_bookmark").style.display = "none";
document.getElementById("pdfViewer_submitForm").style.display = "none";
//------------------------------------------------------------------------------------------------------------------------------------------//

function viewAsset() {
	var assetView = $('#assetview').val();
	var fileName = $('#hidden_fileName').val();
	//alert('fileName'+fileName);
	var email = $('#hidden_email').val();
	var phone = $('#hidden_phone').val();


	var mediaType = $('#hidden_mediatype').val();
	var viewruntime = '0.00';
	if (mediaType == 'video') {
		viewruntime = $('#viewruntime').val();
	}
	//console.log("viewruntime: "+viewruntime);
	var fileAlias1 = $('#hidden_filealias').val();
	var FormURL = "/tp/ss_at/wat/waj/" + fileAlias1 + "?filename=" + fileName + "&email=" + email + "&phone=" + phone + "&viewruntime=" + viewruntime + "&_v_c=&source=Website&referal=http://visionayr-live.com/tp/ss_at/wat/vpmpho5fq/A-CDO-Guide-to--Intelligence-IN.html?_aid=40363&utm_param1=&utm_param2=&utm_param3=&utm_param4=&utm_param5=";

	if (assetView != 'sout') {
		$
			.ajax({
				url: FormURL,
				success: function (data, textStatus, xhr) {
					if (data != '' && data == 'sout') {
						$('#assetview').val('sout');
						var vAssetID = $('#hidden_viewAssetID').val();
						clearInterval(vAssetID);
					} else {
						$('#assetview').val('success');
					}
				},
				error: function (xhr, textStatus, errorThrow) {
					$('#assetview').val('sout');
					var vAssetID = $('#hidden_viewAssetID').val();
					clearInterval(vAssetID);
				}
			});
	}
}

//JavaScript Document
jQuery(function ($) {
	/* var isOverGoogleAd = false; */
	var dynamicBannerAd = false;
	if (dynamicBannerAd == true) {
		$(".ssgBannerTrack iframe")
			.mouseover(
				function () {
					/* isOverGoogleAd = true; */
				}
			)
			.mouseout(
				function () {
					/* isOverGoogleAd = false; */
				}
			);
		/* $( window ).blur(
			function(){
				
				if (isOverGoogleAd){
					
					console.log(isOverGoogleAd + "- Clicked on banner");
				   clickedBannerAsset();
				}
			}
		)
		.focus(); */

	} else {
		$(".ssgBannerTrack a").click(function () {
			console.log($(this).attr('href') + " Clicked on static banner");

			clickedBannerAsset();

		});
	}

});


var phonePopup = false;
function loadphonePopup() {
	phonePopup = true;
	$("#freeTextCustomPopup").show();
}

//active window mode
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
	hidden = "hidden";
	visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
	hidden = "msHidden";
	visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
	hidden = "webkitHidden";
	visibilityChange = "webkitvisibilitychange";
}

function handleVisibilityChange() {
	if (document[hidden]) {
		//console.log("window was deactive");
	} else {
		//console.log("window is active");
	}
}

if (typeof document.addEventListener === "undefined" || hidden === undefined) {
	console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
	document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
var list;
var index = 0;
$(document).ready(function () {


	var wHeight = $(window).height();
	var logoDivHeight = $(".logo").outerHeight();
	$("#leftLink").height(wHeight - (logoDivHeight + 55));
	$("#assetHolder").height(wHeight - 73);
	$(".mobileNav-div").height(wHeight - 170);

	$(window).resize(function () {
		var wHeight = $(window).height();
		var logoDivHeight = $(".logo").outerHeight();
		$("#leftLink").height(wHeight - (logoDivHeight + 55));
		$("#assetHolder").height(wHeight - 73);
		$(".mobileNav-div").height(wHeight - 170);
	});





	var regex = /(<([^>]+)>)/ig;
	var titleA = 'A CDO&#8217;s Guide to  Intelligence';
	console.log("Title fetched :: " + titleA);
	$("title").html(titleA.replace(regex, ''));

	$("#msgDiv").hide();
	$("#msgDiv_multi").hide();

	if ($("#hidden_email").val() != null
		&& $("#hidden_email").val() != "") {
		$("#myModal").modal("hide");
	} else {

	}
	$('#send-btn').click(function (e) {
		if (check()) {
			$("#hidden_email").val($("#email").val());
			$("#myModal").modal("hide");
			e.preventDefault();
		} else {
			e.preventDefault();
		}
	});

	pdfGenload('false', 'false', 'false', '/tp', 'vpmpho5fq', '', 'lead-gen-index.html', 'html', 'true');

})
