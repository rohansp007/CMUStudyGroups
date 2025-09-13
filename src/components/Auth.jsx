import {auth, provider, db} from "../firebase-config.js";
import { signInWithPopup} from 'firebase/auth';
import Cookies from "universal-cookie";
import React from 'react';
import { BookOpen, Users, Brain, Sparkles } from 'lucide-react';
import { collection, addDoc } from "firebase/firestore";

const cookies = new Cookies();
const expireInMinutes = 30; // Set expiration time in minutes
const expires = new Date(Date.now() + expireInMinutes * 60 * 1000); // 30 minutes from now
export const Auth = (props) => {
    const { setIsAuth } = props
    
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider );
        try {
            const user = result.user;
            const email = user.email;
            let atIndex = email.indexOf("@");
            let domain = email.substring(atIndex);
            if (domain === "@andrew.cmu.edu") {
                console.log("allowed domain");
                cookies.set("auth-token", user.refreshToken, { expires });
                await addDoc(collection(db, "users"), {
                    email: user.email,
                    displayName: user.displayName
                });
                setIsAuth(true);
            } else {
                alert("Only CMU email addresses are allowed.");
                console.log("not allowed domain");
                // Do NOT set auth-token or setIsAuth
            }
            console.log(domain);
        } catch (err) {
            console.log(err);
        }
    };
//need to find the css he already wrote (className)
    return (
         <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating icons */}
      <div className="absolute top-20 left-20 text-blue-400 opacity-30 animate-bounce animation-delay-1000">
        <BookOpen className="w-8 h-8" />
      </div>
      <div className="absolute top-40 right-32 text-purple-400 opacity-30 animate-bounce animation-delay-2000">
        <Users className="w-6 h-6" />
      </div>
      <div className="absolute bottom-32 left-32 text-green-400 opacity-30 animate-bounce animation-delay-3000">
        <Brain className="w-7 h-7" />
      </div>
      <div className="absolute bottom-20 right-20 text-indigo-400 opacity-30 animate-bounce">
        <Sparkles className="w-5 h-5" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo/Brand section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/25">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Study Groups
          </h1>
          <p className="text-gray-400 text-lg">Connect. Learn. Succeed.</p>
        </div>

        {/* Sign in card */}
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-black/20">
          {/* Welcome text */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white mb-3">Welcome Back</h2>
            <p className="text-gray-300 leading-relaxed">
              Sign in with Google to find study groups, connect with classmates, and ace your courses together.
            </p>
          </div>

          {/* Google sign in button */}
          <button
            onClick={signInWithGoogle}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-4 shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-lg"
          >
            {/* Google logo */}
            <svg className="w-7 h-7" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Features preview */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm text-center mb-4">What you'll get:</p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span>Find study groups for all your classes</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span>Connect with classmates and study partners</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <span>Create and manage your own study sessions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>    
    ); 
    
};