import type { Metadata } from "next";
import ContactForm from "../../components/forms/ContactForm";
import BackgroundBlobs from "../../components/ui/BackgroundBlobs";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Jeff Hogg for full-stack engineering, DevOps pipelines, and systems architecture consultations.",
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Blobs with reduced opacity for dark theme */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <BackgroundBlobs />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3">
            Contact & inquiries
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            Let&apos;s build together
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
            Have a systems architecture challenge, DevOps pipeline to automate, or custom full-stack application to build? Send a message below.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
