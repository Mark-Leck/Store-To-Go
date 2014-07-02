<% 
dim username, password, auth, remember, adm1

username = request("username")
password = request("password")
remember = request("remember")
if session("username") = "" then
session("username") = username
end if
If remember = "on" Then
Response.Cookies(session("galusername")) = "yes"
Response.Cookies(session("galusername")).Expires =  now + 365
Response.Cookies("adm2") = username
Response.Cookies("adm2").Expires =  now + 365
Response.Cookies("adm3") = password
Response.Cookies("adm3").Expires =  now + 365
end if

adm1 = Request.Cookies(session("galusername"))
if adm1 = "yes" then 
username = Request.Cookies("adm2")
password = Request.Cookies("adm3")
end if 

if session (session("galusername") + "auth") <> 1 then
if username <> uname then
Response.Cookies(session("galusername")) = "no"
Response.Cookies(session("galusername")).Expires =  now + 365

response.redirect "/shop/includes/admin/login.asp"
response.end
end if
if password <> passcookie then
Response.Cookies(session("galusername")) = "no"
Response.Cookies(session("galusername")).Expires =  now + 365

response.redirect "/shop/includes/admin/login.asp"
response.end

end if
session (session("galusername") + "auth") = 1
end if 

 %>

