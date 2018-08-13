// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .


$(function() {
    let i = 1, j = 1, count = 1;
    let $main_table = $('#main-table');
    for(i = 1; i <= 20; i++) {
        $main_table.append('<tr id="row-' + i + '"></tr>');
        let $current_row = $('#row-' + i);
        for(j = 0; j < 20; j++) {
            $current_row.append('<td id="box-' + count + '" class="box" data-number="' + count + '"></td>');
            count++;
        }
    }

    $('.box').on('click', function() {
       let number = $(this).data('number');
       let color = $('#color').val();

       $.ajax('/boxes/' + number + '.json', {
           data: JSON.stringify({
               color: color
           }),
           dataType: 'JSON',
           method: 'PATCH',
           headers: {
               'Content-Type': 'application/json'
           }
       }).then(function(resp) {
           if(resp.status === true) {
               $('#box-' + number).attr('style', 'background-color: ' + color);
           }
       })
    });
});