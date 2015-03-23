class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.string :content
      t.string :image_url
      t.string :author
      t.string :category
      
      t.timestamps
    end
  end
end
