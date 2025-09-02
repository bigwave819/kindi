import ContactForm from '@/components/user/ContactForm';
import ContactLocations from '@/components/user/ContactLocations';

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full mt-16 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Contact Us</h1>
          <p className="max-w-2xl mx-auto">
            Have questions about our products or services? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        
        {/* Content Container */}
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Contact Form Section */}
          <div className="md:w-1/2 p-8">
            <ContactForm />
          </div>
          
          {/* Locations Section */}
          <div className="md:w-1/2 bg-[#6F4E37] text-amber-50 p-8">
            <ContactLocations />
          </div>
        </div>
      </div>
    </div>
  );
}