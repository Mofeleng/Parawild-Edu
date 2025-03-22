
export function recievedEmailTemplate(from:string, name:string, message:string, header:string, footer:string) {
    return `
    <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;margin:0 auto;padding:20px 0 48px;width:580px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td><h2>Parawild Edu<span style="color: #708238;">.</span></h2></td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            </table>
  
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-bottom:20px">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <p style="font-size:32px;line-height:1.3;margin:16px 0;font-weight:700;color:#484848">${header}</p>
                          <p style="font-size:18px;line-height:1.4;margin:16px 0;color:#484848;padding:24px;background-color:#f2f3f3;border-radius:4px">"${message}"</p>
  
                          <p style="font-size:18px;line-height:1.4;margin:16px 0;color:#484848">${footer}</p>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
          </td>
        </tr>
      </tbody>
    </table>
  </body>
    `
}