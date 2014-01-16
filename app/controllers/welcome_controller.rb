class WelcomeController < ApplicationController
  def index
    @bars = Bar.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @bars }
    end
  end
end
