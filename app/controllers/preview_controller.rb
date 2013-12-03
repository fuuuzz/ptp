class PreviewController < ApplicationController

  layout "ajax"

  def show

    @bar = Bar.find(params[:id])

    respond_to do |format|
      format.html # preview.html.erb
      format.json { render json: @bar }
    end
  end

end