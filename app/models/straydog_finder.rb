# frozen_string_literal: true

class StraydogFinder
  def initialize(lat, lngt, mine, current_user)
    @lat = lat
    @lngt = lngt
    @mine = mine
    @current_user = current_user
  end

  def find
    scope = Straydog.live.order('created_at DESC')
    scope = scope.near([@lat.to_f, @lngt.to_f], 50) if @lat.present? && @lngt.present?

    scope = scope.where(user_id: @current_user.id) if @mine.present? && @current_user.present?

    scope
  end
end
