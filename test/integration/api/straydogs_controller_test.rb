require 'test_helper'

class Api::StraydogsControllerTest < ActionDispatch::IntegrationTest
  include ActionDispatch::TestProcess::FixtureFile

  def setup
    @user, @token = user_with_auth_token(users(:one))
  end

  def should_list_properties_of_dog
    dog = Dog.create(
      description: 'description text',
      image: fixture_file_upload('assets/image.png', 'image/png')
    )
    get api_straydog_path(dog.id), {}, headers: @token
    assert_ok response
    assert_equal response.keys.sort, ["id",
                                      "user_id",
                                      "image",
                                      "lat",
                                      "lngt",
                                      "place",
                                      "description",
                                      "created_at",
                                      "attachment_type",
                                      "dog_update_count"].sort
  end
end