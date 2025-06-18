from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr
import os

conf = ConnectionConfig(
    MAIL_USERNAME="fredylove614@gmail.com",
    MAIL_PASSWORD="ntreqzoxiqenmxtf",
    MAIL_FROM="fredylove614@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",  # or your SMTP server
    MAIL_FROM_NAME="BraidArt",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

async def send_status_email(to_email: EmailStr, status: str):
    message = MessageSchema(
        subject="Your Booking Status",
        recipients=[to_email],
        body=f"Hi! Your booking has been {status}. Thank you for using BraidArt.",
        subtype="plain"
    )

    fm = FastMail(conf)
    await fm.send_message(message)
