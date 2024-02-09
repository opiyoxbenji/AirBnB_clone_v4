$(document).ready(function() {
    let amenityIds = {};
    $('input[type=checkbox]').change(function() {
        if (this.checked) {
            amenityIds[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenityIds[$(this).data('id')];
        }
        let amenityList = Object.values(amenityIds).join(', ');
        $('.amenities h4').text(amenityList);
    });
});
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
