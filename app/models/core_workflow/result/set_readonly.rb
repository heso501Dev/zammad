# Copyright (C) 2012-2024 Zammad Foundation, https://zammad-foundation.org/

class CoreWorkflow::Result::SetReadonly < CoreWorkflow::Result::Backend
  def run
    @result_object.result[:readonly][field] = true
    true
  end
end
