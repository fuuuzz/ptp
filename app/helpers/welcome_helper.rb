module WelcomeHelper

  def transform_price(price, decimal)
    parts = price.to_s.split('.')

    if decimal
      if parts[1].to_i < 10
        newPrice = "#{parts[0]}<span>,#{parts[1]}0</span>".html_safe
      elsif parts[1].to_i > 10
        newPrice = "#{parts[0]}<span>,#{parts[1]}</span>".html_safe
      end
    else
      if parts[1].to_i == 0
        newPrice = "#{parts[0]}"
      elsif parts[1].to_i < 10
        newPrice = "#{parts[0]}<span>,#{parts[1]}0</span>".html_safe
      elsif parts[1].to_i > 10
        newPrice = "#{parts[0]}<span>,#{parts[1]}</span>".html_safe
      end
    end

    return newPrice
  end
end
