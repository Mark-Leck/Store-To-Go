<!--#include virtual="/shop/includes/cfg.asp" -->

<% 

session("galusername") = "single"
if session(session("galusername") & "auth") = 1 then
'response.redirect "admin.asp" 
end if 
dim msg
msg = request("msg")

adm1 = Request.Cookies(session("galusername"))
if adm1 = "yes" then 
'response.redirect "admin.asp"
end if 



 %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML><HEAD><TITLE><% =title %></TITLE>
<!--#include file="style.asp" -->
</HEAD>
<BODY style="background-color:#<%=bgclr%>;background-image:url(<% =bgurl %>)">

 <br><br><br>

 <table summary="" align=center width=350 cellpadding=10>


<tr> <td align=center>

<form action="admin.asp" method="post">
<table summary="" align=center cellpadding=5  class=bluebox style="background-color:#<%=cellclr%>">

<tr><td><img src="<%=banurl%>" width="478" height="80" alt=""/></td></tr>

</table> </td></tr>
<tr> <td align=center>&nbsp </td></tr>
<tr> <td align=center>&nbsp </td></tr>
<tr><td align=center>
<table border="0" cellpadding="0" cellspacing="0" summary="" class=bluebox style="background-color:#<%=cellclr%>">
<tr><td><b>Login:</b></td><td></td></tr>
<tr><td><b>Username:</b></td><td><input type="text" name="username" value="" /></td></tr>
<tr><td><b>Password:</b></td><td><input type="password" name="password"/></td></tr>
<tr><td align=center><input type="hidden" name="remember" value="on"/><button type="submit">Login</button></td><td align=center><button type="reset">Reset</button></td></tr>

</form>


</table>



</td></tr>

</table>
<br><br><br>
<div id="footer">
	<p><%=footer%> <br>Designed Using <a href='http://storetogo.net'><u>Store To Go</u></a> (c) 2014 Mark Leck</p>

</div>
</body></html>

