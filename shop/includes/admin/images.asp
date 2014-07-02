<% 
if instr(Request.ServerVariables("PATH_INFO"), "admin.asp") = false then

response.redirect "/shop/includes/admin/login.asp"
response.end
end if


Dim imstrPath   'Path of directory to show
Dim imobjimO    'FileSystemObject variable
Dim imobjFolder 'Folder variable
Dim imobjItem   'Variable used to loop through the contents of the folder
Dim imobjFolder3 'Folder variable
Dim imobjItem3
Dim imobjFolder2 'Folder variable
Dim imobjItem2
dim imgalname
dim imActDir,imMyFile
dim impath2,impath3
dim selectuser
Dim objTextStream,comments,textloc
dim imcount
dim galint
dim line2
dim line3
selectuser= "" 'session("galusername")
galint = request("gal")
 MyFile=Split(Request.ServerVariables("PATH_INFO"),"/")
 imgalname=MyFile(UBound(MyFile)-3)
imActDir="/" & imgalname & "/"


dim sname

sname =MyFile(ubound(myfile))
sname = sname + "&sec=" + request("sec") + "&user=" + request("user") + "&gal=" + request("gal")   

imstrPath = imActDir 


Set imobjimO = Server.CreateObject("Scripting.FileSystemObject")

' Get a handle on our folder
Set imobjFolder = imobjimO.GetFolder(Server.MapPath(imstrPath))
'run thru the users

response.write "<table width=85" & chr(37) & " align=center border=0>"
 response.write "<tr><td align=center colspan=4> " 
  Response.Write( "<br><h2>Product Images, By Category:</h2>")
 response.write "</td></tr> " 
For Each imobjitem In imobjFolder.subfolders

if imobjitem.name <> "includes" then
if selectuser = imobjitem.name or selectuser = "" then

path2 = imactdir + imobjitem.name + "/"

if lcase(galint) = lcase(imobjitem.name) or galint = "" then
response.write "<tr><td align=center colspan=4><br><hr width=60" & chr(37) & " color=" & hdrclr & "></td></tr>"
 response.write "<tr><td align=center colspan=4> " 
  Response.Write( "<b>" + "<a href=../../" + lcase(imobjitem.name) + ">" + UCASE(replace(replace(imobjitem.name, "_hidden_", ""), "_", " ")) + "</a></b>")
 response.write "</td></tr> " 
 response.write "<tr><td align=center colspan=4><hr width=60" & chr(37) & " color=" & hdrclr & "><br></td></tr>"


path3 = path2 
Set imobjFolder3 = imobjimO.GetFolder(server.mappath(path3))
imcount = 0
For Each imobjitem3 In imobjFolder3.files
if instr(lcase(imobjitem3.name), "jpg") or instr(lcase(imobjitem3.name), "gif") or instr(lcase(imobjitem3.name), "png") or instr(lcase(imobjitem3.name), "jpeg")  then
if instr(imobjitem3.name, " ") then
imobjitem3.name = replace(imobjitem3.name," ","_")
else
end if
if instr(imobjitem3.name, "&") then
imobjitem3.name = replace(imobjitem3.name,"&","_")
else
end if
imcount = imcount + 1
end if
next
if imcount = 0 then
response.write "<tr><td colspan=4 align=center><h3>Product Category Empty</h3></td></tr>"
end if


For Each imobjitem3 In imobjFolder3.files

if instr(lcase(imobjitem3.name), "jpg") or instr(lcase(imobjitem3.name), "gif") or instr(lcase(imobjitem3.name), "png") or instr(lcase(imobjitem3.name), "jpeg")  then

textloc = server.mappath(path3 + descfolder + "/" + imobjitem3.name + ".txt")

	If (imobjimO.FileExists(textloc)) Then

 		if (imobjimO.getfile(textloc).size = 0) then
	  Set objedit = imobjimO.OpenTextFile(textloc, 8)
		objedit.WriteBlankLines(1)
		objedit.Close
		end if


		Set objTextStream = imobjimO.OpenTextFile(textloc , 1)
		dim line1
	
	line1 = objTextStream.Readline



		
		If line1 = "" Then
		if (imobjimO.getfile(textloc).size > 2) then
		
		Dim objTextStream3
		Set objTextStream3 = imobjimO.OpenTextFile(textloc , 1)
		comments = objTextStream3.ReadAll

		
		objTextStream3.Close
		Set objTextStream3 = Nothing
		
		
		else
		comments =  nocom
		objTextStream.Close
		end if
		Set objTextStream = Nothing
		Else
		Dim objTextStream2
		Set objTextStream2 = imobjimO.OpenTextFile(textloc , 1)
		comments = objTextStream2.ReadAll
		
		
		objTextStream2.Close
		Set objTextStream2 = Nothing

End If 

Else
  
	 Dim MyFile2
   Set MyFile2 = imobjimO.CreateTextFile(textloc, True)
	 MyFile2.WriteBlankLines(1)

   MyFile2.Close
	 comments = nocom

End If

 
 response.write "<tr><td align=center> " 
 
 





	Select Case aspj
		Case 1 %>
<IMG SRC="sendbinary.asp?path=<% response.write (path3 + lcase(imobjitem3.name))  %>&width=<% =iwidth %>">


<%
	Case Else  
 Response.Write( "<img src=" + path3 +lcase(imobjitem3.name) + " width=" + iwidth + ">")

			End Select
			
			
	














 response.write "<td align=center>" + comments + "&nbsp " 
 %>
 </td><td align=center>
 <a href="../edit.asp?path=<% =imobjitem3.name  %>&strpath=<% =path3%>" >Edit<br>Description</a> </td>

<% 










 response.write "</td><td align=center><a href=admin.asp?imgpath=" + path3 +lcase(imobjitem3.name) + "&sec=images&deleteimg=true" + ">Delete</a></td></tr> " 


end if

next



end if
end if

end if


next
response.write "</table><br>"

set imobjimO = nothing  'FileSystemObject variable
set imobjFolder = nothing'Folder variable
set imobjItem = nothing  'Variable used to loop through the contents of the folder
set imobjFolder3 = nothing 'Folder variable
set imobjItem3 = nothing
set imobjFolder2 = nothing'Folder variable
set imobjItem2 = nothing
 %>