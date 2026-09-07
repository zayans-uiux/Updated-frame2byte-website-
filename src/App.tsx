import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Component, ErrorInfo, ReactNode } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import VideoPreloader from './components/VideoPreloader';
import Home from './pages/Home';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import PlansPage from './pages/PlansPage';
import ClippingPage from './pages/ClippingPage';
import FrameAiPage from './pages/FrameAiPage';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Critical App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center p-10 text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold mb-4 text-[#FF6A00]">System Error</h1>
            <p className="text-white/60 mb-6">The application encountered an unexpected error.</p>
            <pre className="bg-black/50 p-4 rounded-lg text-xs text-left mb-8 overflow-auto max-h-40 border border-white/10">
              {this.state.error?.message}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-[#FF6A00] rounded-xl font-bold"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <CurrencyProvider>
        <VideoPreloader />
        <Router>
          <ScrollToTop />
          <CustomCursor />
          <div className="min-h-screen bg-[#0B0B0B] text-white selection:bg-[#FF6A00]/30">
            <Navbar />
            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/works" element={<PortfolioPage />} />
                <Route path="/clipping" element={<ClippingPage />} />
                <Route path="/frameai" element={<FrameAiPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <BottomNav />
            <Footer />
          </div>
        </Router>
      </CurrencyProvider>
    </ErrorBoundary>
  );
}
