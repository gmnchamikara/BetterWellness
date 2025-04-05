"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  HeartIcon,
  DevicePhoneMobileIcon,
  CheckBadgeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const counsellors = [
  {
    name: "Dr. Sarah Johnson",
    specialization: "Anxiety & Stress Management",
    experience: "8 years experience",
    rating: 4.9,
    sessions: 1200,
    image: "https://example.com/counsellor1.jpg",
  },
  {
    name: "Michael Chen",
    specialization: "Relationship Counseling",
    experience: "10 years experience",
    rating: 4.8,
    sessions: 950,
    image: "https://example.com/counsellor2.jpg",
  },
  {
    name: "Emma Williams",
    specialization: "Trauma Recovery",
    experience: "12 years experience",
    rating: 4.95,
    sessions: 1500,
    image: "https://example.com/counsellor3.jpg",
  },
];

const specializations = [
  "All",
  "Anxiety",
  "Depression",
  "Relationships",
  "Trauma",
  "Career",
  "Addiction",
];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Client",
      text: "BetterWellness transformed my life. The convenience and professionalism are unmatched.",
    },
    {
      name: "Dr. Michael Chen",
      role: "Counsellor",
      text: "A fantastic platform to connect with clients and make a real difference.",
    },
    {
      name: "Emma Williams",
      role: "Client",
      text: "The best decision I made for my mental health journey. Highly recommended!",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Sessions Held" },
    { number: "500+", label: "Qualified Professionals" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" },
  ];

const Home: React.FC = () => {
  const [selectedSpecialization, setSelectedSpecialization] =
    React.useState("All");

  // ... (keep existing testimonials and stats arrays)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Updated Header with Better Contrast */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white shadow-sm sticky top-0 z-50"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-shrink-0 flex items-center"
            >
              <HeartIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                BetterWellness
              </span>
            </motion.div>

            {/* Navigation Links Updated for Better Readability */}
            <div className="hidden md:flex items-center space-x-8">
              {["Counsellors", "How It Works", "Testimonials"].map(
                (item, idx) => (
                  <motion.a
                    key={idx}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-700 hover:text-blue-600 font-medium"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item}
                  </motion.a>
                )
              )}
              <div className="flex space-x-4">
                <motion.a
                  href="/signin"
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                  whileHover={{ y: -2 }}
                >
                  Sign In
                </motion.a>
                <motion.a
                  href="/signup"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  whileHover={{ y: -2 }}
                >
                  Sign Up
                </motion.a>
              </div>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Enhanced Hero Section with Soothing Gradient */}
      <main className="flex-grow">
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl leading-tight"
              >
                Find Your Perfect Mental Health Match
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Connect with verified mental health professionals specializing
                in anxiety, depression, relationships, and more. Your healing
                journey starts here.
              </motion.p>

              {/* Enhanced CTA Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
              >
                <motion.a
                  href="/register"
                  className="px-8 py-4 text-white bg-blue-600 rounded-xl hover:bg-blue-700 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserGroupIcon className="h-6 w-6" />
                  Find Your Counsellor
                </motion.a>
                <motion.a
                  href="/counsellor-register"
                  className="px-8 py-4 text-blue-600 bg-white border-2 border-blue-600 rounded-xl hover:bg-blue-50 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckBadgeIcon className="h-6 w-6" />
                  Join as Professional
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* New Counsellor Listing Section */}
        <section id="counsellors" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center text-gray-900 mb-12"
            >
              Meet Our Certified Counsellors
            </motion.h2>

            {/* Specialization Filter */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex flex-wrap gap-4 justify-center mb-16"
            >
              {specializations.map((specialty) => (
                <motion.button
                  key={specialty}
                  onClick={() => setSelectedSpecialization(specialty)}
                  className={`px-6 py-2 rounded-full ${
                    selectedSpecialization === specialty
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {specialty}
                </motion.button>
              ))}
            </motion.div>

            {/* Counsellor Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {counsellors.map((counsellor, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="relative h-48 bg-blue-50">
                    {/* Profile Image */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                      <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                        {/* Replace with actual image */}
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          Avatar
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-16 pb-8 px-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">
                        {counsellor.name}
                      </h3>
                      <CheckBadgeIcon className="h-5 w-5 text-blue-600" />
                    </div>

                    <div className="text-blue-600 font-medium mb-4">
                      {counsellor.specialization}
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-4">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span className="font-medium">{counsellor.rating}</span>
                      <span className="text-gray-500">
                        ({counsellor.sessions} sessions)
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6">
                      {counsellor.experience}
                    </p>

                    <motion.a
                      href="/book-session"
                      className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                      whileHover={{ scale: 1.05 }}
                    >
                      Book Session
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <div className="min-h-screen flex flex-col">
        {/* Animated Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white shadow-sm sticky top-0 z-50"
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-shrink-0 flex items-center"
              >
                <HeartIcon className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  BetterWellness
                </span>
              </motion.div>

              <div className="hidden md:flex items-center space-x-8">
                {["Features", "How It Works", "Testimonials"].map(
                  (item, idx) => (
                    <motion.a
                      key={idx}
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-700 hover:text-blue-600"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item}
                    </motion.a>
                  )
                )}
                <div className="flex space-x-4">
                  <motion.a
                    href="/signin"
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                    whileHover={{ y: -2 }}
                  >
                    Sign In
                  </motion.a>
                  <motion.a
                    href="/signup"
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    whileHover={{ y: -2 }}
                  >
                    Sign Up
                  </motion.a>
                </div>
              </div>
            </div>
          </nav>
        </motion.header>

        {/* Hero Section with Staggered Animations */}
        <main className="flex-grow">
          <div className="relative bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl"
                >
                  Your Journey to Mental Wellness
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
                >
                  Connect with licensed professionals and take control of your
                  mental health with our secure, confidential online counseling
                  platform.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
                >
                  <motion.a
                    href="/register"
                    className="px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started as Client
                  </motion.a>
                  <motion.a
                    href="/counsellor-register"
                    className="px-8 py-3 text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join as Counsellor
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-center text-gray-900 mb-12"
              >
                Why Choose BetterWellness?
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: UserGroupIcon,
                    title: "Qualified Counsellors",
                    description:
                      "Verified professionals with diverse specializations",
                  },
                  {
                    icon: ChatBubbleLeftRightIcon,
                    title: "Secure Messaging",
                    description:
                      "Private and confidential communication platform",
                  },
                  {
                    icon: BookOpenIcon,
                    title: "Flexible Booking",
                    description: "Schedule sessions at your convenience",
                  },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-20 bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-4 gap-8 text-center"
              >
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: idx * 0.1 }}
                  >
                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-lg">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-center text-gray-900 mb-12"
              >
                What Our Community Says
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="p-6 bg-blue-50 rounded-lg"
                  >
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                        {testimonial.name[0]}
                      </div>
                      <div className="ml-4">
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-blue-600">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="text-gray-600">"{testimonial.text}"</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* App Section */}
          <section className="py-20 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex justify-center"
                >
                  <DevicePhoneMobileIcon className="h-64 w-64 text-blue-600" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Available Anytime, Anywhere
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Access your sessions and messages through our
                    mobile-friendly platform or download our dedicated app for
                    iOS and Android.
                  </p>
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-3 bg-gray-900 text-white rounded-lg"
                    >
                      Download for iOS
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-3 bg-gray-900 text-white rounded-lg"
                    >
                      Download for Android
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gray-800 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">BetterWellness</h4>
                <p className="text-gray-400">
                  Empowering mental wellness through accessible, professional
                  counseling services.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {["Features", "How It Works", "Testimonials"].map(
                    (link, idx) => (
                      <motion.li
                        key={idx}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <a
                          href={`#${link.toLowerCase().replace(" ", "-")}`}
                          className="text-gray-400 hover:text-white"
                        >
                          {link}
                        </a>
                      </motion.li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  {["Privacy Policy", "Terms of Service"].map((link, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <a
                        href={`/${link.toLowerCase().replace(" ", "-")}`}
                        className="text-gray-400 hover:text-white"
                      >
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400"
            >
              <p>
                &copy; {new Date().getFullYear()} BetterWellness. All rights
                reserved.
              </p>
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Home;






