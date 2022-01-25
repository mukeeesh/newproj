
var phonePopup = false;

function loadphonePopup() {
	phonePopup = true;
	$("#freeTextCustomPopup").show();
}

function closePhonePopup()
{
	$("#freeTextCustomPopup").hide();
	var fileName=$('#hidden_fileName').val();
	var fileAlias=$('#hidden_filealias').val();
	console.log("closing phone pop up  "+ filename + " :: " + fileAlias);
	phonePopup=false;
	loadQuestions(fileName ,fileAlias);
}

function submitPhonePopup() {
	console.log($("#phonep").value);
	var phoneno = /^(?:\+?\d{2}[ -]?[\d -][\d -]+)$/;
	if ($("#phonep").val().match(phoneno)) {
		$("#hidden_phone").val($("#phonep").val());
		$("#msgDivfree").show();
		$("#msgDivfree").html("<span class='successMsg'>'${param.phonePopupThankyouMessage}'</span>");
		$("#submitPhone").attr("disabled", true)
		setTimeout(function () {
			closePhonePopup();
		}, 3000);
		//return true;
	}
	else {
		$("#msgDivfree").show();
		$("#msgDivfree").html("<span class='errorMsg'>'${param.phonePopupValidationMessage} </span>");
		setTimeout(function () {
			$('#msgDivfree').fadeOut('fast');
		}, 2000);
		//return false;
	}


}

function clearPopUpTimer() {
	console.log("clearing all time : ")
	var myVar = $('#closedPopUpID').val();
	clearInterval(myVar);
	myVar = $('#startPopUpID').val();
	clearInterval(myVar);
}





function pdfGenload(urlcheck, showPhonePopup, isAutodownload, finalurl,
	filealias, asseturl, fname, fextname, showdownload) {
	viewAssetFX();
	clearPopUpTimer();
	var fileName = $('#hidden_fileName').val();
	var fileAlias = $('#hidden_filealias').val();
	var assetType = $('#hidden_mediatype').val();
	var email = $('#hidden_email').val();

	var url = '';
	showProcessor();

	if (urlcheck == 'true') {
		var url = asseturl;
		//video tracker
		if (assetType == 'video') {
			//var url = 'https://player.vimeo.com/video/403252376';
			$('#the-canvas, #pdf_pnum, .download_ctaTop, #docFile').hide();
			$("#videoFile, #videoFileDiv").show();
			var iframe = document.querySelector('#videoFile');
			window.addEventListener('message', messageListener, false);
			iframe.src = url + '?player_id=' + iframe.id;
		} else {

			$('#the-canvas, #pdf_pnum, .download_ctaTop, #videoFile, #videoFileDiv').hide();
			if ($('#videoFile').attr('src')) {
				$("#videoFile").contents().find("body").html('')
			}
			if ($('#docFile').attr('src')) {
				$("#docFile").contents().find("body").html('')
			}
			$("#docFile").attr('src', url);
			$("#docFile").show();
		}
		hideProcessor()

		index = 0;
		if(String(showPhonePopup) === 'true'){
			loadphonePopup();
		}else {
			loadQuestions(fileName ,fileAlias);
		}

	} else {
		url = finalurl + '/ss_at/wae/' + fileAlias + '?filename=' + fname;
		var fileType = fextname;

		$('#downloadCtaTop').val(url);

		if (fileType == 'pdf' || fileType == 'PDF' || assetType == 'pdf') {

			$("#docFile, #videoFile, #videoFileDiv").hide();
			$("#docFile").attr('src', '');
			$('#the-canvas, #pdf_pnum, .download_ctaTop').show();


			pdfLinkMaker(url, showPhonePopup, fileName, fileAlias);


			if (showdownload === 'true' && isAutodownload === 'true') {
				download_fileonload();
			}

		} else if (fileType == 'doc' || fileType == 'DOC' || fileType == 'docx' || fileType == 'DOCX' || fileType == 'xls' || fileType == 'xlsx' || fileType == 'ppt' || fileType == 'pptx') {
			$('#the-canvas, #pdf_pnum, .download_ctaTop, #videoFile,  #videoFileDiv').hide();
			$("#videoFile").attr('src', '');

			if ($('#videoFile').attr('src')) {
				$("#videoFile").contents().find("body").html('')
			}
			if ($('#docFile').attr('src')) {
				$("#docFile").contents().find("body").html('')
			}
			$("#docFile").attr('src', "https://docs.google.com/gview?url=" + url + "&embedded=true");
			$("#docFile").show();
			hideProcessor();

			document.getElementById('loader').style.display = "none";
			document.getElementById('loader-overlay').style.display = "none";

			index = 0;
			if(String(showPhonePopup) === 'true'){
				loadphonePopup();
			}else {
				loadQuestions(fileName ,fileAlias);
			}
		}
		else {

			$('#the-canvas, #pdf_pnum, .download_ctaTop, #videoFile, #videoFileDiv').hide();
			$("#videoFile").attr('src', '');
			if ($('#videoFile').attr('src')) {
				$("#videoFile").contents().find("body").html('')
			}
			if ($('#docFile').attr('src')) {
				$("#docFile").contents().find("body").html('')
			}
			$("#docFile").attr('src', url + "&embedded=true");
			$("#docFile").show();
			hideProcessor();
			document.getElementById('loader').style.display = "none";
			document.getElementById('loader-overlay').style.display = "none";
			index = 0;
			if(String(showPhonePopup) === 'true'){
					loadphonePopup();
			}else {
			 		loadQuestions(fileName ,fileAlias);
			}
		}
	}
	//viewAssetFX();
}



