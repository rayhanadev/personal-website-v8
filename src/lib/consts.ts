import path from "node:path";

export const NICKNAME = "Ray";
export const FIRST_NAME = "Rayhan Noufal";
export const LAST_NAME = "Arayilakath";
export const FULL_NAME = "Rayhan Noufal Arayilakath";
export const TITLE = "Software Engineer";
export const ALIAS = "rayhanadev";

export const EMAIL_ADDRESS = "me@rayhanadev.com";
export const PHONE_NUMBER = "+1 (817) 470-7345";
export const PHONE_NUMBER_RAW = "8174707345";
export const SOCIALS = {
    x: "https://x.com/rayhanadev",
    // twitter: "https://twitter.com/rayhanadev",
    github: "https://github.com/rayhanadev",
    linkedin: "https://www.linkedin.com/in/rayhanadev",
    bluesky: "https://bsky.app/profile/rayhanadev.com",
    threads: "https://www.threads.com/@rayhanadev",
};

export const JSONLD = {
    "@context": "http://www.schema.org",
    "@type": "person",
    address: {
        "@type": "PostalAddress",
        addressRegion: "Texas",
        addressCountry: "United States of America",
    },
    alternateName: ALIAS,
    affiliation: {
        "@type": "Organization",
        name: "Purdue University",
        url: "https://purdue.edu/",
    },
    birthDate: "2006-06-24",
    description: "Developer",
    disambiguatingDescription: "Software Engineer",
    email: `mailto:${EMAIL_ADDRESS}`,
    familyName: LAST_NAME,
    gender: "Male",
    givenName: FIRST_NAME,
    honorificPrefix: "Mr",
    image: "https://www.rayhanadev.com/headshot.png",
    jobTitle: "Software Engineer",
    name: FULL_NAME,
    pronouns: "him/they",
    sameAs: SOCIALS.x,
    url: import.meta.env.SITE,
};

export const NAVIGATION = [
    { name: "home", href: "/" },
    { name: "blog", href: "/blog" },
    { name: "work", href: "/work" },
];

export const GPG_ENCRYPTION_SUBKEY =
    "D354 3687 A6E5 B6E7 150A  CB96 86CC 311D 0CA3 0AD9";
export const GPG_PUBLIC_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: 97C7 04C7 6B26 82EB F511  03A5 7A5E 74BF 31C9 B144
Comment: Rayhan Noufal Arayilakath <me@rayhanadev.com>

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
RA==
=es27
-----END PGP PUBLIC KEY BLOCK-----`;
export const SSH_PUBLIC_KEY =
    "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDFbtAqPlddx1IItiYbD1fZcztRw/v4vOLC9IKZfXcbqiAskitIK3XkM3N8gOEFwF7CtrTboB+RIZI72X/Es56bY5QtNLeTc6ENjW1g7v8xHf9hR+JqY1W3H/6/6v4CTVvQzrnqbmbzbBOQTdyOkHK7SrxDbaHlUu8jLQXEyFN7NYfH3QgGJcRpbEWzTmbjVT4ZyEyv2JVkv8OEPb6DCWXD8hn5+/54TdyXW79hoS8SZ4qT2J1lGPYtYE7gZO7vR+eKu7/mkfw5vQ8WghPZCmdnnFJWyhp8rQXTH/qeCZF0U2DG1OCaMeo5LrafmFjsgMAoc26BtN1uUa863MpUfHH9I+DoP5B4ImN1B39JS09rOGnBe9xMWpg2JQariILJjhT0rJgQOq2UpNBhQQd/FDCxZQcz0gDLM1sze4A6kTlzuxXmnjBSDzrzXDkuT8PgPapPRFMC/ffwr6czsgXCbiTZfoochU/NjjN6GrVBs0uvDvyqsAYV1/XMH9osK/FEt5RIlHYNvACCT7TX/vysZgCXfWN60OiQXnfvtzn+JY26sJqT5ZDj9KHIfgYE5SZiJIVFRNfv97IVqsM1HkgD/6fPJOo9gbljuj9Rxe0en70exQi7Iu2y19hGGkE9UJBHOCEejiLatuh7kKQFQQLvWXnUL9qNVylGJKKlAKpa+XnsJQ==";

export const BLOG_CONTENT_POOL_PATH = path.resolve(
    process.cwd(),
    "./src/content/blog",
);
