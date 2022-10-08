
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(public http: HttpClient) {
    this.apiURL = `${environment.url_sorteio_api}/email`;
  }

  readonly apiURL: string;

  sendEmail(to, subject, body) {
    let data = { "to": `${to}`, "subject": `${subject}`, "html": `${body}` }
    return this.http.post(`${this.apiURL}/send-email`, data);
  }

  sendEmailVencedor(to, subject, voucher, code_nota) {
    let template = `<!DOCTYPE html>
    <!DOCTYPE html>
<html>

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        table {
            border-collapse: collapse !important;
        }

        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        @media screen and (max-width: 480px) {
            .mobile-hide {
                display: none !important;
            }

            .mobile-center {
                text-align: center !important;
            }
        }

        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }


    </style>

<body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                    <tr>
                        <td align="middle" valign="middle" style="font-size:0; padding: 35px;background-image: url('https://i.imgur.com/dKuvuCn.png');">
                            <div style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                                <table align="middle" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                    <tr>
                                        <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img src="https://i.imgur.com/UBqZprr.png" width="520" height="500" style="display: block; border: 0px;" /><br>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                <tr>
                                    <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img src="https://i.imgur.com/a1o2b1W.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                                        <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"> Agora você tem R$600 em vale-compras para usar no Multi Market! </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                        <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align: center;">CHAVE DE ACESSO: <br>${code_nota}</p>
                                        <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align: center;">Código premiado: <b>${voucher}</b></p>
                                    </td>
                                </tr>


                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style=" padding: 35px; background-color: #F44336;" bgcolor="#1b9ba3">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                <tr>
                                    <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                        <h2 style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;">A equipe de promoção do Multi Market entrará em contato por telefone, na terça-feira, para auxiliar na retirada do prêmio.<br><br>
                                            Para a retirada do prêmio é necessário: documento de identidade com foto, CPF, a nota fiscal da compra e esse e-mail.</h2>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="background-color: #ffffff;">
                            <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"> Siga Nossas Redes Sociais</h2>
                             <table  cellpadding="0" cellspacing="0" width="100%%">
                               <tr>
                                <td align="center">
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <a href="https://www.facebook.com/RedeMultiMarket/" target="_blank">
                                                    <img src="https://i.imgur.com/wDSJ0dE.png" style="-webkit-filter: invert(30%);" alt="Facebook" width="50" height="50"
                                                         style="display: block;" border="1"/>
                                                </a>
                                            </td>
                                            <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                            <td>
                                                <a href="https://www.youtube.com/channel/UCkFXX2ukAMu44c2GyicUMXA" target="_blank">
                                                    <img src="https://i.imgur.com/X75Iy3Q.png" style="-webkit-filter: invert(30%);" alt="Youtube" width="50" height="50"
                                                         style="display: block;" border="1"/>
                                                </a>
                                            </td>
                                            <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                            <td>
                                                <a href="https://twitter.com/Multimarket_RJ" target="_blank">
                                                    <img src="https://i.imgur.com/Ahxd1j3.png" style="-webkit-filter: invert(30%);" alt="Twitter" width="50" height="50"
                                                         style="display: block;" border="1"/>
                                                </a>
                                            </td>
                                            <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                            <td>
                                                <a href="https://www.instagram.com/redemultimarket.oficial/?hl=pt-br" target="_blank">
                                                    <img src="https://i.imgur.com/QVnhxNW.png" style="-webkit-filter: invert(30%);" alt="Instagram" width="50" height="50"
                                                         style="display: block;" border="1"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    <br>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                <tr>
                                    <td align="center" >
                                        <a href="https://redemultimarket.com.br/delivery/"><img src="https://i.imgur.com/gmvycBR.png" width="600px"/></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" >
                                        <a href="https://redemultimarket.com.br/"><img src="https://i.imgur.com/mWxutfY.png" width="600px"/></a>
                                    </td>
                                </tr>

                            </table>
                            <br>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
     `;
    let data = { "to": `${to}`, "subject": `${subject}`, "html": `${template}` }
    return this.http.post(`${this.apiURL}/send-email`, data);
  }

  sendEmailNumerosSorteio(to, subject, numeros) {
    let template = `<!DOCTYPE html>
    <html>

    <head>
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <title></title>
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <style type="text/css">
          body,
          table,
          td,
          a {
             -webkit-text-size-adjust: 100%;
             -ms-text-size-adjust: 100%;
          }

          table,
          td {
             mso-table-lspace: 0pt;
             mso-table-rspace: 0pt;
          }

          img {
             -ms-interpolation-mode: bicubic;
          }

          img {
             border: 0;
             height: auto;
             line-height: 100%;
             outline: none;
             text-decoration: none;
          }

          table {
             border-collapse: collapse !important;
          }

          body {
             height: 100% !important;
             margin: 0 !important;
             padding: 0 !important;
             width: 100% !important;
          }

          a[x-apple-data-detectors] {
             color: inherit !important;
             text-decoration: none !important;
             font-size: inherit !important;
             font-family: inherit !important;
             font-weight: inherit !important;
             line-height: inherit !important;
          }

          @media screen and (max-width: 480px) {
             .mobile-hide {
                display: none !important;
             }

             .mobile-center {
                text-align: center !important;
             }
          }

          div[style*="margin: 16px 0;"] {
             margin: 0 !important;
          }
       </style>
    </head>

    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
       <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
             <tr>
                <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                   <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                      <tbody>
                         <tr>
                            <td align="center" valign="top" style="font-size:0;>
                               <div style=" display:inline-block;="" min-width:100px;="" vertical-align:top;"="">
                               <table align="left" border="0" cellpadding="0" cellspacing="0">
                                  <tbody>
                                     <tr>
                                        <td align="center"
                                           style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; ">
                                           <img src="https://i.imgur.com/2ajt33y.png" style="height: px;width:300px;">
                                        </td>
                                     </tr>
                                  </tbody>
                               </table>
                               <div
                                  style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                                  class="mobile-hide"></div>
                            </td>
                         </tr>
                         <tr>
                            <td align="center" style="padding: 16px; background-color: #ffffff;" bgcolor="#ffffff">
                               <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                  style="max-width:600px;">
                                  <tbody>
                                     <tr>
                                        <td align="center"
                                           style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; ">
                                        </td>
                                     </tr>
                                     <tr>
                                        <td align="left"
                                           style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                           <p
                                              style="color:#5462d5;font-size: 20px; font-weight: 700; line-height: 24px;text-align: center;">
                                              <b>A sua inscrição foi concluída com sucesso!</b>
                                           </p>
                                           <img src="https://i.imgur.com/OB1qxCo.png"
                                              style="height: px;width:90; display: block;   margin-left: auto;  margin-right: auto;  width: 50%;">
                                           <p
                                              style="color:#000000;font-size: 16px; font-weight: 600; line-height: 24px;text-align: center;">
                                              <b>Obrigado por participar da nossa promoção de Aniversário. <br> Esses são os
                                                 seus <br> números da sorte: </b>
                                           </p>
                                        </td>
                                     </tr>
                                     <tr>
                                        <td align="left" style="padding-top: 20px;">
                                           <p
                                              style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align: center;">
                                           <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                              <tbody>
                                                 <tr>
                                                    <td width="75%" align="center"
                                                       style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                       ${numeros} </td>
                                                 </tr>
                                              </tbody>
                                           </table>
                                        </td>
                                     </tr>
                                  </tbody>
                               </table>
                            </td>
                         </tr>
                         <tr>
                            <td align="center"
                               style="background-color: #b91d22;font-family: Open Sans, Helvetica, Arial, sans-serif;">
                               <h2
                                  style="font-size: 14px; font-weight: 800; line-height: 20px;padding: 15px 0; color: #ffffff; margin: 0;">
                                  Lembrando que entraremos em contato com os sorteados por e-mail, então <br> fique de olho
                                  na sua caixa de entrada <br> e na sua caixa de spam. <br> Verifique atentamente todos os
                                  dias! <br>
                                  <br> Essa pode ser a sua chance de ganhar <br> R$600 em vale-compras no Multi. <br>
                                  <br>
                                  <b>Boa sorte!</b>
                               </h2>
                         </tr>
                         <tr>
                            <td align="center"
                               style="background-color: #fffff;font-family: Open Sans, Helvetica, Arial, sans-serif;">
                               <h2
                                  style="font-size: 14px; font-weight: 800; line-height: 20px;padding: 15px 0; color: #b91d22; margin: 0;">
                                  Siga nossas redes sociais <br>para mais novidades e ofertas! </h2>
                               <table cellpadding="0" cellspacing="0" width="100%">
                                  <tbody>
                                     <tr>
                                        <td align="center">
                                           <table cellpadding="0" cellspacing="0">
                                              <tbody>
                                                 <tr>
                                                    <td>
                                                       <a href="https://www.facebook.com/RedeMultiMarket/" target="_blank">
                                                          <img src="https://i.imgur.com/qjPg94s.png" alt="Facebook"
                                                             width="50" height="50" style="display: block;" border="1">
                                                       </a>
                                                    </td>
                                                    <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                                    <td>
                                                       <a href="https://www.youtube.com/channel/UCkFXX2ukAMu44c2GyicUMXA"
                                                          target="_blank">
                                                          <img src="https://i.imgur.com/O6wey0F.png" alt="Youtube"
                                                             width="50" height="50" style="display: block;" border="1">
                                                       </a>
                                                    </td>
                                                    <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                                    <td>
                                                       <a href="https://twitter.com/Multimarket_RJ" target="_blank">
                                                          <img src="https://i.imgur.com/Aw2z1P1.png" alt="Twitter"
                                                             width="50" height="50" style="display: block;" border="1">
                                                       </a>
                                                    </td>
                                                    <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                                    <td>
                                                       <a href="https://www.instagram.com/redemultimarket.oficial/?hl=pt-br"
                                                          target="_blank">
                                                          <img src="https://i.imgur.com/gWX0NZM.png" alt="Instagram"
                                                             width="50" height="50" style="display: block;" border="1">
                                                       </a>
                                                    </td>
                                                 </tr>
                                              </tbody>
                                           </table>
                                           <br>
                                           <br>
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
    </body>
    </html>
   `;
    let data = { "to": `${to}`, "subject": `${subject}`, "html": `${template}` }
    return this.http.post(`${this.apiURL}/send-email`, data);
  }

}
