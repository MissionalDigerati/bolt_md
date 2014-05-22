$(function(){
    var table = $("table").stupidtable();
    table.on("aftertablesort", function (event, data) {
        var th = $(this).find("th");
        th.find(".arrow").remove();
        var dir = $.fn.stupidtable.dir;

        var arrow = data.direction === dir.ASC ? "icon-chevron-up" : "icon-chevron-down";
        th.eq(data.column).append('<i class="' + arrow +' arrow" style="padding-left: 5px;"></i>');
    });
    $('th.sort_on_load').click();
});