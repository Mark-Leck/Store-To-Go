<% 

if session ("sessvar") <> 1 then 
galusername = session("galusername")
'response.write galusername

end if
%>
<!--#include virtual="/shop/includes/cfg.asp" -->
<!--#include file="check.asp" -->

<%
Response.Expires = 0
Response.Expiresabsolute = Now() - 2
Response.AddHeader "pragma","no-cache"
Response.AddHeader "cache-control","private"
Response.CacheControl = "no-cache"
dim sec
sec = request ("sec")
fname = request ("fname")
dim deleteimg
if request("deleteimg") = "true" then

Dim fso
dim delimg
Set fso = Server.CreateObject("Scripting.FileSystemObject")
delimg = request("imgpath")
delimg = server.mappath(delimg)
fso.DeleteFile(delimg)

set fso = nothing
'dim sname
'sname = "admin.asp" + "?sec=" + request("sec") + "&user=" + request("user") + "&gal=" + request("gal")  

'response.redirect sname
end if
dim galname, galpath
galname = request("galname")

if request("subd") = "y" then

 MyFile=Split(Request.ServerVariables("PATH_INFO"),"/")
 imgalname=MyFile(UBound(MyFile)-4)
imActDir="/" & MyFile(UBound(MyFile)-3) & "/" & galname & "/"
'response.write imactdir
galname = server.mappath(imactdir)







galpath = galname
Set ren = CreateObject("Scripting.FileSystemObject")
Set renfol = ren.GetFolder(galpath)

renfol.name = request("newname")

set ren = nothing
set renfol = nothing

response.redirect "admin.asp?sec=folders"


else
 end if
 %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML><HEAD><TITLE>Admin Area</TITLE>
<meta http-equiv="Content-Type" content="text/html;charset=iso-8859-1"/>
<!--#include file="style.asp" -->
</HEAD>
<BODY style="background-color:<% =bgclr %>;background-image:url(<% =bgurl %>)" id=admbody>
 
<div id=container > 
 
 <div class=bluebox id=admincontent style="display: inline; background-color:#<% =cellclr %>">
<% 


Select Case sec
		Case "folders"
			%>
<!--#include file="folders.asp" -->
<% 
 Case "images"
			%>
<!--#include file="images.asp" -->
 <% 
		Case "config"
			%>

<form action="editcfg.asp" method="post">

<table summary="" cellpadding=2>
<tr>
<td><h2>Main Options</h2></td></tr>
<tr> 
<td>Username</td>
<td><input type=text size=30 name="l6" value="<% =uname %>" > &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>
<tr>
<td>Password</td>
<td><input type=text size=30 name="l7"  value="<% =passcookie%>" > &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>


<tr><td>&nbsp </td><td>&nbsp </td></tr>
<tr>
<td>Website Title</td>
<td><input type=text size=30 value="<% =title %>" length=100 name="l4" /> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>

<tr>
<td>Text For No Description</td>
<td><input type=text size=30 value="<% =nocom %>" length=100 name="l1" /> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>
<tr>
<td><input type="hidden" size=30 name="l2"   value="<% =descfolder %>">
</td></tr>

<tr>
<td>Use AspJpeg? </td>
<td>

<select name="l3">
<% if aspj = 1 then %>
<option value="1" selected="selected">Yes</option>
<option value="0" >No</option>
<% else %>
<option value="1" >Yes</option>
<option value="0" selected="selected">No</option>
<% end if %>
</select> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>

<tr>
<td> Number Of Columns</td>
<td><input type=text size=5 name="l5" length=100 value="<% =cols %>" > &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>  
<tr>
<td>Image width for thumbnails</td>
<td><input type=text size=5 name="l8"  value="<% =iwidth %>"  > px &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>
<tr>
<td>Restrict Main Image Width?</td>
<td><select name="l12"><% if usewidth = 1 then %>
<option value="1" selected="selected">Yes</option>
<option value="0" >No</option>
<% else %>
<option value="1" >Yes</option>
<option value="0" selected="selected">No</option>
<% end if %></select> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=700,width=350,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr><tr>
<td>Image width Main Images</td>
<td><input type=text size=5 name="l13"  value="<% =viewwidth %>"  > px &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>
<tr>
<td>Allow View Fullscreen?</td>
<td>
<select name="l14"><% if allowfs = 1 then %>
<option value="1" selected="selected">Yes</option>
<option value="0" >No</option>
<% else %>
<option value="1" >Yes</option>
<option value="0" selected="selected">No</option>
<% end if  %></select>&nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>
<tr>
<td>Protect Images?</td>
<td>
<select name="l11"><% if prot = 1 then %>
<option value="1" selected="selected">Yes</option>
<option value="0" >No</option>
<% else %>
<option value="1" >Yes</option>
<option value="0" selected="selected">No</option>
<% end if  %></select>&nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>
<td>Use Onsite Shopping Cart?</td>
<td>
<select name="l18"><% if cart = 1 then %>
<option value="1" selected="selected">Yes</option>
<option value="0" >No</option>
<% else %>
<option value="1" >Yes</option>
<option value="0" selected="selected">No</option>
<% end if  %></select>&nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>
<tr>
<td>PayPal Merchant ID or Email</td>
<td><input type=text size=30 name="l10"  placeholder="*Required" value="<% =ppmerchid %>"> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>
<tr>
<td>Domain Root URL</td>
<td><input type=text size=30 name="l9"  placeholder="EG: http://yoursite.com" value="<% =linkurl %>"> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>

