# frozen_string_literal: true

require 'test_helper'

class StraydogTest < ActiveSupport::TestCase
  include ActionDispatch::TestProcess::FixtureFile
  def setup
    @user = users(:one)
  end

  def test_valid_straydog
    valid_straydog = Straydog.new({
                                    description: 'description text',
                                    image: fixture_file_upload('assets/image.png', 'image/png')
                                  })

    assert valid_straydog.valid?
  end

  def test_invalid_straydog_with_no_image
    invalid_straydog = Straydog.new({
                                      description: 'description text'
                                    })
    assert_not invalid_straydog.valid?
  end

  def test_invalid_straydog_with_no_description
    invalid_straydog = Straydog.new({
                                      image: fixture_file_upload('assets/image.png', 'image/png')
                                    })
    assert_not invalid_straydog.valid?
  end
end
