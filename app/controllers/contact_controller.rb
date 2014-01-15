class ContactController < ApplicationController
  layout "ajax"

  def new
    @submission = Submission.new
  end

  def create
    @submission = Submission.new(params[:submission])

    if @submission.valid?
      NotificationsMailer.new_submission(@submission).deliver
      redirect_to(root_path, :notice => "Merci ! Votre message à bien été envoyé !")
    else
      flash.now.alert = "Please fill all fields."
      render :new
    end
  end

end