require 'sinatra'

set :public, File.dirname(__FILE__) + '/static'

get '/' do
  haml :index
end

run Sinatra::Application
