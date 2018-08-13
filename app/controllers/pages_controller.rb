class PagesController < ApplicationController
  def index
    session[:user] ||= SecureRandom.hex(6)
    @user = session[:user]
    @top_users = Box.where('user != "NA"').group(:user).select('COUNT(user) number, user user').order('number DESC').limit(3)
    @top_colors = []
    @top_users.each do |user|
      color = Box.where(user: user.user).group(:color).select('COUNT(color) number, color color').order('number DESC').limit(3)
      @top_colors << color
    end
  end
end
