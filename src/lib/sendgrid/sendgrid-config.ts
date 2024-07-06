import sgMail from "@sendgrid/mail"
import { MailService } from "@sendgrid/mail"

export function email():MailService{
  sgMail.setApiKey(process.env.SENDGRID_KEY as string )
  return sgMail
}