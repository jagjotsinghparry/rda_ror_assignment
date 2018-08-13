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
    let i, j, count = 1;
    let $main_table = $('#main-table');
    let $current_row;
    $.get('/boxes.json').then(function(resp) {
        for(i = 1; i <= 20; i++) {
            $main_table.append('<tr id="row-' + i + '"></tr>');
            $current_row = $('#row-' + i);
            for(j = 1; j <= 20; j++) {
                $current_row.append('<td id="box-' + count + '"  class="box"  data-number="' + count + '"  style="background-color: ' + resp[count - 1].color + '" data-toggle="tooltip" data-html="true" title="User: ' + resp[count - 1].user + '<br />Time: ' + resp[count - 1].last_updated + '"></td>');
                count++;
            }
        }
        $('.box').tooltip();
    });

    $('body').on('click', 'td.box', function() {
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
                let $box = $('#box-' + number);
                $box.attr('style', 'background-color: ' + color);
                $box.attr('data-toggle', 'tooltip');
                $box.attr('data-html', 'true');
                $box.attr('data-original-title', 'User: ' + resp.box.user + '<br />Time: ' + resp.box.last_updated);
            }
        })
    });

    setInterval(function() {
        let $current_row;
        $.get('/boxes.json').then(function(resp) {
            for(i = 1; i <= 400; i++) {
                $current_row = $('#box-' + i);
                $current_row.attr('style', "background-color: " + resp[i - 1].color + ";");
                $current_row.attr('data-original-title', "User: " + resp[i - 1].user + "<br />Time: " + resp[i - 1].last_updated);
            }
            $('.box').tooltip();
        });
    }, 2000);
});