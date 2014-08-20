define (require) ->

  $ = require 'jquery'
  window.$ = $

  window.CC = {}


  $("form").find("input").blur ->
    if $(@).val() != ""
      $(@).removeClass "error"
      $(@).addClass "succ"
    else
      $(@).removeClass "succ"
      $(@).addClass "error"

  $("form").find("input").focus ->
      $(@).removeClass "error"
      $(@).removeClass "succ"

  $("form").submit (e)->

    notice = (obj) ->
      e.preventDefault()
      obj.addClass "error"

    pass = (obj) ->
      obj.removeClass "error"
      obj.addClass "succ"

    $name = $("#name")
    $password = $("#password")
    
    if $.trim($name.val()) == ""
      notice $name
    else
      pass $name

    if $.trim($password.val()) == ""
      notice $password
    else
      pass $password

