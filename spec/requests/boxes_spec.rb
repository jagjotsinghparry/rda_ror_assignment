require 'rails_helper'

RSpec.describe '/boxes', type: :request do
  context 'GET index' do
    it 'responds with all boxes data' do
      get '/boxes.json'
      expect(response.content_type).to eq('application/json')
      expect(JSON.parse(response.body).length).to eq(400)
    end
  end

  context 'PATCH update' do
    it 'will update the box record with valid color' do
      params = {
          color: '#CC3333'
      }

      box_number = 5
      old_box = Box.where(number: box_number).last
      expect(old_box.user).to eq('NA')

      get '/'
      patch "/boxes/#{box_number}.json", params: params
      new_box = Box.where(number: box_number).last

      expect(response.content_type).to eq('application/json')
      expect(new_box.color).to eq(params[:color])
      expect(new_box.user.length).to eq(12)
    end

    it 'will not update the box with invalid color' do
      params = {
          color: '#ASDASD'
      }

      box_number = 5
      old_box = Box.where(number: box_number).last
      expect(old_box.color).to eq('#FFFFFF')

      get '/'
      patch "/boxes/#{box_number}.json", params: params
      new_box = Box.where(number: box_number).last

      expect(response.content_type).to eq('application/json')
      expect(new_box.color).to eq('#FFFFFF')
    end

    it 'will not update if session is not set' do
      params = {
          color: '#123456'
      }

      box_number = 5
      old_box = Box.where(number: box_number).last
      expect(old_box.color).to eq('#FFFFFF')

      patch "/boxes/#{box_number}.json", params: params
      new_box = Box.where(number: box_number).last

      expect(response.content_type).to eq('application/json')
      expect(new_box.color).to eq('#FFFFFF')
    end
  end
end