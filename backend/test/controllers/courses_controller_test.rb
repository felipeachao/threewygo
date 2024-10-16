# test/controllers/courses_controller_test.rb
require 'test_helper'

class CoursesControllerTest < ActionDispatch::IntegrationTest
  test "should get active courses" do
    get courses_active_url
    assert_response :success
  end
end
