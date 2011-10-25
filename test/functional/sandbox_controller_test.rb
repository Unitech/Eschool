require 'test_helper'

class SandboxControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get compile" do
    get :compile
    assert_response :success
  end

end
