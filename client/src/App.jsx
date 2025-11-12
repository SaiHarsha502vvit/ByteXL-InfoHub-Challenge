import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";
import HelpDesk from "./components/HelpDesk";

const TAB_CONFIG = [
  {
    id: "Weather",
    icon: "🌤️",
    label: "Weather",
    description: "Get real-time weather insights",
    component: WeatherModule,
  },
  {
    id: "Currency",
    icon: "💱",
    label: "Currency",
    description: "Convert INR to USD & EUR",
    component: CurrencyConverter,
  },
  {
    id: "Quote",
    icon: "💡",
    label: "Quotes",
    description: "Fuel your day with inspiration",
    component: QuoteGenerator,
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("HelpDesk");

  const ActiveModule = useMemo(
    () => TAB_CONFIG.find((tab) => tab.id === activeTab)?.component ?? HelpDesk,
    [activeTab]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌟 InfoHub</h1>
        <p>Your Daily Information Portal</p>
      </header>

      <nav className="navigation" aria-label="InfoHub modules">
        <div className="navigation-tabs" role="tablist">
          {TAB_CONFIG.map(({ id, icon, label, description }) => {
            const isActive = id === activeTab;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${id.toLowerCase()}-panel`}
                className={`nav-button ${isActive ? "active" : ""}`}
                onClick={() => setActiveTab(id)}
              >
                <span className="nav-icon" aria-hidden="true">
                  {icon}
                </span>
                <span className="nav-label">{label}</span>
                <span className="nav-description">{description}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="module-container" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={activeTab}
            id={`${activeTab.toLowerCase()}-panel`}
            aria-label={`${activeTab} panel`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <ActiveModule />
          </motion.section>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
