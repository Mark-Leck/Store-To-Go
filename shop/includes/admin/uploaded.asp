<%@ Language=VBScript %>
<% 
option explicit 
Response.Expires = 0
Response.Expiresabsolute = Now() - 2

Server.ScriptTimeout = 600
' All communication must be in UTF-8, including the response back from the request
Session.CodePage  = 65001
%>
<% 

if session ("sessvar") <> 1 then 
Dim galusername
galusername = session("galusername")
'response.write galusername

end if
%>
<!--#include virtual="/shop/includes/cfg.asp" -->
<!--#include file="check.asp" -->
<!-- #include file="freeASPUpload.asp" -->
<%

  ' ****************************************************
  ' Change the value of the variable below to the pathname
  ' of a directory with write permissions, for example "C:\Inetpub\wwwroot"
  ' ****************************************************
  Dim fname
  fname = request("location")
  Dim uploadsDirVar
  uploadsDirVar = Server.MapPath("/") + "\shop\" + request("location")
  'response.write(uploadsDirVar)

  ' Note: this file uploadTester.asp is just an example to demonstrate
  ' the capabilities of the freeASPUpload.asp class. There are no plans
  ' to add any new features to uploadTester.asp itself. Feel free to add
  ' your own code. If you are building a content management system, you
  ' may also want to consider this script: http://www.webfilebrowser.com/

function OutputForm()
%>
    <form name="frmSend" method="POST" enctype="multipart/form-data" accept-charset="utf-8" action="uploadTester.asp" onSubmit="return onSubmitForm();">
	
    <input name="attach1" type="hidden" size=35><br>
    <input name="attach2" type="hidden" size=35><br>
    <input name="attach3" type="hidden" size=35><br>
    <input name="attach4" type="hidden" size=35><br>
    <br> 

    <input style="margin-top:4" type="hidden" value="Upload">
    </form>
<%
end function

function TestEnvironment()
    Dim fso, fileName, testFile, streamTest
    TestEnvironment = ""
    Set fso = Server.CreateObject("Scripting.FileSystemObject")
    if not fso.FolderExists(uploadsDirVar) then
        TestEnvironment = "<B>Folder " & uploadsDirVar & " does not exist.</B><br>The value of your uploadsDirVar is incorrect. Open uploaded.asp in an editor and change the value of uploadsDirVar to the pathname of a directory with <b>write</b> permissions."
        exit function
    end if
    fileName = uploadsDirVar & "\test.txt"
    on error resume next
    Set testFile = fso.CreateTextFile(fileName, true)
    If Err.Number<>0 then
        TestEnvironment = "<B>Folder " & uploadsDirVar & " does not have write permissions.</B><br>The value of your uploadsDirVar is incorrect. Open uploaded.asp in an editor and change the value of uploadsDirVar to the pathname of a directory with <b>write</b> permissions."
        exit function
    end if
    Err.Clear
    testFile.Close
    fso.DeleteFile(fileName)
    If Err.Number<>0 then
        TestEnvironment = "<B>Folder " & uploadsDirVar & " does not have delete permissions</B>, although it does have write permissions.<br>Change the permissions for IUSR_<I>computername</I> on this folder."
        exit function
    end if
    Err.Clear
    Set streamTest = Server.CreateObject("ADODB.Stream")
    If Err.Number<>0 then
        TestEnvironment = "<B>The ADODB object <I>Stream</I> is not available in your server.</B><br>Check the Requirements page for information about upgrading your ADODB libraries."
        exit function
    end if
    Set streamTest = Nothing
end function

function SaveFiles
    Dim Upload, fileName, fileSize, ks, i, fileKey

    Set Upload = New FreeASPUpload
    Upload.Save(uploadsDirVar)

	' If something fails inside the script, but the exception is handled
	If Err.Number<>0 then Exit function

    SaveFiles = ""
    ks = Upload.UploadedFiles.keys
    if (UBound(ks) <> -1) then
        SaveFiles = "<center><B>Files successfully uploaded to directory: <br>" + fname + " :<br></B><br>"
        for each fileKey in Upload.UploadedFiles.keys
            SaveFiles = SaveFiles & Upload.UploadedFiles(fileKey).FileName & " (" & Upload.UploadedFiles(fileKey).Length & "B)<br><br>"
        %></center><%
	next
    else
        SaveFiles = "<center>No image file selected for upload <br>or the file name specified in the upload form does not correspond to a valid file in the system.<br><br><br><a href='/shop/includes/admin/admin.asp?sec=upload&fname=" + fname + "'" + " ><button class='btn btn-primary'>Try Again</button></a></center>"
    end if
end function
%>

<HTML>
<HEAD>
<TITLE>Uploader</TITLE>
<!--#include file="style.asp" -->

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<script>
function onSubmitForm() {
    var formDOMObj = document.frmSend;
    if (formDOMObj.attach1.value == "" && formDOMObj.attach2.value == "" && formDOMObj.attach3.value == "" && formDOMObj.attach4.value == "" )
        alert("Please press the Browse button and pick a file.")
    else
        return true;
    return false;
}
</script>

</HEAD>

<BODY style="background-color:#<% =bgclr %>;background-image:url(<% =bgurl %>)">
 <div class=bluebox id=admincontent style="display: inline; background-color:#<%=cellclr%>">
<font size="1" align="left" color="grey"><b>Uploader v1.00</b></font>
<br><br>
<%
Dim diagnostics
if Request.ServerVariables("REQUEST_METHOD") <> "POST" then
    diagnostics = TestEnvironment()
    if diagnostics<>"" then
        response.write "<div style=""margin-left:20; margin-top:30; margin-right:30; margin-bottom:30;"">"
        response.write diagnostics
        response.write "<p>After you correct this problem, reload the page."
        response.write "</div>"
    else
        response.write "<div>"
        'OutputForm()
        response.write "</div>"
    end if
else
    response.write "<div>"
    'OutputForm()
    response.write SaveFiles()
    response.write "</div>"
end if

%>
<br>
<br>
</div>
 <div class=bluebox id=adminnav style="display: inline; background-color:#<%=cellclr%>">
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
</BODY>
</HTML>