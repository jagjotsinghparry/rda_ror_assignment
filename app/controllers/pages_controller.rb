class PagesController < ApplicationController
  def index
    unless session[:user]
      session[:user] = SecureRandom.hex(6)
    end
  end
end
