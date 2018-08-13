class BoxChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'box:all', coder: ActiveSupport::JSON
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
