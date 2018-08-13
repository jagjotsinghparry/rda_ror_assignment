class PagesController < ApplicationController
  def index
    session[:user] ||= SecureRandom.hex(6)
    @user = session[:user]
  end
end