<tr>
<td>&nbsp </td>
<td>&nbsp
</td></tr>
<tr>
<td><h2>Content Options</h2></td></tr>

<tr>
<td>Keyword Meta Tag</td>
<td><textarea cols=30 rows=2 name="l24"  placeholder="EG: shopping, cart, software, shop, store, windows, server, ecommerce, open, source, free, javascript, asp, php, paypal, button, generator" value="<% =metakey%>"><% =metakey%></textarea> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>


<tr>
<td>Description Meta Tag</td>
<td><textarea cols=30 rows=2 name="l25"  Placeholder="EG: Store To Go is an open source eCommerce online store for windows." value="<% =metadesc%>"><% =metadesc%></textarea> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>


<tr>
<td>Main Content Title</td>
<td><input type=text size=30 name="l29"  Placeholder="EG: Welcome To Store To Go" value="<% =titlemain%>"> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>

<tr>
<td>Main Content HTML</td>
<td><textarea cols=70 rows=5 name="l26"  placeholder="Enter your Main Content (upper) HTML code here. EG: <p>These give you a Paragraph</p> <strong>These give you bold text</strong> <i>These give you italic text</i> </br>That gives you a line break."value="<% =maincon%>"><% =maincon%></textarea> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>
<tr>

<td>Main Content Title 2</td>
<td><input type=text size=30 name="l30"  placeholder="EG: Special Offers" value="<% =titlemain2%>"> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>

<tr>
<td>Main Content 2 HTML</td>
<td><textarea cols=70 rows=5 name="l31"  placeholder="Enter your Main Content 2 (lower) HTML code here. EG: <p>These give you a Paragraph</p> <strong>These give you bold text</strong> <i>These give you italic text</i> </br>That gives you a line break."value="<% =maincon2%>"><% =maincon2%></textarea> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>
<tr>
<td>Side Content Title</td>
<td><input type=text size=30 name="l28"  placeholder="EG: About Us" value="<% =titleside%>"> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>

<tr>
<td>Side Content HTML</td>
<td><textarea cols=70 rows=5 name="l27" placeholder="Enter your side content HTML code here. EG: <p>These give you a Paragraph</p> <strong>These give you bold text</strong> <i>These give you italic text</i> </br>That gives you a line break." value="<% =sidecon%>"><% =sidecon%></textarea> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>

<tr>
<td>Footer TEXT</td>
<td><input type=text size=70 name="l32" placeholder="EG: Copyright (c) 2014 Store To Go. All rights reserved." value="<% =footer%>"> &nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>
<tr>
<td>&nbsp </td>
<td>&nbsp
</td></tr>
<tr>
<td><h2>Style Options</h2></td></tr>
<% 
if (cellclr <>"F9F9FF") or (bgurl<>"") or (navurl<>"") or (banurl<>"data:image/jpeg;base64,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") or (conurl<>"") or (bgclr<>"C0D6E2") or (hdrclr<>"5A85AD") then %>
<td><strong><font color="red">Restore Default Style Settings?</font></strong></td>
<td>
<select name="l23">
<option value="1" style="color:red">YES</option>
<option value="0" selected="selected" style="color:green">NO</option>
</select>&nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>
<%  
end if %>
<tr>
<td>Main Background Colour</td>
<td><br><input type=text size=35 name="l17"  length=100 value="<% =bgclr %>" class="color">&nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>

<tr>
<td>Main Background Image URL</td>
<td><br><input type=text size=35 name="l19"  length=100 placeholder="EG: /images/bg.jpg" value="<% =bgurl %>" >&nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>

<tr>
<td>Navbar Background Colour</td>
<td><br><input type=text size=35 name="l15"  length=100  value="<% =hdrclr %>" class="color" >&nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>


<tr>
<td>Navbar Background Image URL</td>
<td><br><input type=text size=35 name="l20"  length=100 placeholder="EG: /images/navbg.jpg" value="<% =navurl %>" >&nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>

