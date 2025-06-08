import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.text());

export default function Spotify() {
    const { data, error } = useSWR("/api/spotify", fetcher);

    if (error && import.meta.env.DEV)
        return <p className="text-red-300">Failed to load Spotify status</p>;
    if (error) return null;
    if (!data)
        return (
            <p className="mb-[1px] text-zinc-200 dark:text-zinc-300">
                {"█".repeat(20)} :)
            </p>
        );

    return <p className="text-zinc-500 dark:text-zinc-300">{data} :)</p>;
}
