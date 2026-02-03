import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-4 py-6 sm:py-8 text-center border-b border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm"
      >
        <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Bridge Gap
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Connecting seniors with caring volunteers
        </p>
      </motion.header>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20"
      >
        {/* Intro Section */}
        <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your Role
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Select how you'd like to get started with Bridge Gap
          </p>
        </motion.div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Senior Card */}
          <motion.div variants={itemVariants}>
            <Link
              href="/tutorial"
              className="group h-full block relative overflow-hidden rounded-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative h-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-8 sm:p-10 flex flex-col justify-between group-hover:border-amber-400 dark:group-hover:border-amber-700 transition-all duration-300">
                <div>
                  <div className="text-6xl sm:text-7xl mb-6 block">👴</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                    I'm a Senior
                  </h3>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    Get help and support from caring volunteers. Learn how to stay safe online and in your daily life.
                  </p>
                </div>
                <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold group-hover:shadow-lg transition-all duration-300 group-hover:from-amber-600 group-hover:to-orange-600">
                  Start Tutorial
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Buddy Card */}
          <motion.div variants={itemVariants}>
            <Link
              href="/login?role=buddy"
              className="group h-full block relative overflow-hidden rounded-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-8 sm:p-10 flex flex-col justify-between group-hover:border-blue-400 dark:group-hover:border-blue-700 transition-all duration-300">
                <div>
                  <div className="text-6xl sm:text-7xl mb-6 block">🤝</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    I'm a Volunteer
                  </h3>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    Make a difference by helping seniors stay connected and safe. Build meaningful relationships while making an impact.
                  </p>
                </div>
                <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold group-hover:shadow-lg transition-all duration-300 group-hover:from-blue-600 group-hover:to-purple-600">
                  Sign In
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div variants={itemVariants} className="mt-16 sm:mt-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: "🔐",
                title: "Safe & Secure",
                desc: "Verified volunteers and protected personal information",
              },
              {
                icon: "📞",
                title: "Easy Connection",
                desc: "Simple one-click calling and messaging features",
              },
              {
                icon: "🎯",
                title: "Real Support",
                desc: "Meaningful interactions that make a real difference",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center p-6 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3 block">{feature.icon}</div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
