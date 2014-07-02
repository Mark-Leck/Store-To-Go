<!--#include virtual="/shop/includes/cfg.asp" -->

<%
dim fact,orig,vw
fact = request ("fact")
orig = request("orig")
vw = viewwidth

if orig = "" then 
orig = 1
end if

%>


<%
	Set jpeg = Server.CreateObject("Persits.Jpeg")
	jpeg.Open( server.mappath(request("strpath") + request("path")) )
jpeg.Interpolation = 1
jpeg.quality = 100
if orig = "0" then
else 
if usewidth = 1 then
while int(vw) <= jpeg.width

jpeg.Width = fact * jpeg.OriginalWidth
fact = fact - 0.001

wend

end if
end if

jpeg.Width = fact * jpeg.OriginalWidth
jpeg.Height = jpeg.OriginalHeight * fact

jpeg.SendBinary
	
%>



