class AddDogUpdatesCountToDog < ActiveRecord::Migration[6.0]
  def change
    add_column :dogs, :dog_update_count, :integer, default: 0
  end
end
