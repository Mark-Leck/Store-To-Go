<%
set fso=Server.CreateObject("Scripting.FileSystemObject")


 MyFile3=Split(Request.ServerVariables("PATH_INFO"),"/")
 dir3=myfile3(UBound(MyFile3)-3)

if ad = 1 then
flname = "/" + dir3 + "/" + strtemp + "/galsettings.asp"
else 
flname ="/" + myfile3(UBound(MyFile3)-2) + "/" + myfile3(UBound(MyFile3)-1) + "/galsettings.asp"

end if
flname = server.mappath(flname)

If fso.FileExists(flname) = true Then

set txtfile = fso.OpenTextFile(flname, 1, 0)
txtfile.SkipLine

priv= txtfile.readline
priv = left(priv,len(priv)-1)
priv = right(priv,len(priv)-3)




txtfile.close


else 

end if
set fso=nothing
%>