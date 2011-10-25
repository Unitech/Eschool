require 'ideone'

class SandboxController < ApplicationController
  
  def index
    
  end

  def compile
    print @@ideone
    #unless defined?(session[:ideone1])
    #ideone = Ideone.new('tknew', '123456')
    #end
    token = @@ideone.create_submission(params[:code], 17)
    print token
    begin
      print "waiting data"
      data = @@ideone.submission_details(token)
      print data[:status]
    end while data[:status] != "0"
    print data
    # @@ideone = nil
    render :json => data
  end

end
