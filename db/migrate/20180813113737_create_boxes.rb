class CreateBoxes < ActiveRecord::Migration[5.2]
  def change
    create_table :boxes do |t|
      t.integer :number
      t.string :color
      t.string :user

      t.timestamps
    end
    add_index :boxes, :color
    add_index :boxes, :user
  end
end
