class CreateArgumentComments < ActiveRecord::Migration[5.0]
  def change
    create_table :argument_comments do |t|

      t.string :title
      t.text :content
      t.belongs_to :argument, index: true
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
