class AddRolesToUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :roles do |t|
      t.string :role
      t.timestamps
    end

    create_table :user_roles do |t|
      t.belongs_to :user, index: true
      t.belongs_to :role, index: true
      t.timestamps
    end
  end
end
