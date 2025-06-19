import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { StudentForm } from './components/StudentForm';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import RegisterPage from './RegisterPage';
import { SignIn } from './SignIn';
import { useState } from 'react';



export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignInSuccess = (email: string) => {
    console.log('User signed in:', email);
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-gray-50">
        <Header isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Features />
                  <HowItWorks />
                </>
              }
            />
            <Route
              path="/signin"
              element={<SignIn onSignInSuccess={handleSignInSuccess} />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route
            path="/student-form" element={<StudentForm onSignOut={handleSignOut} />} />
            

              
            <Route
              path="*"
              element={<SignIn onSignInSuccess={handleSignInSuccess} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
