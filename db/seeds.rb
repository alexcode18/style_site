# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Post.delete_all

authors = %w(Nebuchadnezzar Hamurrabi Appolonia Prince Bathsheeba)

title = {
  article: ['The', 'A', 'Another', 'Top'],
  buzzword: %w(Spectacular Amazing Last Perfect Extravagant Beautiful),
  final: %w(Weekend Getaway Party Choice Vacation Celebration Project)
}

images = [
  'http://vivifypicture.com/wp-content/uploads/2010/12/Romantic-Style-Wedding-Dresses-from-Behold-Jill-Stuart1.jpg',
  'https://astairwaytofashion.files.wordpress.com/2014/02/518.jpg',
  'http://static.idolator.com/uploads/2014/10/nicki-minaj-luomo-vogue-5.jpg',
  'http://static.idolator.com/uploads/2012/12/17/gwen-stefani-vogue--600x800.jpg',
  'http://static.idolator.com/uploads/2012/10/09/demi-lovato-teen-vogue-2-600x800.jpg',
  'https://s-media-cache-ak0.pinimg.com/736x/36/42/01/364201bd6d7f7010fbcce24a0b5af692.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/40/d6/8c/40d68cad760ee6cba2720ea3fa8ab3d0.jpg',
  'http://cdn.trendhunterstatic.com/thumbs/vogue-uk-january-2014.jpeg',
  'http://www.obsessionphoto.com/upload/article/496/165-natalia-vodianova-br-vogue-peter-lindbergh.jpg',
  'http://www.unili.com/wp-content/uploads/2014/12/05-rosie-huntington-whiteley-for-vogue-mexico-november-2014.jpg',
  'http://www.bellanaija.com/wp-content/uploads/2014/01/African-Visions-for-Vogue-Accessory-Editorial-BellaNaija-January-2014-4.jpg',
  'http://cdn.trendhunterstatic.com/thumbs/vogue-australia-cool-change.jpeg',
  'http://www.trendnista.com/wp-content/uploads/2009/09/magdalena-frackowiak-vogue2.jpg'
]

content = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo blanditiis alias at ipsam placeat?',
  'Ut facere corrupti expedita, reiciendis itaque cupiditate adipisci dolorem, eos, iste aperiam culpa nemo, nesciunt animi.'
]

categories = ['fashion', 'style', 'beauty', 'scents', 'vacation', 'home']

2000.times do
  Post.create!(
    author: authors.sample,
    content: content.sample,
    image_url: images.sample,
    title: title[:article].sample + ' ' + title[:buzzword].sample + ' ' + title[:final].sample(2).join(' ') + '!',
    category: categories.sample
    )
end