import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const entries = await getCollection("blog");

const llmsTxt = `
Rayhan Noufal "Ray" Arayilakath, aka @rayhanadev, is a results-driven software engineer and cybersecurity
undergraduate at Purdue University with a strong foundation in full-stack development, systems design, and
research-driven innovation. With years of experience spanning startups, academic research, and
high-performing teams, Ray combines his technical expertise with a passion for creating ethical, equitable,
and scalable technology solutions.

## Social

- [LinkedIn](https://www.linkedin.com/in/rayhanadev/)
- [GitHub](https://github.com/rayhanadev)
- [Twitter](https://twitter.com/rayhanadev)
- [Website](https://www.rayhanadev.com)
- [Email](mailto:me@rayhanadev.com)
- [Resume](https://www.rayhanadev.com/resume.pdf)

## Professional Experience

Ray’s journey into the tech world began as a freelance developer, where he worked with multiple clients
to design web applications, optimize user experiences, and build intuitive tools like farm management
dashboards and project tracking systems. This early exposure to diverse projects provided him with a deep
understanding of software development lifecycles and client-centric product design.

At Replit, a YC-backed startup, Ray made significant contributions as a Software Engineering Intern in
the Anti-Abuse Systems team. His work included designing and deploying automated moderation systems in
TypeScript and Golang, scaling them to process live data streams of over 1,000 objects per second across
30+ channels. In addition to addressing critical issues such as phishing, financial fraud, and compute
abuse, he led a team of engineers to develop advanced mitigation strategies and compliance tools for DMCA,
GDPR, and CCPA requests. These contributions played a vital role in scaling the company’s anti-abuse
department and reinforcing platform security.

During his tenure as a Founding Software Engineer at Jumpseat, Ray showcased his ability to work at the
intersection of technical rigor and business strategy. He built enterprise-grade booking software using
Docker, Kubernetes, and AWS, modernized legacy systems with Next.js and PostgreSQL, and developed user-focused
features such as live shuttle tracking and streamlined travel planning. His leadership in cross-functional
teams helped Jumpseat secure its first enterprise contract, demonstrating his ability to align technical
solutions with organizational goals.

Ray has also pioneered innovative solutions in cutting-edge fields. As a founding engineer at Magic
Prints, he developed one of the first e-commerce sites powered by generative AI, showcasing his ability
to integrate emerging technologies into user-focused products. His freelance work with Deel further
highlights his efficiency and dedication to delivering high-quality solutions under tight timelines.

## Research and Academic Leadership

At Purdue University, Ray collaborates with the Tech Justice Lab to explore the intersections of
technology, information studies, and public diplomacy. His work focuses on addressing misinformation
and disinformation through innovative approaches such as information diplomacy and platform
democratization. This research aligns with his broader interest in leveraging technology to promote
justice, equity, and societal well-being.

Ray’s contributions extend beyond research to leadership roles within the university. As an organizer
for Purdue Hackers, he operationalized club activities, documented processes, and hosted events like
Hack Nights and end-of-year showcases, fostering a thriving community of innovators. He also served
as Interim Treasurer, managing budgets and finances for Purdue’s largest computer science club.

## Technical Expertise

Ray’s technical toolkit includes:

- Backend Systems: Node.js, Golang, Python, Prisma, PostgreSQL, AWS.
- Frontend Frameworks: Next.js, React, Express.js.
- Data Handling: SQL, Python, large-scale data pipelines.
- Cloud & DevOps: Docker, Kubernetes, GCP, microservices.
- Security & Compliance: DMCA, GDPR, and CCPA tools.

His ability to adapt these skills to solve diverse problems has made him a sought-after engineer for
projects requiring innovation, scalability, and reliability.

## Recognition and Impact

Ray’s achievements have been recognized through awards such as:

- The Blacksmith Award
- National Merit Commended Scholar
- IB Computer Science Student of the Year

In addition, his interdisciplinary publications, including “Predicting Future Changes in Publicly
Traded Stocks” and “Technology, Media, and the Spread of Anti-Intellectualism During the COVID-19
Pandemic,” underscore his commitment to research and academic excellence.

## Vision and Future Aspirations

Ray is driven by a vision of leveraging technology to address pressing global challenges, from
misinformation to cybersecurity. He seeks opportunities to work with innovative teams where he can
combine his technical expertise and research acumen to build transformative solutions. Whether scaling
startups, contributing to academic breakthroughs, or designing equitable technologies, Ray is
committed to making a meaningful impact on the future of tech and society.

For inquiries or collaboration opportunities, connect with him at rayhan@purdue.edu or via LinkedIn.

## Blog Posts

${entries.map(({ body }) => {
  return `==========\n${body}\n==========\n\n`;
})}
`.trim();

export const GET: APIRoute = () => {
  return new Response(llmsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
