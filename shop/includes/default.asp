
<% 
dim ActDir,MyFile,dir2
 MyFile=Split(Request.ServerVariables("PATH_INFO"),"/")
 galname=MyFile(UBound(MyFile)-1)
 dir2=myfile(UBound(MyFile)-2)
ActDir="/" + dir2 + "/" + galname + "/"

dim perm
perm = 0
if session(session("galusername") + "auth") = 1  then
perm = 1
end if 
%>


<!--#include virtual="/shop/includes/cfg.asp" -->
<%

cols2  = 3 * cols

Dim strPath   
Dim objFSO    
Dim objFolder 
Dim objItem   





strPath = actdir  

' Create our FSO
Set objFSO = Server.CreateObject("Scripting.FileSystemObject")

' Get a handle on our folder
Set objFolder = objFSO.GetFolder(server.mappath(strpath))



%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML><HEAD>
 <meta charset="ISO-8859-1">
<meta name="keywords" content="<%=metakey%>" />
<meta name="description" content="<%=metadesc%>" />
<link href='http://fonts.googleapis.com/css?family=Oswald:400,300' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Abel' rel='stylesheet' type='text/css'>
<LINK REL=stylesheet HREF="/shop/includes/gal.css" TYPE="text/css" Title=style2>
<% if prot = "1"  then %>
<SCRIPT LANGUAGE="JavaScript">

<!-- This script and many more are available free online at -->
<!-- The JavaScript Source!! http://javascript.internet.com -->

