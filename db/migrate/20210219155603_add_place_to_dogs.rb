class AddPlaceToDogs < ActiveRecord::Migration[6.0]
  def change
    add_column :dogs, :place, :string
  end
end
