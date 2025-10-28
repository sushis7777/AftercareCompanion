import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, CheckCircle, AlertCircle, Calendar, Book, Smile, Activity, Phone, TrendingUp } from "lucide-react";

/*
  CAREApp - Vite + React + Tailwind version
  - Includes subtle Framer Motion animations:
    * Page/tab transitions (fade + slide)
    * Card entrance (slight scale + fade)
    * Modal fade + scale
  Comments show where to tweak durations/easing.
*/

const CAREApp = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProcedure, setSelectedProcedure] = useState("rhinoplasty");
  const [daysPostOp, setDaysPostOp] = useState(5);
  const [showSymptomChecker, setShowSymptomChecker] = useState(false);

  const procedures = {
    rhinoplasty: {
      name: "Rhinoplasty",
      milestones: [
        { day: 1, title: "Surgery Day", status: "complete", description: "Rest, ice, elevation. Expect significant swelling and discomfort." },
        { day: 3, title: "Peak Swelling", status: "complete", description: "Swelling and bruising peak. This is normal and temporary." },
        { day: 7, title: "Cast/Splint Removal", status: "current", description: "First follow-up visit. External splint removed." },
        { day: 14, title: "Return to Light Activity", status: "upcoming", description: "Most bruising resolved. Can return to desk work." },
        { day: 30, title: "Resume Normal Activities", status: "upcoming", description: "Most visible swelling gone. Resume exercise gradually." },
        { day: 90, title: "3-Month Check", status: "upcoming", description: "80% of swelling resolved. Results becoming clear." },
        { day: 365, title: "Final Results", status: "upcoming", description: "Complete healing. Final shape visible." }
      ]
    },
    breastAugmentation: {
      name: "Breast Augmentation",
      milestones: [
        { day: 1, title: "Surgery Day", status: "complete", description: "Surgical bra worn. Expect tightness and discomfort." },
        { day: 3, title: "Reduced Pain", status: "complete", description: "Pain decreasing. Follow dressing change instructions." },
        { day: 7, title: "First Follow-up", status: "current", description: "Sutures may be removed. Can shower normally." },
        { day: 14, title: "Light Activities", status: "upcoming", description: "Return to work (non-strenuous). Implants settling." },
        { day: 42, title: "Resume Exercise", status: "upcoming", description: "Gradually return to full activities. Breasts softening." },
        { day: 90, title: "3-Month Results", status: "upcoming", description: "Implants settled. Shape stabilized." },
        { day: 180, title: "Final Results", status: "upcoming", description: "Complete healing. Final breast shape achieved." }
      ]
    },
    liposuction: {
      name: "Liposuction",
      milestones: [
        { day: 1, title: "Surgery Day", status: "complete", description: "Compression garment worn. Expect swelling and bruising." },
        { day: 3, title: "Drainage Subsiding", status: "complete", description: "Fluid drainage decreasing. Continue compression." },
        { day: 7, title: "Bruising Peak", status: "current", description: "Bruising most visible. Will improve rapidly now." },
        { day: 14, title: "Return to Work", status: "upcoming", description: "Most discomfort resolved. Continue wearing garment." },
        { day: 30, title: "Exercise Resumption", status: "upcoming", description: "Gradual return to full activities. Swelling decreasing." },
        { day: 90, title: "Results Visible", status: "upcoming", description: "Most swelling gone. Contours becoming clear." },
        { day: 180, title: "Final Contour", status: "upcoming", description: "Complete healing. Final body contour achieved." }
      ]
    }
  };

  const currentMilestones = procedures[selectedProcedure].milestones;

  const updateMilestoneStatus = (milestone) => {
    if (milestone.day < daysPostOp) return "complete";
    if (milestone.day === daysPostOp || (milestone.day >= daysPostOp && milestone.day <= daysPostOp + 2)) return "current";
    return "upcoming";
  };

  const educationalTopics = [
    { title: "Managing Swelling & Bruising", icon: "🧊", content: "Learn techniques to minimize swelling and accelerate healing." },
    { title: "Pain Management", icon: "💊", content: "Safe strategies for managing postoperative discomfort." },
    { title: "Scar Care Guide", icon: "✨", content: "Evidence-based scar management techniques for optimal results." },
    { title: "Psychological Adjustment", icon: "🧘", content: "Normal emotional responses and coping strategies." },
    { title: "Activity Guidelines", icon: "🏃", content: "When and how to safely resume daily activities." },
    { title: "Nutrition for Healing", icon: "🥗", content: "Foods and supplements that support recovery." }
  ];

  const warningSymptoms = [
    { symptom: "Fever over 101°F (38.3°C)", urgency: "high" },
    { symptom: "Excessive bleeding or sudden swelling", urgency: "high" },
    { symptom: "Severe pain not relieved by medication", urgency: "high" },
    { symptom: "Signs of infection (redness, warmth, pus)", urgency: "high" },
    { symptom: "Chest pain or shortness of breath", urgency: "emergency" },
    { symptom: "Leg pain or swelling (one side)", urgency: "emergency" },
  ];

  const wellnessActivities = [
    { activity: "Meditation (10 min)", completed: true },
    { activity: "Wound care completed", completed: true },
    { activity: "Medications taken", completed: true },
    { activity: "Hydration goal (8 glasses)", completed: false },
    { activity: "Gentle walk (15 min)", completed: false },
    { activity: "Sleep 7+ hours", completed: true }
  ];

  // animation variants (centralized so you can tweak timings)
  const pageVariant = {
    hidden: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.32 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.24 } }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 8, scale: 0.995 },
    enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.36 } }
  };

  const modalBackdrop = {
    hidden: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.18 } },
    exit: { opacity: 0, transition: { duration: 0.12 } }
  };

  const modalBox = {
    hidden: { opacity: 0, scale: 0.98 },
    enter: { opacity: 1, scale: 1, transition: { duration: 0.28 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.12 } }
  };

  const renderHome = () => (
    <motion.div key="home" variants={pageVariant} initial="hidden" animate="enter" exit="exit">
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome Back! 👋</h1>
          <p className="text-purple-100">Day {daysPostOp} of your recovery journey</p>
          <div className="mt-4 bg-white/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Recovery Progress</span>
              <span className="text-sm font-semibold">{Math.round((daysPostOp / 90) * 100)}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${Math.min((daysPostOp / 90) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <motion.div variants={cardVariant} className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-purple-500">
          <div className="flex items-start space-x-3">
            <div className="bg-purple-100 rounded-full p-2">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">Today's Focus</h3>
              {currentMilestones
                .filter((m) => updateMilestoneStatus(m) === "current")
                .map((milestone, idx) => (
                  <div key={idx}>
                    <p className="text-purple-600 font-medium">{milestone.title}</p>
                    <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={cardVariant} className="grid grid-cols-2 gap-4">
          <button onClick={() => setShowSymptomChecker(true)} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow">
            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <p className="font-medium text-gray-800 text-sm text-center">Symptom Checker</p>
          </button>

          <button onClick={() => setActiveTab("psychology")} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto">
              <Smile className="w-6 h-6 text-blue-600" />
            </div>
            <p className="font-medium text-gray-800 text-sm text-center">Mood Check-in</p>
          </button>

          <button onClick={() => setActiveTab("education")} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto">
              <Book className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-medium text-gray-800 text-sm text-center">Learn</p>
          </button>

          <button className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow">
            <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto">
              <Phone className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="font-medium text-gray-800 text-sm text-center">Contact Team</p>
          </button>
        </motion.div>

        <motion.div variants={cardVariant} className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-purple-600" />
            Today's Wellness Tasks
          </h3>
          <div className="space-y-3">
            {wellnessActivities.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  item.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                }`}>
                  {item.completed && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <span className={`text-sm ${item.completed ? "text-gray-500 line-through" : "text-gray-700"}`}>
                  {item.activity}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderTimeline = () => (
    <motion.div key="timeline" variants={pageVariant} initial="hidden" animate="enter" exit="exit" className="p-6 space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Recovery Timeline</h2>
        <p className="text-gray-600">Track your healing milestones</p>

        <select value={selectedProcedure} onChange={(e) => setSelectedProcedure(e.target.value)} className="mt-4 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
          <option value="rhinoplasty">Rhinoplasty</option>
          <option value="breastAugmentation">Breast Augmentation</option>
          <option value="liposuction">Liposuction</option>
        </select>

        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Day Post-Op: {daysPostOp}</label>
          <input type="range" min="1" max="365" value={daysPostOp} onChange={(e) => setDaysPostOp(parseInt(e.target.value))} className="w-full" />
        </div>
      </div>

      <div className="space-y-4">
        {currentMilestones.map((milestone, idx) => {
          const status = updateMilestoneStatus(milestone);
          return (
            <motion.div key={idx} variants={cardVariant} className="relative">
              {idx < currentMilestones.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200" />}
              <div className={`bg-white rounded-xl shadow p-5 border-l-4 ${status === "complete" ? "border-green-500" : status === "current" ? "border-purple-500" : "border-gray-300"}`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${status === "complete" ? "bg-green-100" : status === "current" ? "bg-purple-100" : "bg-gray-100"}`}>
                    {status === "complete" ? <CheckCircle className="w-6 h-6 text-green-600" /> : status === "current" ? <Activity className="w-6 h-6 text-purple-600 animate-pulse" /> : <Calendar className="w-6 h-6 text-gray-400" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800">{milestone.title}</h3>
                      <span className="text-sm text-gray-500">Day {milestone.day}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                    {status === "current" && <div className="mt-2 px-3 py-1 bg-purple-50 rounded-full text-purple-600 text-xs font-medium inline-block">Current Phase</div>}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  const renderEducation = () => (
    <motion.div key="education" variants={pageVariant} initial="hidden" animate="enter" exit="exit" className="p-6 space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Education Center</h2>
        <p className="text-gray-600">Evidence-based guidance for your recovery</p>
      </div>

      <div className="grid gap-4">
        {educationalTopics.map((topic, idx) => (
          <motion.div key={idx} variants={cardVariant} className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{topic.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{topic.title}</h3>
                <p className="text-gray-600 text-sm">{topic.content}</p>
                <button className="mt-3 text-purple-600 text-sm font-medium hover:text-purple-700">Read More →</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={cardVariant} className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white mt-6">
        <h3 className="font-semibold mb-2">📹 Video Library</h3>
        <p className="text-purple-100 text-sm mb-4">Watch guided tutorials on wound care, exercises, and recovery techniques</p>
        <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-purple-50">Browse Videos</button>
      </motion.div>
    </motion.div>
  );

  const renderPsychology = () => (
    <motion.div key="psychology" variants={pageVariant} initial="hidden" animate="enter" exit="exit" className="p-6 space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Psychological Support</h2>
        <p className="text-gray-600">Your emotional well-being matters</p>
      </div>

      <motion.div variants={cardVariant} className="bg-white rounded-xl shadow-lg p-5">
        <h3 className="font-semibold text-gray-800 mb-4">How are you feeling today?</h3>
        <div className="grid grid-cols-5 gap-2">
          {["😊", "🙂", "😐", "😟", "😢"].map((emoji, idx) => (
            <button key={idx} className="p-4 text-4xl hover:bg-gray-50 rounded-lg transition-colors">{emoji}</button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={cardVariant} className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-2">🧘 Daily Mindfulness</h3>
        <p className="text-blue-100 text-sm mb-4">5-minute guided meditation for pain and anxiety relief</p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 flex items-center space-x-2">
          <span>▶</span>
          <span>Start Session</span>
        </button>
      </motion.div>

      <motion.div variants={cardVariant} className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="font-semibold text-amber-900 mb-2 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Understanding Postoperative Blues
        </h3>
        <p className="text-amber-800 text-sm mb-3">50-70% of patients experience temporary emotional changes after surgery. This is normal and typically resolves within 1-2 weeks.</p>
        <button className="text-amber-700 text-sm font-medium hover:text-amber-800">Learn More →</button>
      </motion.div>

      <motion.div variants={cardVariant} className="bg-white rounded-xl shadow-lg p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Quick Coping Techniques</h3>
        <div className="space-y-3">
          {[
            { name: "4-7-8 Breathing", duration: "2 min", icon: "🫁" },
            { name: "Body Scan Meditation", duration: "10 min", icon: "✨" },
            { name: "Gratitude Journaling", duration: "5 min", icon: "📝" },
            { name: "Progressive Relaxation", duration: "8 min", icon: "🧘" }
          ].map((technique, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{technique.icon}</span>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{technique.name}</p>
                  <p className="text-gray-500 text-xs">{technique.duration}</p>
                </div>
              </div>
              <span className="text-purple-600">→</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={cardVariant} className="bg-red-50 border border-red-200 rounded-xl p-5">
        <h3 className="font-semibold text-red-900 mb-2">When to Seek Professional Help</h3>
        <ul className="text-red-800 text-sm space-y-1">
          <li>• Severe depression lasting &gt;2 weeks</li>
          <li>• Suicidal thoughts</li>
          <li>• Panic attacks</li>
          <li>• Inability to care for yourself</li>
        </ul>
        <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 w-full">Get Support Now</button>
      </motion.div>
    </motion.div>
  );

  const renderSymptomChecker = () => (
    <AnimatePresence>
      {showSymptomChecker && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          variants={modalBackdrop}
          initial="hidden"
          animate="enter"
          exit="exit"
        >
          <motion.div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" variants={modalBox} initial="hidden" animate="enter" exit="exit">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Symptom Checker</h2>
                <button onClick={() => setShowSymptomChecker(false)} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>

              <p className="text-gray-600 text-sm mb-6">Monitor your symptoms. Contact your surgeon immediately if you experience any warning signs.</p>

              <div className="space-y-3">
                {warningSymptoms.map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border-2 ${item.urgency === "emergency" ? "bg-red-50 border-red-300" : "bg-amber-50 border-amber-300"}`}>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${item.urgency === "emergency" ? "text-red-600" : "text-amber-600"}`} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{item.symptom}</p>
                        {item.urgency === "emergency" && <p className="text-red-600 text-xs font-semibold mt-1">CALL 911 IMMEDIATELY</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Surgeon Now</span>
                </button>
                <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300">Report Normal Symptoms</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen">
      <div className="pb-20">
        <AnimatePresence mode="wait">
          {activeTab === "home" && renderHome()}
          {activeTab === "timeline" && renderTimeline()}
          {activeTab === "education" && renderEducation()}
          {activeTab === "psychology" && renderPsychology()}
        </AnimatePresence>
      </div>

      {renderSymptomChecker()}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="grid grid-cols-4 gap-1 p-2">
          <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "home" ? "text-purple-600 bg-purple-50" : "text-gray-600"}`}>
            <Heart className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button onClick={() => setActiveTab("timeline")} className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "timeline" ? "text-purple-600 bg-purple-50" : "text-gray-600"}`}>
            <TrendingUp className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Timeline</span>
          </button>

          <button onClick={() => setActiveTab("education")} className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "education" ? "text-purple-600 bg-purple-50" : "text-gray-600"}`}>
            <Book className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Learn</span>
          </button>

          <button onClick={() => setActiveTab("psychology")} className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "psychology" ? "text-purple-600 bg-purple-50" : "text-gray-600"}`}>
            <Smile className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CAREApp;
