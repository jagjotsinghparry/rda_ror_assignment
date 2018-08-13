App.box = App.cable.subscriptions.create "BoxChannel",
  connected: ->
    console.log('connected')

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    $current_row = $('#box' + data.number)
    $current_row = $('#box-' + data.number)
    $current_row.attr('style', "background-color: " + data.color + ";")
    $current_row.attr('data-original-title', "User: " + data.user + "<br />Time: " + data.last_updated)
