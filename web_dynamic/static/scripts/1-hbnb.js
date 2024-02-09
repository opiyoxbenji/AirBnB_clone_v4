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
