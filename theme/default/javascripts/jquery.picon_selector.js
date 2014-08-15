jQuery(document).ready(function($) {
    $('#icon > option, #tagline_icon > option').each(function(index, el) {
        var picon = $(this).text();
        addPicon(picon, $(this).is(':selected'));
    });
    $('div.picon_select_holder').click(function(event) {
        var picon = $(this).attr('data-picon');
        selectPicon(picon);
    });
    $('#icon, #tagline_icon').change(function(event) {
        picon = $(this).find('option:selected').text();
        selectPicon(picon);
    });
});
function selectPicon(picon) {
    $('div.picon_select_holder').removeClass('selected');
    $('div.picon_select_holder[data-picon="' + picon + '"]').addClass('selected');
    $('#icon option, #tagline_icon option').filter(function() {
        return $.trim($(this).text()) == picon; 
    }).prop('selected', true);
};
function addPicon(picon, selected) {
    var addClass = '';
    if (selected === true) {
        addClass = ' selected';
    };
    $('#picon_choice').append("<div class='picon_select_holder" + addClass + "' data-picon='" + picon + "'><i class='icon-picons-" + picon + " picon_select'></i></div>");
};