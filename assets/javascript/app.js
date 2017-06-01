$(document).ready(function() {


var arrayOfButtons = ["cavs", "indians", "cleveland monsters", "ohio state football"];
var apiKey = "dc6zaTOxFJmzC";


function renderButtons() {
	$(".clickable").remove();
	for (var i = 0; i < arrayOfButtons.length; i++) {
		var buttonNew = $("<button>");
		buttonNew.attr("class", "clickable");
		buttonNew.text(arrayOfButtons[i]);
		$(".selectorButtons").append(buttonNew);
	}
	$('.clickable').on('click', function() {
		$('.pictures').html('');
		var query = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&r=pg&limit=5"   
  	query += "&q=" + $(this).text();
//	  console.log(query);
	  $.ajax({
	  	url: query,
	  	method: 'GET', 
	  }).done(function(response) {
//	  		console.log(response);
	  		for (var i = 0; i < response.data.length; i++) {
//	  			console.log(response.data[i]);
	  			var tempBlock = $("<div>");
	  			var tempImage = $("<img>");
	  			tempImage.attr('src', response.data[i].images.original.url);
	  			tempImage.attr('class', 'movable');
	  			tempImage.attr('still', response.data[i].images.original_still.url);
	  			tempImage.attr('moving', response.data[i].images.original.url);
//	  			tempBlock.attr("html", "<img src=" + response.data[i].images.original_still.url + ">");
					$(tempBlock).append(tempImage);
					var tempRating = $("<p>");
					tempRating.text("Rating: " + response.data[i].rating);
					$(tempBlock).append(tempRating);
	  			$(".pictures").append(tempBlock);
	  		}
		}).fail(function(err) {
			throw err;
		});


//		console.log("exit");
	});

	

//	return false;
}
	$('.pictures').on('click', 'img', function() {
		console.log('image clicked');
		if ($(this).hasClass('movable')) {
			console.log('movable');
			$(this).toggleClass('movable');
			console.log($(this));
			console.log($(this).attr('still'));
			$(this).attr('src', $(this).attr('still'));
		} else {
			console.log('still');
			$(this).attr('src', $(this).attr('moving'));
			$(this).toggleClass('movable');
		}
		//		$(this).attr('src', moving).addClass('freezable').removeClass('movable');
	});

	renderButtons();

	$('#addPicture').on('click', function() {
		console.log($("input#picture-input").val());

		var inputPicture = $("input#picture-input").val().trim();
		$("input#picture-input").val('');
		if (inputPicture != '') {
			arrayOfButtons.push(inputPicture);
		}
		renderButtons();
		return false;
	});

	$('img').on('click', function() {
		console.log('image clicked');
		//		$(this).attr('src', moving).addClass('freezable').removeClass('movable');
	});


	
})

