import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Journey } from "@/components/Journey";
import { Expertise } from "@/components/Expertise";
import { Portfolio } from "@/components/Portfolio";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Journey />
        <Expertise />
        <Portfolio />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