function viewAssetFX() {
	var assetviewInterval = $('#assetviewInterval').val();
	var viewAssetID = setInterval(viewAsset, assetviewInterval);
	$('#hidden_viewAssetID').val(viewAssetID);
	console.log(assetviewInterval + "setting view asset intervali id " + $('#hidden_viewAssetID').val());
}


function pdfGen(url_e, title, urlcheck, finalurl) {
	viewAssetFX();
	clearPopUpTimer();
	if (isPopUpOpened) {
		$('#popupQuestDiv_multi').hide();
		$('#popupQuestDiv1').hide();
		isPopUpOpened = false;
	}

	var fileName = $('#hidden_fileName').val();
	var fileAlias = $('#hidden_filealias').val();
	var email = $('#hidden_email').val();
	var assetType = $('#hidden_mediatype').val();
	var url = '';
	showProcessor();


	if (urlcheck == 'true') {
		url = url_e;
		if (assetType == 'video') {
			//var url = 'https://player.vimeo.com/video/403252376';
			$('#the-canvas, #pdf_pnum, .download_ctaTop, #docFile').hide();
			$("#docFile").attr('src', '');
			if ($('#docFile').attr('src')) {
				$("#docFile").contents().find("body").html('')
			}
			$("#videoFile, #videoFileDiv").show();
			var iframe = document.querySelector('#videoFile');
			window.addEventListener('message', messageListener, false);
			iframe.src = url + '?player_id=' + iframe.id;
		} else {
			$('#the-canvas, #pdf_pnum, .download_ctaTop, #videoFile, #videoFileDiv').hide();
			$("#videoFile").attr('src', '');
			if ($('#videoFile').attr('src')) {
				$("#videoFile").contents().find("body").html('')
			}
			if ($('#docFile').attr('src')) {
				$("#docFile").contents().find("body").html('')
			}
			$("#docFile").attr('src', url);
			$("#docFile").show();
		}
		hideProcessor();


			index = 0;
			if(!phonePopup){
			loadQuestions(fileName ,fileAlias);
			}
		}else{
			url = url_e;
			var fileName=title;
			var fileType = fileName.substr(fileName.lastIndexOf('.')+1);

			$('#downloadCtaTop').val(url);

				if(fileType=='pdf' || fileType=='PDF' || assetType == 'pdf')
				{
					//for pdf
					$("#docFile, #videoFile, #videoFileDiv").hide();
					$("#docFile, #videoFile").attr('src', '');

					$('#the-canvas, #pdf_pnum, .download_ctaTop').show();


					pdfLinkMaker(url, String(phonePopup), fileName, fileAlias);

				} else if(fileType=='doc' || fileType=='DOC'  || fileType=='docx' || fileType=='DOCX' || fileType=='xls' || fileType=='xlsx' || fileType=='ppt' || fileType=='pptx'){
					$('#the-canvas, #pdf_pnum, .download_ctaTop, #videoFile, #videoFileDiv').hide();
					$("#videoFile").attr('src', '');
					if($('#videoFile').attr('src'))
					{
						$("#videoFile").contents().find("body").html('')
					}
					if($('#docFile').attr('src'))
						{
							$("#docFile").contents().find("body").html('')
						}

					$("#docFile").attr('src', "https://docs.google.com/gview?url="+url+"&embedded=true");
					$("#docFile").show();
					hideProcessor();

					index = 0;
					if(!phonePopup){
					loadQuestions(fileName,fileAlias);
					}

				}
				else{

					$('#the-canvas, #pdf_pnum, .download_ctaTop, #videoFile, #videoFileDiv').hide();
					$("#videoFile").attr('src', '');
					if($('#videoFile').attr('src'))
					{
						$("#videoFile").contents().find("body").html('')
					}	
					if($('#docFile').attr('src'))
							{
								$("#docFile").contents().find("body").html('')
							}
						$("#docFile").attr('src', url+"&embedded=true");
						$("#docFile").show();
						hideProcessor();

						index = 0;
						if(!phonePopup){
						loadQuestions(fileName ,fileAlias);
						}
					}
		}
		viewAssetFX();
	}

	//new function pagi
	function pagiNum() {
		//onscroll page number
		window.onscroll = function () {
			var section = $("#the-canvas div.contDiv");
			var bScroll = $(window).scrollTop();
			for (var i = 0; i < section.length; i++) {
				var sHeight = section[i].offsetHeight;
				var offsets = section[i].offsetTop;
				if (bScroll > offsets && bScroll < offsets + sHeight) {
					//section[i].className = "section active";
					document.getElementById('page_num').innerHTML = section[i].id + ' of';
				} else {
					//section[i].className = "section";
				}
			}
		}//end page number
	}

	//Aspect ratio:
	function getAspectRatio(initialWidth, initialHeight) {
		return aspectRatio = initialWidth / initialHeight;
	}


	function pdfLinkMaker(url, showPhonePopup, fileName, fileAlias) {


		// JavaScript Document
		var DEFAULT_SCALE = 1.0;
		var CANVAS_SCALE = 0.5;
		var CSS_UNITS = 96 / 72;


		PDFJS.getDocument(url).then(function (pdf) {
			var winWid = $(window).width();

			var container = document.getElementById("the-canvas");
			document.getElementById('page_count').innerHTML = pdf.numPages;
			document.getElementById('page_num').innerHTML = 'Page-1 of';

			//reset old canvas
			document.getElementById('the-canvas').innerHTML = '';

			index = 0;

				if(String(showPhonePopup) === 'true'){
					loadphonePopup();
				}else {
				 	loadQuestions(fileName ,fileAlias);
				}


			for (var i = 1; i <= pdf.numPages; i++) {

				// Get desired page
				pdf.getPage(i).then(function (page) {


					var viewport = page.getViewport(DEFAULT_SCALE);
					var viewportCanVas = page.getViewport(CANVAS_SCALE);


					var scale = container.clientWidth / viewport.width;
					var scaleCanVas = container.clientWidth / viewportCanVas.width;


					viewport = page.getViewport(scale);
					viewportCanVas = page.getViewport(scaleCanVas);

					//console.log(viewport);
					//console.log(viewport.height + "-- "+viewportCanVas.height+"--"+scale);

					var div = document.createElement("div");


					div.setAttribute("id", "Page-" + (page.pageIndex + 1));
					div.setAttribute("class", "contDiv");

					// This will keep positions of child elements as per our needs
					div.setAttribute("style", "position: relative; margin:0 auto; width:" + viewport.width + "px");
					//div.setAttribute("style", "position: relative; margin:0 auto; width:"+(viewportCanVas.width / 2)+"px");

					container.appendChild(div);

					// Create a new Canvas element
					var canvas = document.createElement("canvas");
					canvas.setAttribute("id", "canvas-" + (page.pageIndex + 1));

					var annotationDiv = document.createElement("div");
					annotationDiv.className = 'annotationLayer';
					annotationDiv.setAttribute("id", "annotationDiv-" + (page.pageIndex + 1));
					div.appendChild(canvas);
					div.appendChild(annotationDiv);

					var initialWidth = viewport.width;
					var initialHeight = viewport.height;
					var newHeight = '';
					var newWidth = container.clientWidth;

					if (newWidth > 768) {
						var context = canvas.getContext('2d');
						canvas.height = viewportCanVas.height;
						canvas.width = viewportCanVas.width;
						canvas.setAttribute("style", "width:" + (viewportCanVas.width / 2) + "px; height:" + (viewportCanVas.height / 2) + "px");

						var renderContext = {
							canvasContext: context,
							viewport: viewportCanVas
						}
						page.render(renderContext).then(function () {
							pagiNum();
							return page.getAnnotations();
						})

							.then(function (annotationData) {
								if (annotationData.length == 0)
									return;

								//console.log(getDestinationHash);

								// Clear HTML for annotation layer and show
								$("#annotation-layer").html('').show();
								PDFJS.AnnotationLayer.render({
									viewport: viewport.clone({ dontFlip: true }),
									div: $("#annotationDiv-" + (page.pageIndex + 1)).get(0),

									annotations: annotationData,
									page: page,
									linkService: self.linkService
								});
								$(".linkAnnotation a").attr('target', '_blank');
								$(".annotationLayer a").attr('target', '_blank');


							})

					} else {

						viewport = page.getViewport(1);
						getAspectRatio(initialWidth, initialHeight);
						newHeight = Math.round(newWidth / aspectRatio);
						console.log(newHeight + "--" + newWidth);
						div.setAttribute('style', 'position: relative; margin:0 auto; width:' + newWidth + 'px;' + 'height:' + newHeight + 'px;');
						//canvas.setAttribute('style', 'width:'+newWidth+'px;'+'height:'+newHeight+'px');
						canvas.setAttribute("style", "width:" + Math.round(viewportCanVas.width / 2) + "px; height:" + Math.round(viewportCanVas.height / 2) + "px");

						var context = canvas.getContext('2d');
						canvas.height = viewportCanVas.height;
						canvas.width = viewportCanVas.width;

						var renderContext = {
							canvasContext: context,
							viewport: viewportCanVas
						}

						page.render(renderContext).then(function () {
							pagiNum();
							return page.getAnnotations();
						})

							.then(function (annotationData) {
								if (annotationData.length == 0)
									return;

								viewport = page.getViewport(scale);
								// Clear HTML for annotation layer and show
								$("#annotation-layer").html('').show();

								PDFJS.AnnotationLayer.render({
									viewport: viewport.clone({ dontFlip: true }),
									div: $("#annotationDiv-" + (page.pageIndex + 1)).get(0),
									annotations: annotationData,
									page: page,
									linkService: self.linkService
								});
								$(".linkAnnotation a").attr('target', '_blank');
								$(".annotationLayer a").attr('target', '_blank');

							})

					}

				});
			}
			hideProcessor();
		})
	}