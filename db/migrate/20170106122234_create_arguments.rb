class CreateArguments < ActiveRecord::Migration[5.0]
  def change
    create_table :arguments do |t|
      t.string :title
      t.text :content
      t.integer :place, default: 0
      t.belongs_to :argumentation, index: true

      t.timestamps
    end
  end
end
