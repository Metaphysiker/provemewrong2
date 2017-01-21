FactoryGirl.define do
  factory :role do
    
  end
  factory :user_role do
    
  end
  factory :user do
    email 'test@example.com'
    password 'f4k3p455w0rd'

    # if needed
    # is_active true
  end
end