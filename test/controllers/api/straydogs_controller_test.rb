require 'test_helper'

class Api::StraydogsControllerTest < ActionDispatch::IntegrationTest
  include ActionDispatch::TestProcess::FixtureFile

  def setup
    @user, @token = user_with_auth_token(users(:one))
  end

  def test_show_action
    dog = Straydog.create(
      description: 'description text',
      image: fixture_file_upload('assets/image.png', 'image/png')
    )
    get api_straydog_path(dog), headers: @token
    assert_response :success
    assert_equal response.parsed_body.keys.sort, [
      "id",
      "user_id",
      "image",
      "lat",
      "lngt",
      "place",
      "description",
      "created_at",
      "attachment_type",
      "dog_update_count"
    ].sort
  end

  def test_index_action
    2.times do
      Straydog.create({
        description: 'description text',
        image: fixture_file_upload('assets/image.png', 'image/png')
      })
    end

    get api_straydogs_path, headers: @token

    response.parsed_body['dogs'].each do |straydog_response|
      assert_equal straydog_response.keys.sort, [
        "id",
        "user_id",
        "image",
        "lat",
        "lngt",
        "place",
        "description",
        "created_at",
        "attachment_type",
        "dog_update_count"
      ].sort
    end
  end

  def test_index_listing_nearby_dogs
    far_dog = Straydog.create({
      description: 'far dog',
      image: fixture_file_upload('assets/image.png', 'image/png'),
      lat: '9.001854300000002',
      lngt: '66.4447285'
    })

    near_dog = Straydog.create({
      description: 'near dog',
      image: fixture_file_upload('assets/image.png', 'image/png'),
      lat: '11.001854300000002',
      lngt: '76.4447285'
    })
    get api_straydogs_path(lat: '11.001854300000002', lngt: '76.4447285')
    assert response.parsed_body['dogs'].map{|dog| dog['id']}.include?(near_dog.id)
  end

  def test_index_listing_dogs_reported_by_current_user
    dog_by_current_user = Straydog.create({
      description: 'description text',
      image: fixture_file_upload('assets/image.png', 'image/png'),
      user_id: @user.id
    })

    dog_by_other_user = Straydog.create({
      description: 'description text',
      image: fixture_file_upload('assets/image.png', 'image/png'),
      user_id: users(:two).id
    })

    get api_straydogs_path(mine: true), headers: @token
    assert_equal response.parsed_body['dogs'].map{|dog| dog['id']}, [dog_by_current_user.id]
  end

  def test_only_signed_user_can_create_dog
    assert_difference 'Straydog.count' do
      post(api_straydogs_path, params: {
        straydog: {
          lat: '1.1',
          lngt: '1.1',
          description: 'description text',
          image: fixture_file_upload('assets/image.png', 'image/png')
        }
      }, headers: @token)
    end
  end

  def test_only_user_can_update_dog
    dog_by_other_user = Straydog.create({
      description: 'description text',
      image: fixture_file_upload('assets/image.png', 'image/png'),
      user_id: users(:two).id
    })

    put api_straydog_path(dog_by_other_user), params: {
      Straydog: {
        description: 'new description'
      }
    }, headers: @token

    assert_response :unauthorized 
  end
end
