
export const workshopEmailTemplate = (customer_name:string, email_title:string, email_opening_text:string, email_closing_paragraph:string, address?:string|null, workshop_date?:string|null, email?:string|null, sold_to?:string|null) => {
    let info_output;
  
    if (email === null) {
      info_output = `Date: ${workshop_date} <br/>. Location: ${address}`;
  
    } else {
      if (sold_to !== null) {
        info_output = `User: ${sold_to}, <br/> Email: ${email}`
  
      } else {
        info_output = `User: ${customer_name}, <br/> Email: ${email}`
      }
  
    }
    return `
          <body style="background-color:#ffffff;margin:0 auto;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif">
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:0px 20px">
              <tbody>
                <tr style="width:100%">
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px">
                      <tbody>
                        <tr>
                          <td><h2>Parawild Edu<span style="color: #708238;">.</span></h2></td>
                        </tr>
                      </tbody>
                    </table>
                    <h1 style="color:#1d1c1d;font-size:36px;font-weight:700;margin:30px 0;padding:0;line-height:42px">${email_title}</h1>
                    <p style="font-size:20px;line-height:28px;margin:16px 0;margin-bottom:30px">
                    Dear ${customer_name},</br></br>
  
                    ${email_opening_text}
                    </p>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background:rgb(245, 244, 245);border-radius:4px;margin-bottom:30px;padding:40px 10px">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;text-align:center;vertical-align:middle">
                             ${info_output}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p style="font-size:14px;line-height:24px;margin:16px 0;color:#000">${email_closing_paragraph}</p>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-bottom:32px;padding-left:8px;padding-right:8px;width:100%">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td data-id="__react-email-column" style="width:66%"><h2>Parawild Edu<span style="color: #708238;">.</span></h2></td>
                                  <td data-id="__react-email-column">
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                              <tbody style="width:100%">
                                                <tr style="width:100%">
                                                  <td data-id="__react-email-column"><a href="/" style="color:#067df7;text-decoration:none" target="_blank"><img alt="Slack" height="32" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/slack-twitter.png" style="display:inline;outline:none;border:none;text-decoration:none;margin-left:32px" width="32" /></a></td>
                                                  <td data-id="__react-email-column"><a href="/" style="color:#067df7;text-decoration:none" target="_blank"><img alt="Slack" height="32" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/slack-facebook.png" style="display:inline;outline:none;border:none;text-decoration:none;margin-left:32px" width="32" /></a></td>
                                                  <td data-id="__react-email-column"><a href="/" style="color:#067df7;text-decoration:none" target="_blank"><img alt="Slack" height="32" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/slack-linkedin.png" style="display:inline;outline:none;border:none;text-decoration:none;margin-left:32px" width="32" /></a></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td><a href="https://parawild.org/blogs" rel="noopener noreferrer" style="color:#b7b7b7;text-decoration:underline" target="_blank">Our blog</a>   |   <a href="https://parawild.org/workshops/" rel="noopener noreferrer" style="color:#b7b7b7;text-decoration:underline" target="_blank">Workshops</a>   |
                            <p style="font-size:12px;line-height:15px;margin:16px 0;color:#b7b7b7;text-align:left;margin-bottom:50px">©2024 Parawild Edu Capture <br />Hoedspruit 1380, Limpopo, South Africa <br /><br />All rights reserved.</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
    `;
  }
  