class BoxesController < ApplicationController

  # GET boxes.json
  # It will return all the box data in JSON format for our browser to process
  def index
    @boxes = Box.all
    respond_to do |format|
      format.json { render json: @boxes }
    end
  end

  # PATCH boxes/:number.json
  # It will update the number of box given
  def update
    box = Box.where(number: params[:number]).last
    color = params[:color]

    # Check color length and if it is a valid hex string or not, also check if the user session is set
    if color.length === 7 and !color[1..6][/\H/] and box and session[:user]
      box.update(color: params[:color], user: session[:user])
      # Send a broadcast
      ActionCable.server.broadcast 'box:all', BoxSerializer.new(box)
      respond_to do |format|
        format.json { render json: { status: true, box: BoxSerializer.new(box) } and return }
      end
    end

    respond_to do |format|
      format.json { render json: { status: false } }
    end
  end

end
