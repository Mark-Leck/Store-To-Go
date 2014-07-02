<!--#include virtual="/shop/includes/cfg.asp" -->
<!--#include virtual="/shop/includes/imgprop.asp" -->

<%


dim aj, bigurl, smallurl, fact, sfact, bfact,orig
orig = request("orig") 
fact = request("fact")

if orig = "" or orig = "1" then
orig = 1
else
orig = 0
end if


if fact > 4 then
bfact = "4"
sfact = "3"
else
if fact < 0.25 then
bfact = "0.5"
sfact = "0.25"
else 
bfact = fact * 1.33
sfact = fact * 0.66
end if
end if

aj = request ("aj")


Dim path
dim notxt, imno
imno = request("imno")








path = imgs(imno)




smallurl = "view.asp?path=" & path & "&aj=" & aj & "&fact=" & sfact & "&textloc=" & request("textloc") & "&strpath=" & request("strpath") & "&imno=" & request("imno") & "&orig=0"
bigurl = "view.asp?path=" & path & "&aj=" & aj & "&fact=" & bfact & "&textloc=" & request("textloc") & "&strpath=" & request("strpath") & "&imno=" & request("imno") & "&orig=0"



		Select Case aj
		Case 1 
Path = Server.URLEncode(Path)
	Case Else  
			End Select
	

%>
<html>
<head>

<% if prot = "1"  then %>
<SCRIPT LANGUAGE="JavaScript">

<!-- This script and many more are available free online at -->
<!-- The JavaScript Source!! http://javascript.internet.com -->

<!-- Begin
function protect(e) {
alert("Sorry, right-clicking is disabled. \nCopyright (c) 2014 www.handmadeforme.co.uk.");
return false;
}

function trap() {
if(document.images)
for(i=0;i<document.images.length;i++)
document.oncontextmenu = protect;
}
// End -->
</SCRIPT>
<meta http-equiv="imagetoolbar" content="no">
<% else
end if  %>

<title>View image </title>

<LINK REL=stylesheet HREF="/shop/includes/gal.css" TYPE="text/css" Title=style2>

</head>
<% if prot = "1"  then %>

<BODY style="background-color:<% =bgclr %>;background-image:url(<% =bgurl %>)" onload=trap()>

<% else %>
<BODY style="background-color:<% =bgclr %>;background-image:url(<% =bgurl %>)">
 >
<% end if %><br><br><br>

<table border=0 align=center><tr><td colspan=3 align=center>
<% 
		Select Case aj
		Case 1 %>
<img src="/shop/includes/full.asp?Path=<% =Path %>&fact=<% =fact%>&strpath=<% response.write request("strpath")
if orig = 0 then
response.write "&orig=0"
end if 
%>" alt="<% =strimagetype %>">

<%
	Case Else  
%>
<img src="<% =path %>" <%

if usewidth = 1 then
if w > int(viewwidth) then 


response.write "width=" & viewwidth
end if
end if

if c > 16000000 then
c = "16M"
end if
 %> alt="<% =strtype %>, <% =w %>x<% =h %>, <% =c %> colours ">
<%
			End Select
			
			
		

%>

<% 

dim textloc : textloc = request("textloc")
textloc = textloc & imgs(imno) & ".txt"
dim strpath
strpath = request("strpath")

textloc = strpath & textloc 
textloc = server.mappath(textloc)
Dim objFSO    'FileSystemObject variable
Set objFSO = Server.CreateObject("Scripting.FileSystemObject")
	Set objTextStream3 = objFSO.OpenTextFile(textloc , 1)
	comments = objTextStream3.ReadAll %>
	</td></tr><%
		Select Case aj
		Case 1 %>
<td colspan=5 align=center><%



	response.write comments

%></tr></td><tr>

<td align=center><a href="<% =smallurl %>">Smaller</a></td>
<td align=center><a href="./">Back</a></td>
<td align=center><a href="<% =bigurl %>">Bigger</a> </td></tr>
<tr><td colspan=3>
<table align=center border=0>
<tr>
<td align=center width=50%><a href="view.asp?aj=1&fact=1&textloc=<% =request("textloc") %>&strpath=<% =request("strpath") %>&imno=<% 
if imno = 0 then
response.write num-1
else
response.write imno - 1
end if %>">Previous</a></td>

<td align=center width=50%><a href="view.asp?aj=1&fact=1&textloc=<% =request("textloc") %>&strpath=<% =request("strpath") %>&imno=<%
if imno + 1 = num   then 
response.write 0
else 
response.write imno + 1
end if %>">Next</a></td>



</tr>
</table>
<%
	Case Else  
%>
<tr><td colspan=3 align=center><br><%



	response.write comments

