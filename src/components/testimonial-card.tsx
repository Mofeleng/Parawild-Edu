import Image from "next/image";

interface TestimonialProps {
    name: string;
    photo: string;
    testimonial: string;
    profession?: string;
}

export default function TestimonialCard({ name, photo, testimonial, profession }: TestimonialProps) {
    return (
        <div className="bg-white rounded-xl p-8 mx-4 shadow-lg">
            <div className="flex flex-col text-start space-y-4">
                {/* Profile Image */}
                <div className="w-24 h-24 rounded-full overflow-hidden relative">
                    <Image 
                        src={photo}
                        alt={`${name}'s profile picture`}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Name and Profession */}
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                    {profession && (
                        <p className="text-gray-600">{profession}</p>
                    )}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 leading-relaxed">
                    {testimonial}
                </p>
            </div>
        </div>
    );
}