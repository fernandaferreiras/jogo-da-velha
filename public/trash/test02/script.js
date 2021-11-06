$('#myModal').on('show.bs.modal', function (e) {
    var anim = $('#entrance').val();
    $('.modal .modal-dialog').attr('class', 'modal-dialog  ' + 'fadeInUpBig' + '  animated');
})
$('#myModal').on('hide.bs.modal', function (e) {
    var anim = $('#exit').val();
    $('.modal .modal-dialog').attr('class', 'modal-dialog  ' + 'fadeOutDown' + '  animated');
})

$('.modal-content').resizable({
    //alsoResize: ".modal-dialog",
    minWidth: 320
});

$('.modal-dialog').resize(function () {
    $('.modal-dialog').css("max-width", "90vw");
});

$('.modal-content').draggable();

$('.modal-content').on('show.bs.modal', function () {
    $(this).find('.modal-body').css({
        'max-height': '100%'
    });
});