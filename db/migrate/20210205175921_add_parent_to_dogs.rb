class AddParentToDogs < ActiveRecord::Migration[6.0]
  def change
    add_column :dogs, :parent_id, :integer
  end
end