<tr>
<td>Content Background Colour</td>
<td><br><input type=text size=35 name="l16"  length=100 value="<% =cellclr %>" class="color" >&nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>

<tr>
<td>Contact Form Background Image URL</td>
<td><br><input type=text size=35 name="l22"  length=100 placeholder="EG: /images/formbg.jpg" value="<% =conurl %>" >&nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>

<tr>
<td>Banner Image URL</td>
<td><br><input type=text size=35 name="l21"  length=100 placeholder="EG: /images/banner.jpg" value="<% =banurl %>" >&nbsp <a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><img src="<%=help%>" alt=""></a>
</td></tr>

<td> <input type="submit" class="btn btn-primary" value="Make Changes"/></td>
<td><a href="#" onclick=window.open("cfghelp.asp","Smilies","height=400,width=400,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no")><u><strong><font color="blue">Help with Options</font></strong></u></a>
</td></tr>

</table>

<input type="hidden" name="submit" value="y"  />

</form>
 
  <% 
		Case "upload"
			%>

<font size="1" align="left" color="grey"><b>Uploader v1.00</b></font><br><br>
<center>
 <form name="frmSend" method="POST" enctype="multipart/form-data" accept-charset="utf-8" action="uploaded.asp?location=<% =fname %>" onSubmit="return onSubmitForm();">
	<B>Image File names:</B><br>
    File 1: <input name="attach1" type="file" size=35><br>
    File 2: <input name="attach2" type="file" size=35><br>
    File 3: <input name="attach3" type="file" size=35><br>
    File 4: <input name="attach4" type="file" size=35><br>
    <br> 
    <input style="margin-top:4" type=submit value="Upload" class="btn btn-primary" >
    </form>
<tr><td align=center>	

</td></tr>
</TABLE>
</center>  <% 
		Case "rengal"
			%>
 <FORM METHOD="POST" ACTION="admin.asp">
 <h4><TABLE BORDER=0  align=center>
 <tr><td>&nbsp </td><td>&nbsp </td></tr>
 
		<tr><td >Current Name: &nbsp &nbsp </td> <td ><b> <% =request("galname") %></b></td></tr>
	 <tr><td>&nbsp </td><td>&nbsp </td></tr>
	<tr><td >	New Name &nbsp &nbsp </td><td ><INPUT TYPE=Text SIZE=20 NAME="newname"></td></tr>


 <tr><td>&nbsp </td><td>&nbsp </td></tr>
	<tr><td align="center" colspan=2><INPUT TYPE=SUBMIT VALUE="Change" class="btn btn-primary" >
<input type="hidden" name="subd" value="y">
<input type="hidden" name="galname" value="<% =galname %>"></td></tr>
	 <tr><td>&nbsp </td><td>&nbsp </td></tr></TABLE></h4>
</FORM>
<% 
		case "saved" 
%>
 <table summary="" align=center width="90%" cellspacing=10 class=foldertable cellpadding=5>
<tr align=center><td><h2>Configuration File Updated Successfully!</h2></td></tr>
<tr align=center><td><br><br><button type="submit" class="btn btn-primary" onclick="window.location.href='?sec=config';">BACK</button></td></tr>
</table>

<%
		Case Else
%>
 <table summary="" align=center width="90%" cellspacing=10 class=foldertable cellpadding=5>
<tr align=center><td><img src="<%=banurl%>" width="75%" height="10%" alt=""/></td></tr>
<tr align=center><td><h2>Welcome to the Admin area</h2></td></tr>
</table>
 
 
<%				
	End Select
%>
</div>
 <div class=bluebox id=adminnav style="display: inline; background-color:#<% =cellclr %>">
<center>
<div style="position: relative; top: 120px;">
<h2>Store Management</h2>
<h3>
<br>
<a href="/shop/includes/admin/admin.asp?sec=folders">Product Categories</a><br>
<hr width=50% color=<% =hdrclr %>>
<a href="/shop/includes/admin/admin.asp?sec=images">Product Images</a><br>
<hr width=50% color=<% =hdrclr %>>
<a href="admin.asp?sec=config">Configuration</a><br>
<hr width=50% color=<% =hdrclr %>>
<a href="admin.asp">Main</a>
<hr width=50% color=<% =hdrclr %>>
<a href="/shop">Shop Home</a>
<hr width=50% color=<% =hdrclr %>>
<a href="/">Homepage</a>
<hr width=50% color=<% =hdrclr %>>
<a href="/shop/includes/admin/logout.asp">Logout</a>

</center></h3>

</div>
</div>


</div>
</body></html>

<script type="text/javascript" src="../jscolor/jscolor.js"></script>
