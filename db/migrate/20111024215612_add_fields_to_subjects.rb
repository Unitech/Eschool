class AddFieldsToSubjects < ActiveRecord::Migration
  def change
    add_column :subjects, :small_resume, :string
    add_column :subjects, :url_indice, :string
  end
end
