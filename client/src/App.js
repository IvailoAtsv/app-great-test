import ImageUpload from "./components/ImageUpload";
import {Hero} from './components/Hero'
import { Navbar } from "./components/Navbar";
import { InfoBlock } from "./components/InfoBlock";
import { Footer } from "./components/Footer";
function App() {
  return (
    <div className="App my-10 flex items-center justify-center flex-col bg-whiteBg">
      <Navbar />
      <Hero />
      <ImageUpload />
      <InfoBlock />
      <Footer />
    </div>
  );
}

export default App;
