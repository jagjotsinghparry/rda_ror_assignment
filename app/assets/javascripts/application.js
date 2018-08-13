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
//= require cable
//= require_tree .


$(function() {
    $('#color').colorPicker();

    let i, j, count = 1;
    let $main_table = $('#main-table');
    let $current_row;
    // Fetch all boxes
    $.get('/boxes.json').then(function(resp) {
        for(i = 1; i <= 20; i++) {
            // Make table-rows
            $main_table.append('<tr id="row-' + i + '"></tr>');
            $current_row = $('#row-' + i);
            for(j = 1; j <= 20; j++) {
                // Append table-data in each row sequentially
                $current_row.append('<td id="box-' + count + '"  class="box"  data-number="' + count + '"  style="background-color: ' + resp[count - 1].color + '" data-toggle="tooltip" data-html="true" title="User: ' + resp[count - 1].user + '<br />Time: ' + resp[count - 1].last_updated + '"></td>');
                count++;
            }
        }
        // Activate tooltips
        $('.box').tooltip();
    });

    // Dynamic click event listener if anybody clicks a box
    $('body').on('click', 'td.box', function() {
        let number = $(this).data('number');
        let color = $('#color').val();

        // Send request to server for processing
        $.ajax('/boxes/' + number + '.json', {
            data: JSON.stringify({
                color: color
            }),
            dataType: 'JSON',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });
});