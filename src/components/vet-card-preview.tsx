import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { headingFont } from "@/lib/constants/fonts";
import Image from "next/image";
import Link from "next/link";

interface WorkshopPreviewCardProps {
    title?: string;
    description?: string;
    imageUrl?: string;
    href?: string;
}

export default function WorkshopPreviewCard({workshop}: {workshop:any}) {
    return (
        <Card className="overflow-hidden border-0 bg-white/5 text-white hover:bg-white/10 transition-all">
            <CardHeader className="p-0">
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                        src={workshop.coverPhoto.url}
                        alt="Workshop cover image"
                        fill
                        className="object-cover p-4 object-top"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectPosition: '0 10%' }}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <h3 className={cn(
                    headingFont.className,
                    "text-xl font-semibold mb-3 line-clamp-2"
                )}>
                    {workshop.title}
                </h3>
                <p className="text-gray-300 line-clamp-3">
                    {workshop.preview}
                </p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button
                    asChild
                    variant="secondary"
                    className="w-full text-white hover:text-gray-300"
                >
                    <Link href={`/workshops/view/${workshop.slug}`}>
                        LEARN MORE
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}