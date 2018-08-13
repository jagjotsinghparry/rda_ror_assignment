class BoxSerializer < ActiveModel::Serializer
  attributes :number, :user, :color, :last_updated

  def last_updated
    object.updated_at.in_time_zone('Kolkata').strftime('%d/%m/%Y %H:%M')
  end
end
