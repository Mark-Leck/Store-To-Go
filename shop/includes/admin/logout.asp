<% 
session.abandon
Response.Cookies(session("galusername")) = "no"
Response.Cookies("adm2") = ""
Response.Cookies("adm3") = ""
response.redirect "login.asp"

 %>