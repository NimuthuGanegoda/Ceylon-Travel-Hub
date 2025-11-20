'use client';

import Section from '@/components/Section';
import { siteData, vehicles, testimonials, services } from '@/data/siteData';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-[980px] mx-auto text-center px-5 py-32 fade-in">
          <h1 className="apple-headline mb-5">
            {siteData.tagline}
          </h1>
          <p className="apple-subheadline mb-10 max-w-2xl mx-auto fade-in-delay-1">
            {siteData.description}
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 mb-10 fade-in-delay-2">
            {siteData.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 bg-gray-100/80 dark:bg-white/10 text-[13px] font-normal rounded-full text-gray-700 dark:text-gray-300 backdrop-blur-sm"
              >
                {feature}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 fade-in-delay-3">
            <a href="#book" className="btn-primary">
              Book Now
            </a>
            <a href="#vehicles" className="btn-secondary">
              View Vehicles
            </a>
          </div>
        </div>
      </section>

      {/* Vehicles Section */}
      <Section title="Our Vehicles" id="vehicles">
        <div className="grid md:grid-cols-2 gap-6 max-w-[980px] mx-auto">
          {vehicles.map((vehicle, idx) => (
            <div key={vehicle.id} className={`card fade-in-delay-${idx + 1}`}>
              <div className="aspect-[16/10] relative overflow-hidden rounded-2xl mb-6 bg-gray-100 dark:bg-gray-800">
                <img
                  src={vehicle.thumbImage}
                  alt={vehicle.name}
                  className="object-cover w-full h-full hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>
              <h3 className="text-[28px] font-semibold mb-1.5 text-gray-900 dark:text-white tracking-tight">
                {vehicle.name}
              </h3>
              <p className="text-[14px] font-normal text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-5">
                {vehicle.segment}
              </p>
              <div className="space-y-2.5 mb-6">
                {vehicle.keyFeatures.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-[15px] text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 text-[#0071e3]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
              {vehicle.status === 'available' ? (
                <a href="#book" className="btn-primary w-full justify-center">
                  Book {vehicle.name.split(' ')[0]}
                </a>
              ) : (
                <span className="block text-center text-[14px] text-gray-500 dark:text-gray-400 py-3.5 bg-gray-50 dark:bg-white/5 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Features Section */}
      <Section title="Features & Seating Reality" id="features" className="bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-[800px] mx-auto">
          <p className="text-[19px] font-normal leading-relaxed text-gray-600 dark:text-gray-400 mb-12 text-center">
            Comfort configuration: driver + 4 passengers (4 adults + 1 child in booster/child seat). 
            When a driver or driver‑guide is selected, the usable passenger seats are 4 adults + 1 child; 
            driver occupies the front seat.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Powertrain: 1.4 TFSI turbo petrol with 7‑speed S tronic (FWD)',
              'Lighting: LED daytime running lights; LED headlights (trim dependent)',
              'Cabin tech: Audi Virtual Cockpit, MMI 7" display, Bluetooth',
              'Safety: 6 airbags, ABS, ESC, ISOFIX child‑seat mounts',
              'Assists: rear parking sensors; cruise control',
              'Practicality: approx. 405 L boot (rear seats up)',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 p-5 bg-white dark:bg-[#1d1d1f] rounded-2xl hover:shadow-md transition-shadow">
                <svg className="w-5 h-5 text-[#0071e3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[15px] text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section title="Tours & Services" id="tours">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[980px] mx-auto">
          {services.map((service) => (
            <div key={service.id} className="card text-center group">
              <div className="text-[56px] mb-5 transition-transform group-hover:scale-110 duration-300">{service.icon}</div>
              <h3 className="text-[21px] font-semibold mb-2.5 text-gray-900 dark:text-white tracking-tight">
                {service.title}
              </h3>
              <p className="text-[15px] font-normal text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                {service.description}
              </p>
              <a href="#book" className="btn-secondary w-full justify-center text-[14px]">
                Choose {service.title}
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing Section */}
      <Section title="Simple Pricing" id="pricing" className="bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="grid md:grid-cols-3 gap-6 max-w-[980px] mx-auto">
          {[
            { title: 'Daily', price: '$75', unit: '/day', features: ['200 km/day included', 'Additional km: $0.30/km', 'Basic insurance included'] },
            { title: 'Weekend', price: '$200', unit: '/Fri–Sun', features: ['600 km included', 'Flexible pickup times', 'Basic insurance included'] },
            { title: 'Weekly', price: '$450', unit: '/week', features: ['Unlimited km', 'Best value', 'Basic insurance included'], featured: true },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`card ${
                plan.featured ? 'ring-2 ring-[#0071e3] dark:ring-[#0071e3] scale-105' : ''
              }`}
            >
              <h3 className="text-[28px] font-semibold mb-5 text-gray-900 dark:text-white tracking-tight">{plan.title}</h3>
              <div className="mb-8">
                <span className="text-[56px] font-semibold text-gray-900 dark:text-white tracking-tighter">{plan.price}</span>
                <span className="text-[17px] text-gray-600 dark:text-gray-400 ml-1">{plan.unit}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[15px] text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 text-[#0071e3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#book" className={plan.featured ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}>
                Choose {plan.title}
              </a>
            </div>
          ))}
        </div>
        <p className="text-[14px] text-gray-600 dark:text-gray-400 text-center mt-10 max-w-2xl mx-auto leading-relaxed">
          Security deposit and ID required. Fuel and tolls not included. Prices are placeholders — update to your rates.
        </p>
      </Section>

      {/* Gallery Section */}
      <Section title="Gallery" id="gallery">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-[980px] mx-auto">
          {[
            'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517940310602-1152b9f2c055?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=600&auto=format&fit=crop',
          ].map((src, idx) => (
            <div key={idx} className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
              <img
                src={src}
                alt={`Gallery image ${idx + 1}`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section title="Testimonials" id="testimonials" className="bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="grid md:grid-cols-3 gap-6 max-w-[980px] mx-auto">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="card">
              <div className="flex items-start gap-3.5 mb-5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0071e3] to-[#00a0ff] flex items-center justify-center text-white text-[17px] font-semibold flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[17px] text-gray-900 dark:text-white truncate">{testimonial.name}</h4>
                  <p className="text-[13px] text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    {testimonial.country}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
                {testimonial.message}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Booking Section */}
      <Section title="Book Your Dates" id="book">
        <div className="max-w-[640px] mx-auto">
          <form className="card space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                  placeholder="jane@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                  Phone/WhatsApp
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                  placeholder="+1 555 123 4567"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                  Pickup Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                  Return Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                  Service Type
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all">
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                Notes
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Anything we should know?"
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center text-[15px] py-3.5">
              Request Booking
            </button>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 text-center">
              We'll confirm availability and final price by email/WhatsApp.
            </p>
          </form>
        </div>
      </Section>

      {/* Map Section */}
      <Section title="Service Area — Sri Lanka" id="map" className="bg-gray-50/50 dark:bg-[#0a0a0a]">
        <div className="max-w-[800px] mx-auto">
          <div className="aspect-video rounded-3xl overflow-hidden border border-gray-200/50 dark:border-white/10">
            <iframe
              title="Sri Lanka map"
              src="https://www.google.com/maps?q=Sri+Lanka&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section title="Contact" id="contact">
        <div className="max-w-[640px] mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <a
              href={`tel:${siteData.contact.phone}`}
              className="card text-center group"
            >
              <div className="text-[40px] mb-3 transition-transform group-hover:scale-110 duration-300">📞</div>
              <p className="text-[15px] font-normal text-gray-900 dark:text-white">
                {siteData.contact.phone}
              </p>
            </a>
            <a
              href={`https://wa.me/${siteData.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card text-center group"
            >
              <div className="text-[40px] mb-3 transition-transform group-hover:scale-110 duration-300">💬</div>
              <p className="text-[15px] font-normal text-gray-900 dark:text-white">
                WhatsApp Chat
              </p>
            </a>
            <a
              href={`mailto:${siteData.contact.email}`}
              className="card text-center group"
            >
              <div className="text-[40px] mb-3 transition-transform group-hover:scale-110 duration-300">✉️</div>
              <p className="text-[15px] font-normal text-gray-900 dark:text-white break-all">
                {siteData.contact.email}
              </p>
            </a>
          </div>
          <form className="card space-y-5">
            <div>
              <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-[13px] font-normal mb-2 text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1d1d1f] text-gray-900 dark:text-white text-[15px] focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all resize-none"
                placeholder="How can we help?"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center text-[15px] py-3.5">
              Send Message
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}
