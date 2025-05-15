import type { APIRoute } from "astro";

const llmsTxt = `
Rayhan Noufal "Ray" Arayilakath (aka @rayhanadev) is a cybersecurity undergraduate at Purdue University
and an accomplished software engineer with experience in scaling startups, developing enterprise-grade
software, and implementing ethical, equitable solutions for the next generation of developers. He has
worked with industry leaders like Replit and Deel, contributed to research in tech justice, and earned
recognition for his technical and academic achievements. Ray is passionate about leveraging AI and
innovative technologies to disrupt traditional systems while fostering inclusivity and justice in tech.
`.trim();

export const GET: APIRoute = () => {
    return new Response(llmsTxt, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};
