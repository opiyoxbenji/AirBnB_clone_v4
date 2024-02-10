$(document).ready(function() {
    let amenityIds = {};
    let locationIds = {};
    $('input[type=checkbox]').change(function() {
        let id = $(this).data('id');
        let name = $(this).data('name');
        if (this.checked) {
            if ($(this).hasClass('state')) {
                locationIds['states'] = locationIds['states'] || {};
                locationIds['states'][id] = name;
            } else if ($(this).hasClass('city')) {
                 locationIds['cities'] = locationIds['cities'] || {};
                 locationIds['cities'][id] = name;
            } else {
                amenityIds[id] = name;
            }
        } else {
            if ($(this).hasClass('state')) {
                delete locationIds['states'][id];
            } else if ($(this).hasClass('city')) {
                delete locationIds['cities'][id];
            } else {
                delete amenityIds[id];
            }
        }
        let locationList = '';
        if (Object.keys(locationIds).length > 0) {
            let states = locationIds['states'] ? Object.values(locationIds['states']) : [];
            let cities = locationIds['cities'] ? Object.values(locationIds['cities']) : [];
            locationList = [...states, ...cities].join(', ');
        }
        $('.locations h4').text(locationList);
    });
    $('button').click(function() {
        let requestData = {
            amenities: Object.values(amenityIds),
            states: Object.values(locationIds['states']),
            cities: Object.values(locationIds['cities'])
        };
    $.ajax({
        type: 'GET',
        url: 'http://0.0.0.0:5001/api/v1/status/',
        dataType: 'json',
        success: function(response) {
           if (response.status === 'OK') {
               $('#api_status').addClass('available');
           } else {
               $('#api_status').removeClass('available');
           }
        }
    });
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify(requestData),
        dataType: 'json',
        success: function(response) {
            $('.places').empty();
            response.forEach(function(place) {
                let article = $('<article>');
                let titleBox = $('<div class="title_box">');
                let title = $('<h2>').text(place.name);
                let price = $('<div class="price_by_night">').text('$' + place.price_by_night);
                titleBox.append(title, price);
                let information = $('<div class="information">');
                let maxGuest = $('<div class="max_guest">').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''));
                let numberRooms = $('<div class="number_rooms">').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : ''));
                let numberBathrooms = $('<div class="number_bathrooms">').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''));
                information.append(maxGuest, numberRooms, numberBathrooms);
                let user = $('<div class="user">').text('Owner: ' + place.user.first_name + ' ' + place.user.last_name);
                let description = $('<div class="description">').text(place.description);
                article.append(titleBox, information, user, description);
                $('.places').append(article);
            });
          }
       });
    });
    $('h2#showReviews').click(function() {
        let buttonText = $(this).find('span').text();
        if (buttonText === 'Reviews') {
            $(this).find('span').text('hide');
        } else {
           $('.reviews').empty();
           $(this).find('span').text('Reviews');
        ]
    });
});
