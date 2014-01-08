module PreviewHelper
  def show_excerpt(name)
    sanitize(truncate(name), :length => 30)
    return name
  end
end