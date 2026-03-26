// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Services from './components/Services';
import MobileWebDevelopment from "./components/MobileWebDevelopment";
import UIUXDesign from './components/UIUXDesign';
import DigitalMarketing from './components/DigitalMarketing';
import VideoEditing from './components/VideoEditing';
import LogoDesign from './components/LogoDesign';
import InstagramPost from './components/InstagramPost';
import SEO from './components/SEO';
import GoogleAdAndAnalytics from './components/GoogleAdAndAnalytics';
import CloudSolutions from './components/CloudSolutions';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />

          {/* The two specific routes you requested */}
          <Route path="/mobile-web-development" element={<MobileWebDevelopment />} />
          {/* <Route path="/ui-ux-design" element={<UIUXDesign />} /> */}
          
            {/* ✅ New Digital Marketing route */}
        <Route path="/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/video-editing" element={<VideoEditing />} />
        <Route path="/logo-design" element={<LogoDesign />} />
        <Route path="/instagram-post" element={<InstagramPost />} />
        <Route path="/seo-optimization" element={<SEO />} />
        <Route path="/google-ads" element={<GoogleAdAndAnalytics />} />
        <Route path="/ui-ux-design" element={<UIUXDesign />} />
        <Route path="/cloud-solutions" element={<CloudSolutions />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;