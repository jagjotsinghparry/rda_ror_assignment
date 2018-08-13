# == Schema Information
#
# Table name: boxes
#
#  id         :integer          not null, primary key
#  number     :integer
#  color      :string(255)
#  user       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Box < ApplicationRecord

  validates :number, :color, :user, presence: true
  validates :number, uniqueness: true

end
