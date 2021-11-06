(function () {
    $(function () {
        // add click to button
        $('button').click(function (evt) {
            evt.stopPropagation();
            $('.message').addClass('active');
        });
        // add click to message itself
        $('.message').click(function (evt) {
            evt.stopPropagation();
        });
        $(document).add('.okay').click(function () {
            $('.message').removeClass('active');
        });
    });

}).call(this);