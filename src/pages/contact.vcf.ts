import type { APIRoute } from "astro";
import {
    ALIAS,
    EMAIL_ADDRESS,
    FIRST_NAME,
    FULL_NAME,
    LAST_NAME,
    NICKNAME,
    PHONE_NUMBER_RAW,
    SOCIALS,
    TITLE,
} from "lib/consts";

const vcf = `
BEGIN:VCARD
VERSION:3.0
FN:${FULL_NAME}
N:${LAST_NAME};${FIRST_NAME};;;
NICKNAME:${NICKNAME}
TEL;TYPE=WORK:+1${PHONE_NUMBER_RAW}
EMAIL;TYPE=HOME:${EMAIL_ADDRESS}
URL:${import.meta.env.SITE}
ORG:${ALIAS}
TITLE:${TITLE}
LOGO;${import.meta.env.SITE}/web-app-manifest-512x512.png
PHOTO;VALUE=URI:${import.meta.env.SITE}/headshot-alt.png
GENDER:M
NOTE:Software Engineer, Web Developer, and Open Source Enthusiast.
LANG:en-US
REV:${new Date().toISOString()}
SOCIALPROFILE;TYPE=Twitter:${SOCIALS.x}
SOCIALPROFILE;TYPE=LinkedIn:${SOCIALS.linkedin}
SOCIALPROFILE;TYPE=GitHub:${SOCIALS.github}
END:VCARD
`.trim();

export const GET: APIRoute = () => {
    return new Response(vcf, {
        headers: {
            "Content-Type": "text/vcard; charset=utf-8",
            "Contact-Disposition": "attachment; filename=contact.vcf",
        },
    });
};
