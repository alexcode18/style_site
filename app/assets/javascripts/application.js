// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var fetchLimit = 10;
$(function(){
  console.log('Loaded, bro');
  
  fetchPosts();
  $('body').on('click', '.remove', removePost);
  $('body').on('click', '#new-post', addPost);
  $('#footer').on('click', showMore);
  $('body').on('click', '.edit', editPost);
  $('body').on('click', '.submit-edit', updatePost);
  $('body').on('click', '#close', close);
  $('body').on('mouseenter', '.card', displayPostInfo);
  $('body').on('mouseleave', '.card', hidePostInfo);
});

// :title, :content, :author, :category
//   validates :image_url, format:

function fetchPosts() {
	$.get('/posts').done(function(data){
		data.forEach(renderPost);
	});
}

function displayPosts(data) {
}

function renderPost(data) {
	var postBox = $('<div>').attr('class', 'card').attr('id', data.id);
	var imageBox = $('<div>').attr('class', 'image');
	var hoverOver = $('<div>').attr('class', 'hover_box');
	var img = $('<img>').attr('src', data.image_url);
	var title = $('<h4>').text(data.title);
	var author = $('<p>').text(data.author);
	var content = $('<p>').text(data.content);
	var edit = $('<button>').text('edit').addClass('edit').data('id', data);
	var remove = $('<button>').text('remove').addClass('remove').data('id', data.id);

	$(imageBox).append(img);
	$(hoverOver).append(title).append(author).append(edit).append(remove);
	$(postBox).append(imageBox).append(hoverOver);
	
	$('#posts-container').append(postBox);
}

function displayPostInfo() {
	$(this).find('.hover_box').animate({top: -120 + 'px'}, 900);
}

function hidePostInfo() {
	$(this).find('.hover_box').animate({top: 0 + 'px'}, 300);
}

function removePost() {
	console.log('removePost');
	var postID = $(this).data('id');
	var post = $(this).closest('.card');
	$.ajax({
		url: '/posts/' + postID,
		type: 'delete'
	})
		.done(function(){
			post.remove();
		});
}

function addPost() {
		var title = $('input[name="title"]').val()
		var author = $('input[name="author"]').val()
    var image_url = $('input[name="image_url"]').val()
    var content = $('input[name="content"]').val()
    var category = $('input[name="category"]').val()
    
    var newPost = {
    	post: {
    		title: title,
    		author: author,
    		image_url: image_url,
    		content: content,
    		category: category
    	}
    }

   	$.post('/posts', newPost).done(renderPost);
   	$('input[name="title"]').val('')
		$('input[name="author"]').val('');
		$('input[name="image_url"]').val('');
		$('input[name="content"]').val('');
		$('input[name="category"]').val('');
}

function showMore() {
	$.get('/show_more', {offset: fetchLimit}).done(function(data){ //offset is the reference name for controller params
		data.forEach(renderPost);
	});
	fetchLimit += 10;
}

function editPost() {
	var postID = $(this).data('id');
	console.log(postID.id);
	$.get('/posts/' + postID.id).done(showEditForm);	
}

function showEditForm(currentPost){
	var titleLabel = $('<label>').text('Title: ');
	var titleBox = $('<input>').attr('name', 'title_edit').val(currentPost.title);
	var authorLabel = $('<label>').text('Author: ');
	var authorBox = $('<input>').attr('name', 'author_edit').val(currentPost.author);
	var imageLabel = $('<label>').text('Image: ');
	var imageBox = $('<input>').attr('name', 'image_url_edit').val(currentPost.image_url);
	var categoryLabel = $('<label>').text('Category: ');
	var categoryBox = $('<input>').attr('name', 'category_edit').val(currentPost.category);
	var submit = $('<button>').text('submit').addClass('submit-edit').data('id', currentPost.id);
	
	$('#card-info').append(titleLabel)
								.append(titleBox)
								.append('<br>')
								.append(authorLabel)
								.append(authorBox)
								.append('<br>')
								.append(imageLabel)
								.append(imageBox)
								.append('<br>')
								.append(categoryLabel)
								.append(categoryBox)
								.append('<br>')
								.append(submit);
								
	$('div#modal').css('display', 'inline');
}

function updatePost() {
	var postID = $(this).data('id');
	var post = $(this).closest('.card');
	console.log(postID);	
	var title = $('input[name="title_edit"]').val();
	var author = $('input[name="author_edit"]').val();
	var image = $('input[name="image_url_edit"]').val();
	var category = $('input[name="category_edit"]').val();

	var updatedPost = {
		post: {
			title: title,	
			author: author,
			image_url: image,
			category: category
		}
	};

	$.ajax({
		url: '/posts/' + postID,
		type: 'put',
		data: updatedPost
	}).done(renderPost);

	close();
};

function close() {
	
	$('div#modal').hide();
};
	