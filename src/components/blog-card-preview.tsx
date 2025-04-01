import { headingFont } from "@/lib/constants/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function BlogCardPreview({ post }:{ post: any}) {
    const { categories } = post;
    return (
        <Link href={`/blogs/${post.slug}`} >
            <article className="bg-white/5 p-6 rounded-lg h-full flex flex-col">
                <div className="text-sm text-gray-300 mb-2">
                { categories.map((i:any) => {
                    return i.category + " ";
                })}
                </div>
                <h3 className={cn(headingFont.className, "text-xl font-semibold text-white mb-3")}>
                { post.title }
                </h3>
                <p className="text-gray-300 flex-grow">
                { post.preview }
                </p>
                <p className={cn(headingFont.className, "uppercase text-sm text-secondary-accent text-end mt-4")}>{ post.author.name }</p>
            </article>
        </Link>
    )
}