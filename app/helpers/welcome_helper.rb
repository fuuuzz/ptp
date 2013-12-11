module WelcomeHelper

  def transform_price(price)

    newPrice = sprintf("%g", price).to_s.gsub('.', ',')

    return newPrice
  end
end
