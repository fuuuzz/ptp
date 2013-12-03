class WelcomeController < ApplicationController
  def index
    @bars = Bar.all
  end

end
