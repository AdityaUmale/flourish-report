'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, User, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DOMAINS, CONTEXT_QUESTIONS, EMOTIONAL_HEALTH_QUESTIONS, SKILL_MONETIZATION_QUESTION } from '@/lib/questionnaire';
import { UserInfo, QuestionResponse, ResponseValue, Gender } from '@/lib/types';

// Steps: 0 = User Info, 1 = Context, 2-8 = Domains, 9 = Enhanced
const TOTAL_STEPS = 10;

const RESPONSE_OPTIONS: { value: ResponseValue; label: string }[] = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Somewhat Disagree' },
  { value: 4, label: 'Somewhat Agree' },
  { value: 5, label: 'Agree' },
  { value: 6, label: 'Strongly Agree' },
];

export default function HomePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>({});
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedProgress = localStorage.getItem('flourish-progress');
    if (savedProgress) {
      try {
        const { step, userInfo: savedUserInfo, responses: savedResponses } = JSON.parse(savedProgress);
        setCurrentStep(step);
        setUserInfo(savedUserInfo);
        setResponses(savedResponses);
      } catch {
        // Invalid saved data, start fresh
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('flourish-progress', JSON.stringify({
        step: currentStep,
        userInfo,
        responses,
      }));
    }
  }, [currentStep, userInfo, responses, isClient]);

  const getCurrentQuestions = () => {
    if (currentStep === 1) return CONTEXT_QUESTIONS;
    if (currentStep >= 2 && currentStep <= 8) {
      return DOMAINS[currentStep - 2]?.questions || [];
    }
    if (currentStep === 9) {
      return [...EMOTIONAL_HEALTH_QUESTIONS, SKILL_MONETIZATION_QUESTION];
    }
    return [];
  };

  const getCurrentSectionInfo = () => {
    if (currentStep === 0) return { title: 'About You', subtitle: 'Let\'s start with some basic information' };
    if (currentStep === 1) return { title: 'Your Current Situation', subtitle: 'Help us understand your life context' };
    if (currentStep >= 2 && currentStep <= 8) {
      const domain = DOMAINS[currentStep - 2];
      return { title: domain.name, subtitle: domain.description };
    }
    if (currentStep === 9) return { title: 'Final Questions', subtitle: 'A few more questions to complete your assessment' };
    return { title: '', subtitle: '' };
  };

  const isStepComplete = () => {
    if (currentStep === 0) {
      return userInfo.name && userInfo.email && userInfo.age && userInfo.gender && userInfo.location;
    }
    const questions = getCurrentQuestions();
    return questions.every(q => responses.some(r => r.questionId === q.id));
  };

  const handleResponse = (questionId: number, value: ResponseValue) => {
    setResponses(prev => {
      const existing = prev.findIndex(r => r.questionId === questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { questionId, value };
        return updated;
      }
      return [...prev, { questionId, value }];
    });
  };

  const getResponse = (questionId: number): ResponseValue | undefined => {
    return responses.find(r => r.questionId === questionId)?.value;
  };

  const goNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const finalUserInfo: UserInfo = {
        name: userInfo.name || '',
        email: userInfo.email || '',
        age: userInfo.age || 0,
        gender: (userInfo.gender as Gender) || 'prefer-not-to-say',
        location: userInfo.location || '',
        isStudent: userInfo.isStudent || false,
        isEmployed: userInfo.isEmployed || false,
        isBusinessOwner: userInfo.isBusinessOwner || false,
        isUnemployed: userInfo.isUnemployed || false,
      };

      localStorage.setItem('flourish-results', JSON.stringify({
        userInfo: finalUserInfo,
        responses,
        completedAt: new Date().toISOString(),
      }));

      router.push('/results');
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progress = ((currentStep + 1) / (TOTAL_STEPS)) * 100;
  const sectionInfo = getCurrentSectionInfo();

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[rgb(15,15,20)]">
      {/* Progress bar only */}
      <div className="sticky top-0 z-50 glass">
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Section header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-2 text-balance">{sectionInfo.title}</h1>
              <p className="text-[rgb(var(--color-text-muted))]">{sectionInfo.subtitle}</p>
            </div>

            {/* Step 0: User Info */}
            {currentStep === 0 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    className="input"
                    placeholder="Your name…"
                    autoComplete="name"
                    value={userInfo.name || ''}
                    onChange={e => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="input"
                    placeholder="your.email@example.com"
                    autoComplete="email"
                    value={userInfo.email || ''}
                    onChange={e => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <p className="text-xs text-[rgb(var(--color-text-muted))] mt-1">
                    Your personalized report will be sent to this email
                  </p>
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium mb-2">Age</label>
                  <input
                    id="age"
                    type="number"
                    className="input"
                    placeholder="Your age…"
                    inputMode="numeric"
                    min={10}
                    max={100}
                    value={userInfo.age || ''}
                    onChange={e => setUserInfo(prev => ({ ...prev, age: parseInt(e.target.value) || undefined }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                      { value: 'prefer-not-to-say', label: 'Prefer not to say' },
                    ].map(option => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setUserInfo(prev => ({ ...prev, gender: option.value as Gender }))}
                        className={`p-3 rounded-lg border text-left transition-all ${userInfo.gender === option.value
                          ? 'border-lime-400 bg-lime-400/10 text-white'
                          : 'border-[rgb(var(--color-border))] text-[rgb(var(--color-text-muted))] hover:border-[rgb(var(--color-text-muted))]'
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
                  <input
                    id="location"
                    type="text"
                    className="input"
                    placeholder="City, Country…"
                    autoComplete="address-level2"
                    value={userInfo.location || ''}
                    onChange={e => setUserInfo(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium mb-3">Current Status (select all that apply)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${userInfo.isStudent
                      ? 'border-lime-400 bg-lime-400/10'
                      : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-text-muted))]'
                      }`}>
                      <input
                        type="checkbox"
                        checked={userInfo.isStudent || false}
                        onChange={e => setUserInfo(prev => ({ ...prev, isStudent: e.target.checked }))}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${userInfo.isStudent ? 'bg-lime-400 border-lime-400' : 'border-[rgb(var(--color-border))]'
                        }`}>
                        {userInfo.isStudent && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm">I&apos;m a student</span>
                    </label>

                    <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${userInfo.isEmployed
                      ? 'border-lime-400 bg-lime-400/10'
                      : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-text-muted))]'
                      }`}>
                      <input
                        type="checkbox"
                        checked={userInfo.isEmployed || false}
                        onChange={e => setUserInfo(prev => ({ ...prev, isEmployed: e.target.checked }))}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${userInfo.isEmployed ? 'bg-lime-400 border-lime-400' : 'border-[rgb(var(--color-border))]'
                        }`}>
                        {userInfo.isEmployed && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm">I&apos;m employed</span>
                    </label>

                    <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${userInfo.isBusinessOwner
                      ? 'border-lime-400 bg-lime-400/10'
                      : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-text-muted))]'
                      }`}>
                      <input
                        type="checkbox"
                        checked={userInfo.isBusinessOwner || false}
                        onChange={e => setUserInfo(prev => ({ ...prev, isBusinessOwner: e.target.checked }))}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${userInfo.isBusinessOwner ? 'bg-lime-400 border-lime-400' : 'border-[rgb(var(--color-border))]'
                        }`}>
                        {userInfo.isBusinessOwner && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm">I own a business</span>
                    </label>

                    <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${userInfo.isUnemployed
                      ? 'border-lime-400 bg-lime-400/10'
                      : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-text-muted))]'
                      }`}>
                      <input
                        type="checkbox"
                        checked={userInfo.isUnemployed || false}
                        onChange={e => setUserInfo(prev => ({ ...prev, isUnemployed: e.target.checked }))}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${userInfo.isUnemployed ? 'bg-lime-400 border-lime-400' : 'border-[rgb(var(--color-border))]'
                        }`}>
                        {userInfo.isUnemployed && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm">I&apos;m not working</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Question steps */}
            {currentStep >= 1 && (
              <div className="space-y-4">
                {getCurrentQuestions().map((question, index) => (
                  <div key={question.id} className="card p-5">
                    <p className="mb-4 text-[15px] leading-relaxed">
                      <span className="text-[rgb(var(--color-text-muted))] mr-2">{index + 1}.</span>
                      {question.text}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                      {RESPONSE_OPTIONS.map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleResponse(question.id, option.value)}
                          className={`likert-btn flex flex-col items-center justify-center p-2 h-auto min-h-[60px] ${getResponse(question.id) === option.value ? 'selected' : ''}`}
                          title={option.label}
                        >
                          <span className="text-xs font-medium text-center leading-tight">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgb(var(--color-border))]">
          <button
            type="button"
            onClick={goBack}
            disabled={currentStep === 0}
            className="btn-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={!isStepComplete()}
            className="btn-primary"
          >
            {currentStep === TOTAL_STEPS - 1 ? 'See Results' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
