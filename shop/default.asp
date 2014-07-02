
<%' Now to the Runtime code:
Dim strPath   'Path of directory to show
Dim objFSO    'FileSystemObject variable
Dim objFolder 'Folder variable
Dim objItem   'Variable used to loop through the contents of the folder
dim tmp
' You could just as easily read this from some sort of input, but I don't
' need you guys and gals roaming around our server so I've hard coded it to
' a directory I set up to illustrate the sample.
' NOTE: As currently implemented, this needs to end with the /



%>
<!--#include virtual="/shop/includes/cfg.asp" -->


<%

dim ActDir,MyFile
 MyFile=Split(Request.ServerVariables("PATH_INFO"),"/")
 galname=MyFile(UBound(MyFile)-1)
ActDir= "/" & galname & "/"



strPath = ActDir

' Create our FSO
Set objFSO = Server.CreateObject("Scripting.FileSystemObject")

' Get a handle on our folder
Set objFolder = objFSO.GetFolder(Server.MapPath(strPath))

' Show a little description line and the title row of our table



%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML><HEAD>
<meta name="keywords" content="<%=metakey%>" />
<meta name="description" content="<%=metadesc%>" />
<link href='http://fonts.googleapis.com/css?family=Oswald:400,300' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Abel' rel='stylesheet' type='text/css'>
<LINK REL=stylesheet HREF="/shop/includes/gal.css" TYPE="text/css" Title=style2>
<TITLE><% =title %> Online Shop</TITLE>

</HEAD>


<BODY style="background-color:<% =bgclr %>;background-image:url(<% =bgurl %>)">
<div id="wrapper">

	<div id="header-wrapper" class="container">
		<div id="header" class="container" style="background-color:<% =hdrclr %>;background-image: url(<% =navurl %>)" >
			<div id="logo">
				<h1><a href="#" >ONLINE STORE</a></h1>
			</div>
			<div id="menu">
				<ul>                                <li><a href="/contact" >Contact us</a></li>

					<li><a href="/" >Homepage</a></li>
<% if cart = "1"  then %>
                                   					<li><a  href="javascript:;paypal.minicart.view.show();" title="View Cart"><img src="<%=viewcart%>" width="96" Height="20" style="margin-top:40px" /></a></li>

<% end if %>
				</ul>
			</div>
		</div>
				<div><img src="<%=shadow%>" width="100%" height="40" alt="" /></div>
	</div>	

<TABLE BORDER="0" CELLSPACING="0" CELLPADDING="10" width=1000 align=center class=bluebox style="background-color: <% =cellclr %>">
	
	<%

' First I deal with any subdirectories.  I just display them and when you
' click you go to them via plain HTTP.  You might want to loop them back
' through this file once you've set it up to take a path as input.  It seems
' like the logical thing to do to me at least!
For Each objItem In objFolder.SubFolders
	' Deal with the stupid VTI's that keep giving our visitors 404's
	If InStr(1, objItem, " ", 1) Then
tmp = replace(objitem.name , " " , "_")
if objitem.name <> tmp then
objitem.name = tmp

end if
end if
	If InStr(1, objItem, "_hidden_", 1) = 0 and InStr(1, objItem, "includes", 1) = 0  and InStr(1, objItem, "_vti", 1) = 0 Then



	%>
	<TR BGCOLOR=<% =cellclr %>>
		<TD ALIGN="center" colspan=2><span class=galtitle><A HREF="<%= strPath & objItem.Name %>"><%= replace(objItem.Name, "_", " ") %></A></span>
</TD>
		
	</TR>
	<%
	End If
Next 'objItem

		

' All done!  Kill off our object variables.
Set objItem = Nothing
Set objFolder = Nothing
Set objFSO = Nothing

%>


</TABLE>

		<center>				<div><img src="<%=shadow%>" width="980" height="40" alt="" /></div>
<!-- PayPal Logo --><table border="0" cellpadding="0" cellspacing="0" align="center"><tr><td align="center"></td></tr><tr><td align="center"><a href="https://www.paypal.com/uk/webapps/mpp/paypal-popup" title="How PayPal Works" onclick="javascript:window.open('https://www.paypal.com/uk/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;"><img src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_SbyPP_mc_vs_ms_ae_UK.png" border="0" alt=""></a></td></tr></table><!-- PayPal Logo --></center>
<div id="footer">
	<p><%=footer%> <br>Designed Using <a href='http://storetogo.net'><u>Store To Go</u></a> (c) 2014 Mark Leck</p>
</div>
</div>
<% if cart = "1"  then %>
<script type="text/javascript" charset="UTF-8" src="/shop/includes/paypal_files/minicart.js"></script>
<script>
    paypal.minicart.render();
</script>
<% end if %>
</body></html>

