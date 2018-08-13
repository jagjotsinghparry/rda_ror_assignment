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

require 'rails_helper'

RSpec.describe Box, type: :model do

  context 'Validations' do
    it { should validate_presence_of :number }
    it { should validate_presence_of :color }
    it { should validate_presence_of :user }
    it { should validate_uniqueness_of :number }
  end

end
