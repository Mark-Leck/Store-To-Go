/*jshint jquery:true */
/*global PAYPAL:true */

(function () {
	'use strict';
     
	//$('#cartModal3').modal('show');


	$('.modal').on('shown', function (e) {
		// Focus on the first input when modal is available
		$(this).find(':input:text:enabled:first').focus();
	});


	$(document).on('click', '[data-modal-save="true"]', function (e) {
		var data = {},
			oldtext = document.getElementById('bob').value,
			oldtext = $.trim(oldtext),
			modal = $(this).parents('.modal').first(),
			example = modal.closest('.example'),
			textarea = example.find('textarea'),
			tryit = example.find('.tryit'),
			inputs = modal.find('.modal-body :input'),
			requiredInputs = modal.find('[required="required"]'),
			input, merchant, el, len, i, key, button;


		// Don't update if we don't have all of the required inputs
		// TODO: This can be cleaned up
		for (i = 0, len = requiredInputs.length; i < len; i++) {
			var requiredInput = $(requiredInputs[i]),
				controlGroup = requiredInput.parents('.control-group').first();

			if (requiredInput.val() === '') {
				controlGroup.addClass('error');
				requiredInput.focus();

				return;
			} else {
				controlGroup.removeClass('error');
			}
		}

		// Build a map out of the form data
		for (i = 0, len = inputs.length; i < len; i++) {
			input = $(inputs[i]);

			if(input.is(':checkbox')) {
				if(input.is(':checked')) {
					data[input.attr('name')] = {
						value: input.val()
					};
				}
			} else {
				data[input.attr('name')] = {
					value: input.val()
				};
			}
		}

		// Create a script tag to use as the HTML
		el = document.createElement('script');

		if (data.button && data.button.value === 'cart') {
			el.src = '/shop/includes/paypal_files/paypal-button.js?merchant=' + data.business.value;
		} else {
			el.src = '/shop/includes/paypal_files/paypal-button.js?merchant=' + data.business.value;
		}

		for (key in data) {
			if (key !== 'business' && data[key].value !== '') {
				el.setAttribute('data-' + key, data[key].value);
			}
		}
		textarea.text(el.outerHTML.replace(/data-/g, "\n    data-").replace("></" + "script>", "\n></" + "script>"));
		
		bob.insertAdjacentHTML('afterbegin', oldtext);
              


		// Update the button
		/*button = PAYPAL.apps.ButtonFactory.create(data.business.value, data, data.button.value);
		//button = $(button);
		//button.css('display', 'none');

		//tryit.empty();
		//tryit.append(button);
		//tryit.animate({
			//height: (button.height() || 130) * 2
		//}, 300, function () {
		//	button.fadeTo(300, 1);
		//});

		// Close the modal */
		modal.modal('hide');
		// Open new model with button code
		document.querySelectorAll("button[type='submit']")[0].click();
		//$('#cartModal2').modal('show');

		// Track Events
		//if (data.button) {
			//_gaq.push(['_trackEvent', 'JavaScriptButtons', data.button.value]);
		//}
	});

}());
