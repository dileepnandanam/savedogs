# frozen_string_literal: true

class CreateDogUpdates < ActiveRecord::Migration[6.0]
  def change
    create_table :dog_updates do |t|
      t.integer :dog_id
      t.text :description
      t.integer :user_id

      t.timestamps
    end
  end
end
