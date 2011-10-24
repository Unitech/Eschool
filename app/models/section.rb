class Section < ActiveRecord::Base
  belongs_to :chapter

  has_attached_file :video
end
