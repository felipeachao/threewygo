class AddFileSizeToCourses < ActiveRecord::Migration[7.2]
  def change
    add_column :courses, :file_size, :float
  end
end