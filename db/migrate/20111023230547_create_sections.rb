class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.boolean :enabled
      t.string :section_title
      t.integer :section_number
      t.text :resume
      t.references :chapter

      t.timestamps
    end
    add_index :sections, :chapter_id
  end
end
