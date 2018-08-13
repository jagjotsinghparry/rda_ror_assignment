require 'rails_helper'

RSpec.feature 'Homepage', js: true do
  scenario 'visit' do
    visit '/'
    expect(page).to have_title 'ROR Assignment'
    expect(page.all('td').count).to eq(400)
  end
end