import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Infinity,
  Trophy,
  Clock,
  Zap,
  Layers,
  Github,
  Mail,
  Twitter,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

export default function About() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const faqs = [
    {
      question: "How is the difficulty determined in Infinity Mode?",
      answer:
        "In Infinity Mode, the difficulty increases automatically as you answer questions correctly. After 6 correct answers, the difficulty increases to Medium, and after 12 correct answers, it increases to Hard. If you answer incorrectly, your streak is reset and the difficulty returns to Easy.",
    },
    {
      question: "How are the leaderboard rankings calculated?",
      answer:
        "Leaderboard rankings are based on the highest score achieved in a single session. The score is calculated based on the number of consecutive correct answers. Higher difficulty questions award more points.",
    },
    {
      question: "Can I suggest new categories for the quiz?",
      answer:
        "Yes! We're always looking to expand our question database. You can suggest new categories or report issues with existing questions through the contact form on this page or by reaching out to our team directly.",
    },
    {
      question: "Is there a mobile app version available?",
      answer:
        "Currently, QuizMaster is a web application optimized for both desktop and mobile devices. A dedicated mobile app is in our development roadmap and will be released in the near future.",
    },
    {
      question: "How often are new questions added?",
      answer:
        "Our database is updated regularly with new questions across all categories. We aim to add new question sets weekly to ensure the content stays fresh and challenging for regular players.",
    },
  ];

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      bio: "Full-stack developer with expertise in React and modern web technologies.",
      avatar: "/placeholder.svg?height=120&width=120",
      links: {
        github: "https://github.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "Maria Garcia",
      role: "UI/UX Designer",
      bio: "Designer passionate about creating intuitive and engaging user experiences.",
      avatar: "/placeholder.svg?height=120&width=120",
      links: {
        github: "https://github.com",
        twitter: "https://twitter.com",
      },
    },
    {
      name: "James Wilson",
      role: "Content Creator",
      bio: "Trivia enthusiast responsible for curating and creating challenging questions.",
      avatar: "/placeholder.svg?height=120&width=120",
      links: {
        github: "https://github.com",
        twitter: "https://twitter.com",
      },
    },
  ];

  return (
    <div className="min-h-screen mt-8 bg-gradient-to-b from-slate-900 to-slate-800 text-white pb-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-800 rounded-2xl border border-slate-700 mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-purple-600/10 rounded-2xl"></div>
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Welcome to QuizMaster
              </h1>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Expand your knowledge and challenge yourself with thousands of
                questions across multiple categories and difficulty levels.
                QuizMaster is designed to make learning fun, engaging and
                competitive.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-medium hover:from-amber-600 hover:to-orange-700 transition shadow-lg hover:shadow-amber-500/20"
                >
                  Start Quizzing
                </button>
                <button
                  onClick={() => navigate("/leaderboard")}
                  className="px-6 py-3 bg-slate-700 border border-slate-600 rounded-lg font-medium hover:bg-slate-600 transition"
                >
                  View Leaderboard
                </button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-48 h-48 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-2 bg-slate-800 rounded-full flex items-center justify-center">
                  <Brain className="h-20 w-20 text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Features & Game Modes</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Discover the variety of ways to test your knowledge and challenge
              yourself with QuizMaster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
              <div className="p-3 bg-amber-500/20 rounded-lg w-fit mb-4">
                <Infinity className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Infinity Mode</h3>
              <p className="text-slate-300">
                Keep answering questions as long as you can. The difficulty
                increases as you progress, testing the limits of your knowledge.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
              <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-4">
                <Trophy className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Classic Mode</h3>
              <p className="text-slate-300">
                10 questions, 3 lives. How far can you go? Compete for the
                highest score and climb the leaderboard.
                <span className="text-sm text-purple-400 block mt-2">
                  (Coming Soon)
                </span>
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
              <div className="p-3 bg-emerald-500/20 rounded-lg w-fit mb-4">
                <Layers className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multiple Categories</h3>
              <p className="text-slate-300">
                Choose from a wide range of categories including Science,
                History, Geography, Entertainment, Sports, and more.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
              <div className="p-3 bg-rose-500/20 rounded-lg w-fit mb-4">
                <Zap className="h-6 w-6 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Adaptive Difficulty</h3>
              <p className="text-slate-300">
                As you answer correctly, the questions become harder. Test your
                skills with progressively challenging content.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
              <div className="p-3 bg-sky-500/20 rounded-lg w-fit mb-4">
                <Trophy className="h-6 w-6 text-sky-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Leaderboards</h3>
              <p className="text-slate-300">
                Compete with other players and see your ranking. Filter by
                category, time period, or difficulty level.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
              <div className="p-3 bg-amber-500/20 rounded-lg w-fit mb-4">
                <Clock className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Answer History</h3>
              <p className="text-slate-300">
                Review your recent answers to learn from your mistakes and track
                your progress over time.
              </p>
            </div>
          </div>
        </section>

        {/* How to Play Section */}
        <section className="mb-16 bg-slate-800 rounded-xl p-8 border border-slate-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">How to Play</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Getting started with QuizMaster is easy. Follow these simple steps
              to begin your knowledge journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-amber-400">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Choose a Game Mode</h3>
              <p className="text-slate-300">
                Select between Infinity Mode or Classic Mode (coming soon) based
                on your preference.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-amber-400">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Select a Category</h3>
              <p className="text-slate-300">
                Pick a category that interests you or challenges your knowledge
                in a specific area.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-amber-400">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Answer & Progress</h3>
              <p className="text-slate-300">
                Answer questions correctly to increase your score and
                difficulty. Challenge yourself to beat your high score!
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              The passionate individuals behind QuizMaster who are dedicated to
              creating the best quiz experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-amber-500">
                  <img
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-amber-400 font-medium mb-3">{member.role}</p>
                <p className="text-slate-300 mb-4">{member.bio}</p>
                <div className="flex gap-3 mt-auto">
                  <a
                    href={member.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 transition"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={member.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 transition"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16 bg-slate-800 rounded-xl p-8 border border-slate-700">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Find answers to common questions about QuizMaster and how to use
              the application.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-slate-700/50 hover:bg-slate-700 transition"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="p-4 bg-slate-800 text-slate-300">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Have questions, suggestions, or feedback? We'd love to hear from
              you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-amber-400" />
                  <a
                    href="mailto:contact@quizmaster.com"
                    className="text-slate-300 hover:text-amber-400 transition"
                  >
                    contact@quizmaster.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5 text-amber-400" />
                  <a
                    href="https://twitter.com/quizmaster"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-amber-400 transition"
                  >
                    @quizmaster
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-amber-400" />
                  <a
                    href="https://github.com/quizmaster"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-amber-400 transition"
                  >
                    github.com/quizmaster
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-600/20 to-purple-600/20 rounded-xl p-6 border border-slate-700 flex items-center justify-center text-center">
              <div>
                <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
                <p className="text-slate-300 mb-6">
                  Stay updated with the latest features, updates, and quiz
                  challenges by joining our community.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-medium hover:from-amber-600 hover:to-orange-700 transition flex items-center gap-2 mx-auto">
                  <ExternalLink className="h-4 w-4" />
                  <span>Join Discord Community</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