<!-- Begin
function protect(e) {
alert("Sorry, right-clicking is disabled. \nCopyright (c) 2014 <%=title%>.");
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

<TITLE><% =title %>&nbsp;<% =galname %></TITLE>
</HEAD>


<% if prot = "1"  then %>

<BODY style="background-color:<% =bgclr %>;background-image:url(<% =bgurl %>)" onload=trap()>

<% else %>
<BODY style="background-color:<% =bgclr %>;background-image:url(<% =bgurl %>)">
<% end if %>
<div id="wrapper">
<div id="header-wrapper" class="container">
		<div id="header" class="container" style="background-color:#<%=hdrclr%>;background-image: url(<% =navurl %>)" >
			<div id="logo3">
				<h1><a href="#"><% = replace(galname, "_", " ")%></a></h1>
			</div>
			<div id="menu2">
				<ul>
					<li><a href="/shop/" >Store Home</a></li>
<% if cart = "1"  then %>
                   					<li><a  href="javascript:;paypal.minicart.view.show();" title="View Cart"><img src="<%=viewcart%>" width="96" Height="20" style="margin-top:40px" /></a></li>

<% end if %>


					
				</ul>
			</div>
		</div>
		<div><img src="<%=shadow%>" width="100%" height="40" alt="" /></div>
	</div>
<TABLE BORDER="0"  CELLSPACING="0" CELLPADDING="10" width=1000 align=center class=bluebox style="background-color: <% =cellclr %>">


<%
Const fsoForAppend = 2

'EVALUATE THE CONTENTS OF THE FOLDER AND WRITE EVAL.ASP
dim ev, evalloc,evcount
evalloc = server.mappath("eval.asp")
Set ev = objFSO.OpenTextFile(evalloc, fsoForAppend, true)

ev.WriteLine ("<" + chr(37))

dim i,imno
i=0
imno=0

'CLEAR UP NASTY FILENAMES (, and & and %20)
dim tmp
For Each objItem In objFolder.files
If InStr(1, objItem, ",", 1) Then
tmp = replace(objitem.name , "," , "_")
response.write objitem.name
response.write " renamed to "
response.write tmp
response.write "<br>"
objitem.name = tmp
end if
If InStr(1, objItem, "&", 1) Then
tmp = replace(objitem.name , "&" , "_")
response.write objitem.name
response.write " renamed to "
response.write tmp
response.write "<br>"
objitem.name = tmp
end if
If InStr(1, objItem, "%20", 1) Then
tmp = replace(objitem.name , "%20" , " ")
response.write objitem.name
response.write " renamed to "
response.write tmp
response.write "<br>"
objitem.name = tmp
end if

Next 'objItem



dim pri
For Each objItem In objFolder.files

tname=objitem.name
		tname = LCase(Right(tname, Len(tname) - InStrRev(tname, ".", -1, 1)))
	




	
if tname = "gif" or tname = "jpg" or tname = "jpeg" or tname = "png" then
cnt = cnt + 1

end if 
Next 'objItem



ev.writeline ("dim imgs()")
ev.writeline ("redim imgs(" & cnt & ")")
ev.writeline ("dim num")
ev.writeline ("num = " & cnt)
i=0
For Each objItem In objFolder.files
if InStr(1, objItem.name, "(-pr1-)", 1) = 1 then
pri = 1
dim tname2
tname2=objitem.name
		tname2 = LCase(Right(tname2, Len(tname2) - InStrRev(tname2, ".", -1, 1)))
	




	
if tname2 = "gif" or tname2 = "jpg" or tname2 = "jpeg" or tname2 = "png" then

ev.WriteLine "imgs(" & i &  ")= " + """" + objitem.name + """" 



	

i=i + 1
dim cnt 
cnt = i

			
end if
end if
Next 'objItem


For Each objItem In objFolder.files
if InStr(1, objItem.name, "(-pr2-)", 1) = 1 then
pri = 2
tname2=objitem.name
		tname2 = LCase(Right(tname2, Len(tname2) - InStrRev(tname2, ".", -1, 1)))
	




	
if tname2 = "gif" or tname2 = "jpg" or tname2 = "jpeg" or tname2 = "png" then

ev.WriteLine "imgs(" & i &  ")= " + """" + objitem.name + """"



	

i=i + 1

cnt = i

			
end if
end if
Next 'objItem

For Each objItem In objFolder.files
if InStr(objItem.name, "(-pr3-)") = 1 then
pri = 3
tname2=objitem.name
		tname2 = LCase(Right(tname2, Len(tname2) - InStrRev(tname2, ".", -1, 1)))
	




	
if tname2 = "gif" or tname2 = "jpg" or tname2 = "jpeg" or tname2 = "png" then

ev.WriteLine "imgs(" & i &  ")= " + """" + objitem.name + """"



	

i=i + 1

cnt = i

			
end if
end if
Next 'objItem

For Each objItem In objFolder.files
if InStr(objItem.name, "(-pr") = 0 then
pri = 0
tname2=objitem.name
		tname2 = LCase(Right(tname2, Len(tname2) - InStrRev(tname2, ".", -1, 1)))
	




	
if tname2 = "gif" or tname2 = "jpg" or tname2 = "jpeg" or tname2 = "png" then

ev.WriteLine "imgs(" & i &  ")= " + """" + objitem.name + """"



	

i=i + 1

cnt = i

			
end if
end if
Next 'objItem


	
	ev.WriteLine (chr(37) + ">")

ev.close
dim rowcount
dim rc
dim re

dim cwidth


cwidth = 100 / int(cols)
rowcount = 0


For Each objItem In objFolder.Files


rc = rowcount MOD cols










Dim strTemp

	
	strTemp = objItem.Name
' Ignore Directories	
	If strTemp <> "dir" Then
		strTemp = LCase(Right(strTemp, Len(strTemp) - InStrRev(strTemp, ".", -1, 1)))
	

 	End If

	Select Case strTemp
		Case "gif" , "jpg" , "png", "jpeg"
			
		Case Else
			strTemp = "misc"
	End Select




'Deal With Images
If strTemp <> "misc"  Then

if rc = 0 then
%>
	<TR BGCOLOR='#<%=cellclr%>' align = center><td>&nbsp </td>

<%
end if 

' Define Various Paths
Dim filepath 
Dim fullpath
filepath =  strPath & objItem.Name 
fullpath =  Server.MapPath(strpath) & "\" & objItem.Name
Path =  Server.URLEncode(objFolder & "\" & objItem.Name)
dim dot : dot = "."
dim arrSplit : arrSplit = split(objItem.Name, dot)
dim splitname : splitname = arrSplit(0)
dim iname : iname = objitem.name
dim textloc : textloc = objfolder + "\" + descfolder + "\" + iname + ".txt"
dim sendtxtloc
sendtxtloc =  descfolder + "/"


%>



		<TD width=<% =cwidth %>> 
		<table align=center>

 <tr><td width=100% align=center>
		<%
		Select Case aspj
		Case 1 
			
		%>

		<A HREF="view.asp?path=<% =objitem.name  %>&aj=1&fact=1.0&textloc=<% =sendtxtloc %>&strpath=<% =strpath %>&imno=<% =imno%>"><IMG SRC="/shop/includes/admin/sendbinary.asp?path=<% =Path  %>&width=<% =iwidth %>"></A>
		
		<%Case Else	%>  
			
			<a href="view.asp?&aj=0&textloc=<% =sendtxtloc %>&strpath=<% =strpath %>&imno=<% =imno%>">
	<img src="<% =objItem.Name%>" width=<% =iwidth %>></a>
	
			
			
			<%
			
	End Select
imno = imno + 1
				
		%>
</td></tr><tr><td width = <% 
dim twidth
twidth = iwidth + 100
response.write twidth%>>


<%
'Find the filename without the extension
'Define the descriptions folder


dim enctextloc : enctextloc = Server.URLencode(textloc)


If (objFSO.FileExists(textloc)) Then

 		if (objfso.getfile(textloc).size = 0) then
	  Set objedit = objFSO.OpenTextFile(textloc, 8)
		objedit.WriteBlankLines(1)
		objedit.Close
		end if


	Dim objTextStream
		Set objTextStream = objFSO.OpenTextFile(textloc , 1)
		dim line1
		line1 = objTextStream.Readline
	
		dim comments
		
		If line1 = "" Then
		if (objfso.getfile(textloc).size > 2) then
		
		Dim objTextStream3
		Set objTextStream3 = objFSO.OpenTextFile(textloc , 1)
		comments = objTextStream3.ReadAll
		response.write comments
		
		objTextStream3.Close
		Set objTextStream3 = Nothing
		
		
		else
		Response.Write nocom
		objTextStream.Close
		end if
		Set objTextStream = Nothing
		Else
		Dim objTextStream2
		Set objTextStream2 = objFSO.OpenTextFile(textloc , 1)
		comments = objTextStream2.ReadAll
		response.write comments
		
		objTextStream2.Close
		Set objTextStream2 = Nothing
End If 

Else
  
	 Dim MyFile2
   Set MyFile2 = objfso.CreateTextFile(textloc, True)
	 MyFile2.WriteBlankLines(1)

   MyFile2.Close
	 Response.Write nocom

End If



dim showedit



rowcount = rowcount + 1


%>
</td></tr></table>
</td><td>&nbsp </td>	<% 
dim leftover
leftover = cols - rc
if leftover = 1 then 
re = 0
%></TR> <%  else
re = 1
end if
end if  %>
<%






Next 'objItem

' All done!  Kill off our object variables.
Set objItem = Nothing
Set objFolder = Nothing
Set objFSO = Nothing
leftover = leftover - 1


Do While leftover>0
%> <td> &nbsp </td> <td>&nbsp </td> <%
	leftover = leftover -1 
Loop

%>

</TABLE>
		<center><img src="<%=shadow%>" width="980" height="40" alt="" />
		<!-- PayPal Logo -->
		<table border="0" cellpadding="0" cellspacing="0" align="center"><tr><td align="center"></td></tr><tr><td align="center"><a href="https://www.paypal.com/uk/webapps/mpp/paypal-popup" title="How PayPal Works" onclick="javascript:window.open('https://www.paypal.com/uk/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;"><img src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_SbyPP_mc_vs_ms_ae_UK.png" border="0" alt=""></a></td></tr></table><!-- PayPal Logo --></center>
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


