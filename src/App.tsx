/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PROPERTIES, FILTER_STEPS } from './data';
import { SplashScreen, ProfileSelect, FilterSlide, PropertyCard, PropertyDetail, SettingsScreen, SuccessScreen } from './screens/Core';
import { LoginScreen, VisitorRegister } from './screens/Auth';
import { OwnerPanel } from './screens/Owner';
import { MasterDashboard, GuestFilter, GuestCatalog } from './screens/MasterGuest';

export default function App() {
  const [screen, setScreen] = useState("splash"); 
  const [profile, setProfile] = useState<any>(null);
  const [publishedProperties, setPublishedProperties] = useState([...PROPERTIES]);
  const addProperty = (p: any) => setPublishedProperties(prev => [...prev, p]);
  const [filterStep, setFilterStep] = useState(0);
  const [filters, setFilters] = useState<any>({});
  const [cardIdx, setCardIdx] = useState(0);
  const [likedProperty, setLikedProperty] = useState<any>(null);

  const handleProfileSelect = (p: string) => {
    setProfile(p);
    if (p === "owner") setScreen("owner");
    else if (p === "master") setScreen("masterLogin");
    else if (p === "guest") setScreen("guestFilter");
    else if (p === "visitor") setScreen("visitorRegister");
    else if (p === "login") setScreen("login");
    else setScreen("filter");
  };

  const handleFilterAnswer = (ans: any) => setFilters((f: any) => ({ ...f, ...ans }));

  const handleFilterNext = () => {
    if (filterStep < FILTER_STEPS.length - 1) setFilterStep(s => s + 1);
    else setScreen("cards");
  };

  const handleFilterBack = () => {
    if (filterStep > 0) setFilterStep(s => s - 1);
    else setScreen("profile");
  };

  const handleLike = (property: any) => {
    setLikedProperty(property);
    setScreen("detail");
  };

  const handleDislike = () => {
    if (cardIdx < publishedProperties.length - 1) setCardIdx(i => i + 1);
    else { setCardIdx(0); }
  };

  const restart = () => {
    setScreen("splash"); setProfile(null); setFilterStep(0);
    setFilters({}); setCardIdx(0); setLikedProperty(null);
  };

  if (screen === "splash") return <SplashScreen onStart={() => setScreen("profile")} />;
  if (screen === "profile") return <ProfileSelect onSelect={handleProfileSelect} />;
  if (screen === "login") return <LoginScreen onBack={() => setScreen("profile")} onLogin={() => setScreen("cards")} onMasterLogin={() => setScreen("master")} />;
  if (screen === "visitorRegister") return <VisitorRegister onBack={() => setScreen("profile")} onComplete={() => setScreen("filter")} onLogin={() => setScreen("login")} />;
  if (screen === "guestFilter") return <GuestFilter onBack={() => setScreen("profile")} onContinue={(f: any) => { setFilters(f); setScreen("catalog"); }} />;
  if (screen === "catalog") return <GuestCatalog filters={filters} onBack={() => setScreen("guestFilter")} onRegister={() => setScreen("visitorRegister")} />;
  if (screen === "filter") return (
    <FilterSlide
      key={filterStep}
      step={FILTER_STEPS[filterStep]}
      stepIndex={filterStep}
      total={FILTER_STEPS.length}
      filters={filters}
      onAnswer={handleFilterAnswer}
      onNext={handleFilterNext}
      onBack={handleFilterBack}
    />
  );
  if (screen === "settings") return <SettingsScreen onBack={() => setScreen("cards")} onSignOut={() => setScreen("profile")} />;
  if (screen === "cards") return (
    <PropertyCard
      property={publishedProperties[cardIdx % publishedProperties.length]}
      onLike={handleLike}
      onDislike={handleDislike}
      onSettings={() => setScreen("settings")}
      onFilter={() => { setFilterStep(0); setFilters({}); setScreen("filter"); }}
    />
  );
  if (screen === "detail" && likedProperty) return (
    <PropertyDetail
      property={likedProperty}
      onBack={() => setScreen("cards")}
      onRent={() => setScreen("success")}
    />
  );
  if (screen === "owner") return <OwnerPanel onBack={() => setScreen("profile")} onPublish={addProperty} />;
  if (screen === "success") return <SuccessScreen onRestart={restart} />;
  if (screen === "master") return <MasterDashboard onBack={() => setScreen("profile")} />;
  return null;
}