%><br><br></td></tr><tr>
<td align=center width=33%><a href="view.asp?aj=0&fact=1&textloc=<% =request("textloc") %>&strpath=<% =request("strpath") %>&imno=<% 
if imno = 0 then
response.write num-1
else
response.write imno - 1
end if %>">Previous</a></td>
<td align=center><a href="./">Back</a></td>
<td align=center width=33%><a href="view.asp?aj=0&fact=1&textloc=<% =request("textloc") %>&strpath=<% =request("strpath") %>&imno=<%
if imno + 1 = num   then 
response.write 0
else 
response.write imno + 1
end if %>">Next</a></td>
</tr>
<% 
			End Select
			Set objTextStream3 = nothing
%>

<tr><td align=center colspan=3><br>
<% if allowfs = 1 then %><a href="#" onclick=window.open(<%
response.write """"
response.write imgs(imno)
response.write """"

%>,"Smilies",<%
  Response.Write( """height=" )
	response.write h + 30
  Response.Write( ",width=" )
  Response.Write w + 25
  Response.Write( ",location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no""" )
%>)><img src="data:image/gif;base64,R0lGODlhPQANAPcAAPj3+OLh4t3c3ZmYmf7+//Ly8+fn6OHh4tzc3cvLzLi4uR8gIF5fX/f4+PHy8uzt7eLj4+Hi4r2+vrGysq2urjAxMPf49/Lz8uLj4uHi4dzd3NLT0s3OzbGysaWmpZGSkYGCgSAgH/j49/Pz8uLi4d3d3Pj39+7t7ejn5+Tj4+Pi4uLh4d3c3NnY2Jybm/////39/fz8/Pv7+/n5+fj4+PPz8/Ly8u3t7evr6+jo6Ofn5+bm5uTk5OPj4+Li4uHh4d3d3dzc3NjY2NfX19TU1NLS0szMzMvLy8jIyMfHx8bGxsXFxcPDw8LCwr+/v7u7u7q6urm5ube3t7a2trW1tbS0tLGxsbCwsK6urq2trampqaWlpaCgoJqampaWlpOTk5GRkZCQkI2NjYqKioiIiIeHh4aGhoSEhICAgH5+fnt7e3h4eHR0dHJycm9vb2xsbGtra2lpaWdnZ2ZmZmVlZWNjY2FhYVxcXFNTU01NTUpKSklJSUJCQkFBQT8/Pz4+Pjw8PDs7Oy0tLSAgIB4eHhAQEP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIYALAAAAAA9AA0AAAj/AA0doUKwoMGDCBMqXKjwiKGHDwe+mEixIkUqFjNq3MixIhWHEDFSXALmDZglGUV2XMnSI0RDKpdwITKDCBeUHicCIcOTDJCMT3625EjlJZUYSMMUiTEnRpEwSKMejRGFTpSrOKJGNRNFq9evYF8UDUkDAIA3NuaodfCGhggRFkxQaSBiyhkaePHWqcNHCY0zU2jo4HtXCRs+QwbjYaMEwBY+dXQAMEFg7EMqIwoUEJNgxJwCRsRotlGjAJULNToM6sP6woVCG5r0uQCiA+0mF+x06DCb9gcMFSZAsKOiiR3SMCzDfHDjBpQBSXIkQZOluXUqzSmkecCdux/vD9JQ4ngggYGfBRS0gw+PBUsIP37cNJehnIqO+yimjIEzxgWbIjqgcJ99Bmihxn0I/nGfgmpooUMeSDyohYH33RGFhEjkgYIQXRigAw31rZBBBBn8ICKJUrTBgQ8krEDFCitsQQggNJbxAyA/3PjDGlv8UIYgNHqxxRo5MiHIkR5EEAeQVfgQgGlGBaGBACwEISWVQVihgAYIaEAFCwhYKeaYZJY5phxXBLGHE0CwwEIJCLCgwQnKDSTEnXjm2cKdVADh55+ABiqooFboEcgXB/jQQwo87DAgSBANxNCklFaKEKQPBQQAOw==" alt="Fullscreen" title="Enlarge Fullscreen" width="61"></a>
<% end if %><br><b><% =imno + 1 %> of <% =num %></b> 
</table>
<div id="footer">
	<p><%=footer%> <br>Designed Using <a href='http://storetogo.net'><u>Store To Go</u></a> (c) 2014 Mark Leck</p>
</div>


<% if cart = "1"  then %>
<script type="text/javascript" charset="UTF-8" src="/shop/includes/paypal_files/minicart.js"></script>
<script>
    paypal.minicart.render();
</script>
<% end if %>
</body>
</html>
