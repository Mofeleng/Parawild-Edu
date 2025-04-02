import Image from "next/image"
import { buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { headingFont } from "@/lib/constants/fonts";
import convertDateToString from "@/lib/actions/convertDateToString";

export default function BlogPreview({ post }: { post: any}) {
    const { categories } = post;

    return (
        <article className="bg-white/5 rounded-lg overflow-hidden flex flex-col h-full">
            <div className="relative h-48">
              <Image
                src={post.cover.url}
                alt="Blog post cover image"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-sm text-gray-300 mb-2">
              { categories.map((category:any) => {
                return (
                category.category + " "
                )
            })}
              </div>
              <h3 className={cn(headingFont.className, "text-xl font-semibold text-white mb-3")}>
                {post.title}
              </h3>
              <p className="text-gray-300 mb-4 flex-grow">
                { post.preview }
              </p>
              <div className="mt-auto">
                <p className={cn(headingFont.className,"uppercase text-sm text-secondary-accent text-end mt-4")}>
                  By { post.author.name } on { convertDateToString(post.published, true)}
                </p>
                <Link
                  href={`/blogs/${post.slug}`}
                  className={cn(buttonVariants({
                      variant: 'link'
                  }),"text-white hover:text-gray-300 transition-colors")}
                  aria-label="Read more about wildlife tracking techniques"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </article>
    )
}