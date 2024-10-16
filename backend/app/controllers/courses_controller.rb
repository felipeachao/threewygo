class CoursesController < ApplicationController
  before_action :set_course, only: [:update, :destroy]

  def active_courses
    courses = Course.where('end_date >= ?', Date.today)
    render json: courses.map { |course|
      course.as_json.merge(video_urls: course.videos.map { |video| url_for(video) }) if course.videos.attached?
    }
  end

  def create
    course = Course.new(course_params)
    if course.save
      attach_videos(course) if params[:videos].present?
      render json: course, status: :created
    else
      render json: course.errors, status: :unprocessable_entity
    end
  end

  def update
    if @course.update(course_params)
      attach_videos(@course) if params[:videos].present?
      render json: @course
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @course.destroy
    head :no_content
  end

  def video_sizes_report
    total_size = Course.sum(:file_size) 
    render json: { total_video: total_size } 
  end

  private

  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.permit(:title, :description, :end_date, videos: [])
  end

  def attach_videos(course)
    total_size = 0
    videos = params[:videos].is_a?(Array) ? params[:videos] : [params[:videos]]
    videos.each do |video|
      course.videos.attach(video)
      total_size += video.size
    end
      course.update(file_size: (total_size.to_f / 1024).round(2))
  end


end

