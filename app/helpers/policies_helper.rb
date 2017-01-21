module PoliciesHelper
  def admin?
    user.roles.any?{|a| a.role == "Admin"}
  end

end