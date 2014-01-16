class NotificationsMailer < ActionMailer::Base

  default :from => "app.submission@payetapinte.fr"
  default :to => "bienvenue@payetapinte.fr"

  def new_submission(submission)
    @submission = submission
    mail(:subject => "FROM APP : DEMANDE D'AJOUT ! #{message.subject}")
  end

end