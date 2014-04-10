jQuery(document).ready(function($) {
    $('#tagline_icon > option').each(function(index, el) {
        var picon = $(this).text();
        addPicon(picon, $(this).is(':selected'));
    });
    $('div.picon_select_holder').click(function(event) {
        $('div.picon_select_holder').removeClass('selected');
        $(this).addClass('selected');
        var picon = $(this).attr('data-picon');
        $('#tagline_icon option').filter(function() {
            return $.trim($(this).text()) == picon; 
        }).prop('selected', true);
    });
});
function addPicon(picon, selected) {
    var addClass = '';
    if (selected === true) {
        addClass = ' selected';
    };
    $('#picon_choice').append("<div class='picon_select_holder" + addClass + "' data-picon='" + picon + "'><i class='icon-picons-" + picon + " picon_select'></i></div>");
};