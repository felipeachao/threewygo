class Course < ApplicationRecord
  has_many_attached :videos
  before_save :set_file_size
  before_save :generate_random_filename_for_video

  private

  def generate_random_filename_for_video
    if videos.attached?
      videos.each do |video|
        random_filename = "#{SecureRandom.uuid}#{File.extname(video.filename.to_s)}"
        video.blob.update(filename: random_filename)
      end
    end
  end

  def set_file_size
    total_size = self.videos.sum { |video| video.blob.byte_size }
    self.file_size = (total_size.to_f / 1024 ).round(2)
  end
end
