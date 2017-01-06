class CreateArgumentations < ActiveRecord::Migration[5.0]
  def change
    create_table :argumentations do |t|
      t.string :title
      t.text :content
      t.boolean :published, default: false
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
