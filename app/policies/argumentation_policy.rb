class ArgumentationPolicy < ApplicationPolicy
  include PoliciesHelper

  class Scope < Scope
    def resolve
      scope
    end
  end

  def update?
    Rails::logger.debug user.inspect
    Rails::logger.debug record.inspect
    admin? || user.id == record.user_id
  end
end
