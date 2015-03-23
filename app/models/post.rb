class Post < ActiveRecord::Base
  validates_presence_of :title, :content, :author, :category
  validates :image_url, format: {with: /https{0,1}:\/\//}
end