import { headingFont } from "@/lib/constants/fonts";
import { cn } from "@/lib/utils";

export default function ContactUsSection() {
    return (
        <section className="py-24">
        <div className="container mx-auto px-4">
          <div>
            <h3 className={cn(headingFont.className, "text-sm uppercase text-secondary-accent text-center mx-auto mb-8")}>Get in Touch</h3>
            <h2 className={cn(headingFont.className, "text-3xl md:text-4xl font-bold text-white text-center mb-16")}>
            We’d love to hear from you. Get in touch with us!
            </h2>
          </div>

        </div>
      </section>
    )
}