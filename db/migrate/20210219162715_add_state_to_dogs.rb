class AddStateToDogs < ActiveRecord::Migration[6.0]
  def change
    add_column :dogs, :state, :string
  end
end
