OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  #provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_SECRET']
  provider :facebook, '435803716520289', 'e53a9ca4610de283ff97e95ef6f16b30'
end