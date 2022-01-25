
		var openCounter = 0;
		var isPopUpOpened = false;
		var timeToClosePopUp = 0;
		var timeToOpenPopUp = 0;
		var isRetracted = true;

		function questionStart() {
			startPopUpID = setInterval(function () {
				var val_thin = $('#thinfyscroll').val();
				if (val_thin == 'thinfiedscroll') {
					$('#questScroll').asScrollable();

					$('#thinfyscroll').val('done');

				}

				if (!isPopUpOpened) {
					openCounter = openCounter + 1000;
					if (openCounter >= timeToOpenPopUp) {
						openPopUp();
						openCounter = 0;

					}
				}
			}, 1000);

			$("#startPopUpID").val(startPopUpID);

			closedPopUpID = setInterval(function () {
				if (isPopUpOpened) {
					timeToClosePopUp = timeToClosePopUp - 1000;
					if (timeToClosePopUp <= 0) {
						closePopUp();
					}
				}

			}, 1000);

			$("#closedPopUpID").val(closedPopUpID);
		}

		function closeQuestion() {
			isRetracted = false;
			timeToOpenPopUp = $("#interval_if_closed").val();
			timeToClosePopUp = $("#default_retrate").val();

			if ('false' === 'true') {
				saveAnswerInDB_Multi('skipped');
			} else {
				saveAnswerInDB('skipped');
			}
		}

		function submitAnswer() {
			if ('false' === 'true') {
				saveAnswerInDB_Multi('answered');
			} else {
				saveAnswerInDB('answered');
			}
		}

		function openPopUp() {
			isPopUpOpened = true;
			if ('false' === 'true') {
				showNextQuestion_Multi();
			} else {
				showNextQuestion();
			}

		}

		function closePopUp() {
			if (isRetracted) {
				timeToOpenPopUp = $("#interval_if_retracted").val();
				timeToClosePopUp = $("#default_retrate").val();
			}
			isPopUpOpened = false;
			isRetracted = true;
			$('#popupQuestDiv_multi').hide();
			$('#popupQuestDiv1').hide();

		}

		function renderRadioButtonAns(ansOpt) {

			var Mchild = "<ul class='answers'>";
			var child = "";
			var ansOpts = ansOpt[0];
			var ansOptsArray = ansOpts.split(',');
			for (i in ansOptsArray) {
				child = child
					+ "<li><input class='qChk' type='radio' name='optradio' required> <span>"
					+ ansOptsArray[i] + "</span></li>";
			}
			Mchild = Mchild + child + "</ul>";
			$('#ans').append(Mchild);
		}

		function renderCheckBoxAns(ansOpt) {
			var Mchild = "<ul class='answers'>";
			var child = "";
			var ansOpts = ansOpt[0];
			var ansOptsArray = ansOpts.split(',');
			for (i in ansOptsArray) {
				child = child
					+ "<li><input class='qChk' type='checkbox' name='optchk' value = '" + ansOptsArray[i] + "' ><span> "
					+ ansOptsArray[i] + " </span> </li>";
			}
			Mchild = Mchild + child + "</ul>";
			$('#ans').append(Mchild);

		}
		function renderInputTypeAns(ansOpts) {
			$('#ans')
				.append(
					"<div class='questInput'><input class='form-control' type='text' name='optinput' id='optinput'></div>");

		}
		function renderDropDownAns(ansOpts) {
			var ansOpt = ansOpts[0];
			var ansOptsArray = ansOpt.split(',');
			var div = document.createElement('div');
			div.className = 'form-group';
			var child = "<div class='questSelect'><select class='form-control' id='optdd'>";
			child += "<option value=''>Select</option></div>";
			for (var j = 0; j < ansOptsArray.length; j++) {
				child += "<option value='" + ansOptsArray[j] + "'>" + ansOptsArray[j]
					+ "</option></div>";
			}
			child += "</select>";
			div.innerHTML = child;
			$('#ans').append(div);
		}

		function closeEmailPopup(id) {
			$("#" + id).hide();
		}

		function closePhonePopup(id) {
			$("#" + id).hide();
			var fileName = $('#hidden_fileName').val();
			var fileAlias = $('#hidden_filealias').val();
			console.log("closing phone pop up  " + filename + " :: " + fileAlias);
			phonePopup = false;
			loadQuestions(fileName, fileAlias);
		}

		function showNextQuestion_Multi() {
			var noOfQueToShow = Number('0');

			if (noOfQueToShow < 1)
				noOfQueToShow = 1;




			if (questionlist
				&& $('#popupQuestDiv_multi').css('display') == 'none') {

				if (index == questionlist.length) {

					var myVar = $('#closedPopUpID').val();
					console.log("interval cleared for : " + myVar)
					clearInterval(myVar);
					myVar = $('#startPopUpID').val();
					console.log("interval cleared for : " + myVar)
					clearInterval(myVar);
					index = 0;
					$('#popupQuestDiv_multi').hide();

					return;
				}
				console.log("loadInterval : " + $("#loadInterval").val());
				console.log("interval_if_answered : "
					+ $("#interval_if_answered").val());
				console.log("interval_if_closed : "
					+ $("#interval_if_closed").val());
				console.log("interval_if_retracted : "
					+ $("#interval_if_retracted").val());
				console.log("default_retrate : " + $("#default_retrate").val());

				if (index < questionlist.length) {
					$('#popupQuestDiv_multi').show();
					$('body').removeClass('modal-open');
					$('.modal-backdrop').hide();
					var i;
					var startIndex = index;
					var endIndex = Number(index) + Number(noOfQueToShow);

					if (endIndex > questionlist.length) {
						endIndex = questionlist.length;
						index = endIndex;
					} else {
						index = index + noOfQueToShow;
					}

					$("#startIndex").val(startIndex);
					$("#endIndex").val(endIndex);

					$('#spanQuediv').empty();

					var temp = '<div class="questScroll" id="questScroll">';

					temp = temp
						+ '<input type="hidden" id="thinfyscroll" value="thinfiedscroll">';
					for (i = startIndex; i < endIndex; i++) {
						var pojo = questionlist[i];
						temp = temp
							+ createQuestionDiv_Multi(pojo, i, startIndex,
								endIndex, temp);
					}

					temp = temp + '</div>';
					$('#spanQuediv').append(temp);

				}
				/* alert("scrolling div");
				$('#questScroll').asScrollable(); */
				//var sss = $('#questScroll').asScrollable();
				//$('#spanQuediv').append(sss);
			}

		}

		function createQuestionDiv_Multi(pojo, index) {
			var temp = "";
			temp = temp
				+ ' <div  class="question"><p  id="p_que_id_' + index + '" class="spacebtm">'
				+ pojo.question
				+ '</p>  <input type="hidden" id="que_id_' + index + '" name="que_id_' + index + '" value="' + pojo.questionid + '"> 	<input type="hidden" id="questiontType_' + index + '" name="questiontType_' + index + '" value="'
				+ pojo.optionHtmlType + '"> <input type="hidden" id="questionDesc_' + index + '" name="questionDesc_' + index + '" value="' + pojo.question
				+ '"> </div>';
			temp = temp
				+ '<div class="answers ans_div_' + index + '" id="ans_id_' + index + '">';

			if (index == 0) {
				console.log("intializing headers label : " + index);
				if (isEmpty($('#headerid_multi').val())) {
					if (isEmpty('null')) {
						console.log("inside : " + pojo.questionHeader);

						$('#questionHeader').val('Thank you for your Interest');
					} else {
						$('#questionHeader').val('null');
					}
				}
				if (isEmpty($('#submitid_multi').val())) {

					if (isEmpty('null')) {
						$('#buttonLabel').val('Submit');
					} else {
						$('#buttonLabel').val('null');
					}

				}
				$('#headerid_multi').html($('#questionHeader').val());
				$('#submitid_multi').html($('#buttonLabel').val());

			}

			$('#emailid').val($('#hidden_email').val());
			$('#answerSelected').val("");
			$("#filename").val($('#hidden_fileName').val())
			$('#ans').empty();
			var div = null;
			if (pojo.optionHtmlType == 'radio') {
				temp = temp + renderRadioButtonAns_Multi(pojo.options, index);
			} else if (pojo.optionHtmlType == 'checkbox') {
				temp = temp + renderCheckBoxAns_Multi(pojo.options, index);
			} else if (pojo.optionHtmlType == 'input') {
				temp = temp + renderInputTypeAns_Multi(pojo.options, index);
			} else if (pojo.optionHtmlType == 'others') {
				temp = temp + renderInputTypeAns_Multi(pojo.options, index);
			} else {
				temp = temp + renderDropDownAns_Multi(pojo.options, index);
			}

			return temp
		}

		function renderRadioButtonAns_Multi(ansOpt, index) {
			var temp = ""
			var Mchild = "<ul class='answers ans_div_" + index + "'>";
			var child = "";
			var ansOpts = ansOpt[0];
			var ansOptsArray = ansOpts.split(',');
			for (i in ansOptsArray) {
				child = child
					+ "<li><input class='qChk' type='radio' name='optradio_" + index + "' required> <span>"
					+ ansOptsArray[i] + "</span></li>";
			}
			Mchild = Mchild + child + "</ul>";
			temp = temp + Mchild + "</div>";
			return temp;
		}

		function renderCheckBoxAns_Multi(ansOpt, index) {
			var temp = ""
			var Mchild = "<ul class='answers ans_div_" + index + "'>"
			var child = "";
			var ansOpts = ansOpt[0];
			var ansOptsArray = ansOpts.split(',');
			for (i in ansOptsArray) {
				child = child
					+ "<li><input class='qChk' type='checkbox' name='optchk_" + index + "' value = '" + ansOptsArray[i] + "' ><span> "
					+ ansOptsArray[i] + " </span> </li>";
			}
			Mchild = Mchild + child + "</ul>";
			temp = temp + Mchild + "</div>";
			return temp;

		}

		function renderInputTypeAns_Multi(ansOpts, index) {
			var temp = ""
			temp = temp
				+ "<div class='questInput'><input class='form-control' type='text' name='optinput_" + index + "' id='optinput_" + index + "' ></div>"
				+ "</div>";
			return temp;

		}

		function renderDropDownAns_Multi(ansOpts, index) {
			var temp = ""
			var ansOpt = ansOpts[0];
			var ansOptsArray = ansOpt.split(',');
			var div = document.createElement('div');
			div.className = 'form-group';
			var child = "<div class='questSelect'><select class='form-control' id='optdd_" + index + "' >";
			child += "<option value=''>Select</option></div>";
			for (var j = 0; j < ansOptsArray.length; j++) {
				child += "<option value='" + ansOptsArray[j] + "'>" + ansOptsArray[j]
					+ "</option></div>";
			}
			child += "</select>";
			div.innerHTML = child;
			temp = temp + div.innerHTML + "</div>";
			return temp;
		}

		function saveAnswerInDB_Multi(eventType) {
			var start0 = $("#startIndex").val();
			var end0 = $("#endIndex").val();

			var start0 = parseInt(start0);
			var end0 = parseInt(end0);

			var answerSelected = "";
			var chk;
			if (eventType == 'answered') {
				chk = checkIfSelected(start0, end0);
			} else {
				chk = 'Y';
			}

			if (chk == 'N') {
				$("#msgDiv_multi").show();
				$("#msgDiv_multi").html("<span class='errorMsg'>Please provide input value.</span>");
				setTimeout(function () {
					$("#msgDiv_multi").hide();
				}, 5000);
			} else {
				while (start0 < end0) {

					if (eventType == 'answered') {
						var qType = $('#questiontType_' + start0).val();
						if (qType == 'radio') {
							var selected = $(".ans_div_" + start0 + " :checked");
							var selectedValue = selected.val();
							var selectedLabel = selected.siblings().text();
							//$('#answerSelected').val(selectedLabel)
							answerSelected = selectedLabel;
						} else if (qType == 'checkbox') {
							var selectedLabel = "";
							$('.ans_div_' + start0 + ' input:checkbox').each(
								function () {
									if (this.checked) {
										selectedLabel = selectedLabel
											+ $(this).val() + ",";
									}
								});
							answerSelected = selectedLabel;
						} else if (qType == 'select') {
							var selectedLabel = $('#optdd_' + start0).val();
							answerSelected = selectedLabel;
						} else if (qType == 'input') {
							var selectedLabel = $('#optinput_' + start0).val();
							answerSelected = selectedLabel;
						}

						if (isEmpty(answerSelected)) {
							answerSelected = 'unanswered';
						}

					}

					isRetracted = false;
					console.log("eventType : " + eventType);

					if (eventType == 'answered') {
						timeToOpenPopUp = $("#interval_if_answered").val();
						var answeredTime = $('#interval_if_answered').val();
						console.log("next interval time updated to answeredTime : "
							+ answeredTime);
					}

					if (eventType == 'skipped') {
						answerSelected = "skipped";
						timeToOpenPopUp = $("#interval_if_closed").val();
						var answeredTime = $('#interval_if_closed').val();
						console.log("next interval time updated to skipped : "
							+ answeredTime);
					}

					console.log("next button clicked: "
						+ $('#answerSelected').val());

					timeToClosePopUp = $("#default_retrate").val();
					closePopUp();
					$.ajax({
						url: "/tp/ss_at/wat/ans?filename="
							+ $('#filename').val()
							+ "&emailid="
							+ $('#emailid').val()
							+ "&eventType="
							+ eventType
							+ "&questionID="
							+ $('#que_id_' + start0).val()
							+ "&questionDesc="
							+ encodeURIComponent($('#questionDesc_' + start0)
								.val()) + "&answerSelected="
							+ encodeURIComponent(answerSelected),
						//contentType: "post",
						success: function (data, textStatus, xhr) {
							console
								.log("answer update for "
									+ $('#filename').val());
						},
						error: function (xhr, textStatus, errorThrow) {
							console.log(errorThrow);
							console.log(textStatus);
							console.log(xhr);

							console.log("error while inserting answers for "
								+ $('#filename').val());
						}
					});

					start0++;

				}
			}
		}

		function checkIfSelected(start1, end1) {
			console.log("checking if at least 1 question is selected");
			var answerSelected = "";
			var answerFlag = 'N';
			while (start1 < end1) {
				var qType = $('#questiontType_' + start1).val();
				if (qType == 'radio') {
					var selected = $(".ans_div_" + start1 + " :checked");
					var selectedValue = selected.val();
					var selectedLabel = selected.siblings().text();
					answerSelected = selectedLabel;
				} else if (qType == 'checkbox') {
					var selectedLabel = "";
					$('.ans_div_' + start1 + ' input:checkbox').each(function () {
						if (this.checked) {
							selectedLabel = selectedLabel + $(this).val() + ",";
						}
					});
					answerSelected = selectedLabel;
				} else if (qType == 'select') {
					var selectedLabel = $('#optdd_' + start1).val();
					answerSelected = selectedLabel;
				} else if (qType == 'input') {
					var selectedLabel = $('#optinput_' + start1).val();
					answerSelected = selectedLabel;
				}

				if (!isEmpty(answerSelected) && answerFlag == 'N') {
					answerFlag = 'Y';
					break;
				}
				start1++;
			}
			return answerFlag;
		}

		function showNextQuestion() {
			if (questionlist && $('#popupQuestDiv1').css('display') == 'none') {
				if (index == questionlist.length) {
					var myVar = $('#closedPopUpID').val();
					console.log("interval cleared for : " + myVar)
					clearInterval(myVar);
					myVar = $('#startPopUpID').val();
					console.log("interval cleared for : " + myVar)
					clearInterval(myVar);
					index = 0;
					$('#popupQuestDiv1').hide();
					return;
				}
				if (index < questionlist.length) {
					console.log("loadInterval : " + $("#loadInterval").val());
					console.log("interval_if_answered : " + $("#interval_if_answered").val());
					console.log("interval_if_closed : " + $("#interval_if_closed").val());
					console.log("interval_if_retracted : " + $("#interval_if_retracted").val());
					console.log("default_retrate : " + $("#default_retrate").val());
					$('#popupQuestDiv1').show();
					$('body').removeClass('modal-open');
					$('.modal-backdrop').hide();
					var pojo = questionlist[index];
					$("#questionID").val(pojo.questionid)
					$('#question').html(pojo.question);
					$('#questionDesc').val(pojo.question);
					if (isEmpty(pojo.questionHeader)) {
						$('#questionHeader').val('Thank you for your Interest');
					} else {
						$('#questionHeader').val(pojo.questionHeader);
					}
					if (isEmpty(pojo.buttonLabel)) {
						$('#buttonLabel').val('Submit');
					} else {
						$('#buttonLabel').val(pojo.buttonLabel);
					}
					$('#headerid').html($('#questionHeader').val());

					$('#submitid').html($('#buttonLabel').val());
					$('#questiontType').val(pojo.optionHtmlType);
					$('#emailid').val($('#hidden_email').val());
					$('#answerSelected').val("");
					$("#filename").val($('#hidden_fileName').val())
					$('#ans').empty();
					var div = null;
					if (pojo.optionHtmlType == 'radio') {
						renderRadioButtonAns(pojo.options);
					} else if (pojo.optionHtmlType == 'checkbox') {
						renderCheckBoxAns(pojo.options);
					} else if (pojo.optionHtmlType == 'input') {
						renderInputTypeAns(pojo.options);
					} else {
						renderDropDownAns(pojo.options);
					}
					index = index + 1;
				}
			}
		}

		function loadQuestions(filename, fileAlias) {
			console.log("fetching question list");

			var loadInterval;
			var interval_if_answered;
			var interval_if_closed;
			var interval_if_retracted;
			var default_retrate;
			var renderFxId;
			var startPopUpID;
			var closedPopUpID;

			var url0 = "/tp/ss_at/wat/question?filename=" + filename
				+ "&fileAlias=" + fileAlias + "&isDynamicAssets="
				+ 'false';

			console.log("url:::" + url0);
			console.log('/tp');

			console.log('');
			$
				.ajax({
					url: url0,
					contentType: "application/x-www-form-urlencoded;charset=utf-8",
					success: function (result) {
						var json = $.parseJSON(result);
						console.log("fetched Interval ::: " + json.loadInterval);

						if (json.loadInterval == 0
							|| isEmpty(json.loadInterval)
							|| json.loadInterval == 'null') {
							console.log("case 1 interval check  ");

							if ('5000' == 0) {
								console.log("case 2 interval check  ");

								$("#loadInterval").val('10000');
								$("#interval_if_answered").val(
									'10000');
								$("#interval_if_closed").val(
									'10000');
								$("#interval_if_retracted").val(
									'10000');
								$("#default_retrate")
									.val('10000');
							} else {
								console.log("case 3 interval check  ");
								$("#loadInterval").val(
									'5000');
								$("#interval_if_answered").val(
									'20000');
								$("#interval_if_closed").val(
									'20000');
								$("#interval_if_retracted").val(
									'20000');
								$("#default_retrate").val(
									'');
							}
						} else {
							console.log("case 4 interval check  ");

							$("#loadInterval").val(json.loadInterval);
							$("#interval_if_answered").val(
								json.interval_if_answered);
							$("#interval_if_closed").val(
								json.interval_if_closed);
							$("#interval_if_retracted").val(
								json.interval_if_retracted);
							$("#default_retrate").val(json.default_retrate);

						}
						questionlist = json.pojoList;

						if (questionlist != null && questionlist.length > 0) {
							var timeSS = $("#loadInterval").val();

							//timeToOpenPopUp = json.loadInterval;
							//timeToClosePopUp = json.default_retrate;

							timeToOpenPopUp = $("#loadInterval").val();
							timeToClosePopUp = $("#default_retrate").val();

							questionStart();
						} else {
							console.log("question list is empty");
						}
					},
					error: function (xhr, textStatus, errorThrow) {
						console.log("error while getting questions");
					}
				});
		}

		function submitPhonePopup() {
			console.log($("#phonep").value);
			var phoneno = /^(?:\+?\d{2}[ -]?[\d -][\d -]+)$/;
			if ($("#phonep").val().match(phoneno)) {
				$("#hidden_phone").val($("#phonep").val());
				$("#msgDivfree").show();
				$("#msgDivfree")
					.html(
						"<span class='successMsg'>Your detail has been submitted successfully.</span>");
				$("#submitPhone").attr("disabled", true)
				setTimeout(function () {
					closePhonePopup('freeTextCustomPopup');
				}, 3000);
				//return true;
			} else {
				$("#msgDivfree").show();
				$("#msgDivfree")
					.html(
						"<span class='errorMsg'>Please provide Phone number in proper format </span>");


				setTimeout(function () {
					$('#msgDivfree').fadeOut('fast');
				}, 2000);
				//return false;
			}

		}

		function saveAnswerInDB(eventType) {
			if (eventType == 'answered') {
				var qType = $('#questiontType').val();
				if (qType == 'radio') {
					var selected = $(".answers :checked");
					var selectedValue = selected.val();
					var selectedLabel = selected.siblings().text();
					$('#answerSelected').val(selectedLabel)
				} else if (qType == 'checkbox') {
					var selectedLabel = "";
					$('input[type=checkbox]').each(function () {
						if (this.checked) {
							selectedLabel = selectedLabel + $(this).val() + ",";
						}
					});
					$('#answerSelected').val(selectedLabel)
				} else if (qType == 'select') {
					var selectedLabel = $('#optdd').val();
					$('#answerSelected').val(selectedLabel);
				} else if (qType == 'input') {
					var selectedLabel = $('#optinput').val();
					$('#answerSelected').val(selectedLabel);
				} else {
					$('#answerSelected').val();
				}
			}

			var answerSelectedBlank = $('#answerSelected').val().trim();

			if (isEmpty(answerSelectedBlank) && eventType == 'answered') {
				$("#msgDiv").show();

				if (qType == 'input') {
					$("#msgDiv").html("<span class='errorMsg'>Please provide input value.</span>");
				} else {
					$("#msgDiv").html("<span class='errorMsg'>Please select one of these options.</span>");
				}

				setTimeout(function () {
					$('#msgDiv').fadeOut('fast');
				}, 2000);



			} else {
				isRetracted = false;
				console.log("eventType : " + eventType);

				if (eventType == 'answered') {
					timeToOpenPopUp = $("#interval_if_answered").val();
					var answeredTime = $('#interval_if_answered').val();
					console.log("next interval time updated to answeredTime : "
						+ answeredTime);
				}

				if (eventType == 'skipped') {
					timeToOpenPopUp = $("#interval_if_closed").val();
					var answeredTime = $('#interval_if_closed').val();
					console.log("next interval time updated to skipped : "
						+ answeredTime);
				}

				console.log("next button clicked: " + $('#answerSelected').val());

				timeToClosePopUp = $("#default_retrate").val();
				closePopUp();
				$.ajax({
					url: "/tp/ss_at/wat/ans?filename=" + $('#filename').val()
						+ "&emailid=" + $('#emailid').val() + "&eventType="
						+ eventType + "&questionID=" + $('#questionID').val()
						+ "&questionDesc="
						+ encodeURIComponent($('#questionDesc').val())
						+ "&answerSelected="
						+ encodeURIComponent($('#answerSelected').val()),
					//contentType: "post",
					success: function (data, textStatus, xhr) {
						console.log("answer update for " + $('#filename').val());
					},
					error: function (xhr, textStatus, errorThrow) {
						console.log(errorThrow);
						console.log(textStatus);
						console.log(xhr);

						console.log("error while inserting answers for "
							+ $('#filename').val());
					}
				});
			}
		}
