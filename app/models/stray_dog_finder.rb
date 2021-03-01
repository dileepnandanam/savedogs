class StrayDogFinder
  def initialize(lat, lngt, mine, current_user)
    @lat = lat
    @lngt = lngt
    @mine = mine
    @current_user = current_user
  end

  def find
    scope = StrayDog.live.order('created_at DESC')
    if @lat.present? && @lngt.present?
      scope = scope.near([@lat.to_f, @lngt.to_f], 50)
    end

    if @mine.present? && @current_user.present?
      scope = scope.where(user_id: @current_user.id)
    end

    scope
  end
end