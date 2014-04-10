jQuery(document).ready(function($) {
    var picon = $('#tagline_icon').find(":selected").text();
     changePicon(picon);
     $('#tagline_icon').change(function(event) {
        var picon = $(this).find("option:selected").text();
         changePicon(picon);
     });
});
function changePicon(picon) {
    $('#picon_choice').html("<i class='icon-picons-" + picon + "' style='font-size: 40px;'></i>");
};