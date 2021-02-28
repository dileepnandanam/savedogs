class AddStateToDogUpdate < ActiveRecord::Migration[6.0]
  def change
    add_column :dog_updates, :state, :string, default: 'new'
  end
end
