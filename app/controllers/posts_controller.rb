class PostsController < ApplicationController

  def index
    @posts = Post.order(created_at: :desc).limit(10)
    render json: @posts
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  def create
    @post = Post.create(post_params)
    render json: @post
  end

  def update
    @post = Post.find(params[:id])
    @post.update(post_params)
    render json: @post
  end

  def destroy
    @post=Post.find(params[:id])
    @post.destroy()
    render json: @post
  end

  def show_more
    @posts = Post.order(created_at: :desc).limit(10).offset(params[:offset])
    render json: @posts
  end

  def fetch_one
    
  end

  private

  def post_params
    params.require(:post).permit(:title, :author, :image_url, :content, :category)
  end

end