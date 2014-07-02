
<%
if instr(Request.ServerVariables("PATH_INFO"), "admin.asp") = false then

response.redirect "/shop/includes/admin/login.asp"
response.end
end if
Dim strPath   'Path of directory to show
Dim objFSO    'FileSystemObject variable
Dim objFolder 'Folder variable
Dim objItem   'Variable used to loop through the contents of the folder
dim hidden, hid, dochange, fname,ad

dim ActDir,MyFile
 MyFile=Split(Request.ServerVariables("PATH_INFO"),"/")
 galname=MyFile(UBound(MyFile)-3)
ActDir="/" & galname & "/" 
strPath = ActDir
dim strpath2
strpath2 = "/" & galname & "/"


' Create our FSO
Set objFSO = Server.CreateObject("Scripting.FileSystemObject")

' Get a handle on our folder
Set objFolder = objFSO.GetFolder(Server.MapPath(strPath))




%>

<center>
<table summary="" align=center width="82%" cellspacing=5 class=foldertable cellpadding=5>
<tr align=center><td><h4>Product Categories:</h4></td><td>&nbsp </td><td>&nbsp </td><td>&nbsp </td></tr>

 <%
For Each objitem In objFolder.subfolders




Dim strTemp

	
	strTemp = objitem.Name
' Ignore Directories	
if objitem.name = "includes" then 
else

if InStr(strTemp, "_vti") then
else


hid = LCase(Right(strTemp, Len(strTemp) - InStrRev(strTemp, "_hidden_", -1, 1)))
dim hid2, arrsplit
arrsplit = split(strtemp, "_hidden_")
hid2 = arrSplit(0)

%>

<tr align=center><td><a href="admin.asp?sec=images&gal=<% =objitem.name %>"><% =replace(arrsplit(0), "_", " ") %></a></td><td><a href="admin.asp?sec=rengal&galname=<% =arrsplit(0) %>">Rename </a></td><td>


<%

'Find If it is hidden or not, act on a request to hid, unhide

Select Case hid
		Case "hidden_"
			%><a href="admin.asp?sec=folders&dochange=unhide&fname=<% =strtemp %>">Unhide</a><%
		Case Else
%><a href="admin.asp?sec=folders&dochange=hide&fname=<% =strtemp %>">Hide</a><%
						
	End Select
fname = request ("fname")
dochange = request ("dochange")
if fname = strtemp then	
Select Case dochange
		Case "hide"
			objitem.name = objitem.name + " _hidden_"
response.redirect "admin.asp?sec=folders"
		Case "unhide"
			objitem.name = hid2
			response.redirect "admin.asp?sec=folders"
		


				
	End Select
	end if


 %>
</td>


<td>

<a href="admin.asp?sec=folders&dochange=del&fname=<% =strtemp %>">Delete</a>



</td>


<td>

<a href="admin.asp?sec=upload&fname=<% =strtemp %>">Upload</a>



</td>



</tr>


<%
end if 	
end if
Next 'objItem

' All done!  Kill off our object variables.
Set objItem = Nothing
Set objFolder = Nothing
Set objFSO = Nothing

dim deffold, basepath, newfold, newgal
newgal = request("newgal")
deffold = Server.MapPath(strPath2) +  "\includes\default"
basepath = Server.MapPath(strPath2)
Set fso = CreateObject("Scripting.FileSystemObject")
if request("sub") = "y" then
newgal = Replace(newgal, Chr(32), "_")

newfold = basepath + "\" + newgal
response.write newfold
response.write deffold
fso.CopyFolder deffold, newfold
set fso = nothing
response.redirect "admin.asp?sec=folders"
end if

Select Case dochange
		Case "del"
dim delfold
delfold = basepath + "\" + request("fname")
fso.DeleteFolder(delfold)

set fso = nothing

response.write delfold

response.redirect "admin.asp?sec=folders"


				
	End Select

%></table>


<form action="admin.asp?sec=folders" method="post"><table border="0" cellpadding="5" cellspacing="5" summary="" align=middle>
<tr><td>
Create New Category</td><td><input type="text" name="newgal"></td> <td> <input type="hidden" name="sub" value="y" />
<button type="submit" class="btn btn-primary" >Create</button> </tr>
</table></form>


</center>
