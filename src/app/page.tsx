'use client';

import Section from '@/components/Section';
import { siteData, vehicles, testimonials, services } from '@/data/siteData';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-5xl mx-auto text-center px-6 py-20">
          <h1 className="apple-headline mb-6 text-gray-900 dark:text-white">
            {siteData.tagline}
          </h1>
          <p className="apple-subheadline mb-8">
            {siteData.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {siteData.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm font-semibold rounded-full text-gray-700 dark:text-gray-300"
              >
                {feature}
              </span>
            ))}
          </div>
          <a href="#book" className="btn-primary">
            Book Now
          </a>
        </div>
      </section>

      {/* Vehicles Section */}
      <Section title="Our Vehicles" id="vehicles">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="card group hover:border-brand dark:hover:border-brand-light transition-colors">
              <div className="aspect-video relative overflow-hidden rounded-xl mb-4">
                <img
                  src={vehicle.thumbImage}
                  alt={vehicle.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {vehicle.name}
              </h3>
              <p className="text-sm font-semibold text-brand dark:text-brand-light uppercase tracking-wide mb-3">
                {vehicle.segment}
              </p>
              <div className="space-y-2 mb-4">
                {vehicle.keyFeatures.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-brand">●</span>
                    {feature}
                  </div>
                ))}
              </div>
              {vehicle.status === 'available' ? (
                <a href="#book" className="btn-secondary w-full text-center">
                  Book {vehicle.name.split(' ')[0]}
                </a>
              ) : (
                <span className="block text-center text-sm text-gray-500 dark:text-gray-400 py-3">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Features Section */}
      <Section title="Features & Seating Reality" id="features" className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
            Comfort configuration: driver + 4 passengers (4 adults + 1 child in booster/child seat). 
            When a driver or driver‑guide is selected, the usable passenger seats are 4 adults + 1 child; 
            driver occupies the front seat.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Powertrain: 1.4 TFSI turbo petrol with 7‑speed S tronic (FWD)',
              'Lighting: LED daytime running lights; LED headlights (trim dependent)',
              'Cabin tech: Audi Virtual Cockpit, MMI 7" display, Bluetooth',
              'Safety: 6 airbags, ABS, ESC, ISOFIX child‑seat mounts',
              'Assists: rear parking sensors; cruise control',
              'Practicality: approx. 405 L boot (rear seats up)',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl">
                <span className="text-brand text-xl">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section title="Tours & Services" id="tours">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="card text-center hover:border-brand dark:hover:border-brand-light transition-colors">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {service.description}
              </p>
              <a href="#book" className="btn-secondary w-full text-center">
                Choose {service.title}
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing Section */}
      <Section title="Simple Pricing" id="pricing" className="bg-gray-50 dark:bg-gray-900">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: 'Daily', price: '$75', unit: '/day', features: ['200 km/day included', 'Additional km: $0.30/km', 'Basic insurance included'] },
            { title: 'Weekend', price: '$200', unit: '/Fri–Sun', features: ['600 km included', 'Flexible pickup times', 'Basic insurance included'] },
            { title: 'Weekly', price: '$450', unit: '/week', features: ['Unlimited km', 'Best value', 'Basic insurance included'], featured: true },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`card ${
                plan.featured ? 'ring-2 ring-brand dark:ring-brand-light' : ''
              } hover:shadow-xl transition-all`}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{plan.title}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-brand dark:text-brand-light">{plan.price}</span>
                <span className="text-gray-600 dark:text-gray-400">{plan.unit}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-brand">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#book" className="btn-secondary w-full text-center">
                Choose {plan.title}
              </a>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-8 max-w-3xl mx-auto">
          Security deposit and ID required. Fuel and tolls not included. Prices are placeholders — update to your rates.
        </p>
      </Section>

      {/* Gallery Section */}
      <Section title="Gallery" id="gallery">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517940310602-1152b9f2c055?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=600&auto=format&fit=crop',
          ].map((src, idx) => (
            <div key={idx} className="aspect-video relative overflow-hidden rounded-xl group">
              <img
                src={src}
                alt={`Gallery image ${idx + 1}`}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section title="Testimonials" id="testimonials" className="bg-gray-50 dark:bg-gray-900">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="card">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {testimonial.country}
                  </p>
                </div>
              </div>
              <div className="flex mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {testimonial.message}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Booking Section */}
      <Section title="Book Your Dates" id="book">
        <div className="max-w-2xl mx-auto">
          <form className="card space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand-light outline-none"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand-light outline-none"
                  placeholder="jane@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Phone/WhatsApp
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand-light outline-none"
                  placeholder="+1 555 123 4567"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Pickup Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand-light outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Return Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand-light outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Service Type
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand-light outline-none">
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Notes
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand-light outline-none"
                placeholder="Anything we should know?"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Request Booking
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              We'll confirm availability and final price by email/WhatsApp.
            </p>
          </form>
        </div>
      </Section>

      {/* Map Section */}
      <Section title="Service Area — Sri Lanka" id="map" className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
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
        <div className="max-w-2xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a
              href={`tel:${siteData.contact.phone}`}
              className="card text-center hover:border-brand dark:hover:border-brand-light transition-colors group"
            >
              <div className="text-4xl mb-3">📞</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand dark:group-hover:text-brand-light">
                {siteData.contact.phone}
              </p>
            </a>
            <a
              href={`https://wa.me/${siteData.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card text-center hover:border-brand dark:hover:border-brand-light transition-colors group"
            >
              <div className="text-4xl mb-3">💬</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand dark:group-hover:text-brand-light">
                WhatsApp Chat
              </p>
            </a>
            <a
              href={`mailto:${siteData.contact.email}`}
              className="card text-center hover:border-brand dark:hover:border-brand-light transition-colors group"
            >
              <div className="text-4xl mb-3">✉️</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand dark:group-hover:text-brand-light">
                {siteData.contact.email}
              </p>
            </a>
          </div>
          <form className="card space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand-light outline-none"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand-light outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand-light outline-none"
                placeholder="How can we help?"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}
