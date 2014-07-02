<%
	Set jpeg = Server.CreateObject("Persits.Jpeg")
	jpeg.Open( Request("Path") )
	jpeg.Interpolation = 1
	jpeg.quality = 100
	jpeg.SendBinary
	
%>