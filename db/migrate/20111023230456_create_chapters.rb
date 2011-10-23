class CreateChapters < ActiveRecord::Migration
  def change
    create_table :chapters do |t|
      t.boolean :enabled
      t.string :chapter_title
      t.integer :chapter_number
      t.text :resume
      t.references :subject

      t.timestamps
    end
    add_index :chapters, :subject_id
  end
end
