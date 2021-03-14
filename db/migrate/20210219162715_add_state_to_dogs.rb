# frozen_string_literal: true

class AddStateToDogs < ActiveRecord::Migration[6.0]
  def change
    add_column :dogs, :state, :string, default: 'new'
  end
end
