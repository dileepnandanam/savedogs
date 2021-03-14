# frozen_string_literal: true

class CreateDogs < ActiveRecord::Migration[6.0]
  def change
    create_table :dogs do |t|
      t.float :lat
      t.float :lngt
      t.text :description
      t.integer :user_id
      t.text :needs, default: ''
      t.string :type, default: 'Stray'

      t.timestamps
    end
  end
end
