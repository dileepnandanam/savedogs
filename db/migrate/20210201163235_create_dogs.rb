class CreateDogs < ActiveRecord::Migration[6.0]
  def change
    create_table :dogs do |t|
      t.float :lat
      t.float :lngt
      t.integer :description
      t.integer :user_id

      t.timestamps
    end
  end
end
