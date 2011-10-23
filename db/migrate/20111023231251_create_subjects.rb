class CreateSubjects < ActiveRecord::Migration
  def change
    create_table :subjects do |t|
      t.string :subject_name
      t.text :resume

      t.timestamps
    end
  end
end
