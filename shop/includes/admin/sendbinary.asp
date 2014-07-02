<%
	' IMPORTANT: This script must not contain any HTML tags

	' Create an instance of AspJpeg object
	Set jpeg = Server.CreateObject("Persits.Jpeg")
	jpeg.Open( server.mappath(Request("path")) )

	' Set new width
	jpeg.Width = Request("Width")

	' Set new height, preserve original width/height ratio
	jpeg.Height = jpeg.OriginalHeight * jpeg.Width / jpeg.OriginalWidth

	jpeg.quality = 40

	' Send thumbnail data to client browser
	jpeg.SendBinary
%>