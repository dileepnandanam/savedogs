class StrayDogPolicy < ApplicationPolicy
  def create?
    @user.present?
  end

  def update?
    @record.user == @user
  end

  def destroy?
    update?
  end
end