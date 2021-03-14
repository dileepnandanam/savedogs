# frozen_string_literal: true

class CreateAppConfigs < ActiveRecord::Migration[6.0]
  def change
    create_table :app_configs do |t|
      t.string :name
      t.string :value
      t.timestamps
    end
  end
end
