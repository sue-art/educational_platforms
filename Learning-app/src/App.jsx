import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/main-layout';
import DashboardPage from './pages/DashboardPage';
import PhonemicAwarenessHomePage from './pages/phonemic-awareness/PhonemicAwarenessHomePage';
import SoundRecognitionPage from './pages/phonemic-awareness/SoundRecognitionPage';
import SoundBlendingPage from './pages/phonemic-awareness/SoundBlendingPage';
import SoundSegmentationPage from './pages/phonemic-awareness/SoundSegmentationPage';
import SoundManipulationPage from './pages/phonemic-awareness/SoundManipulationPage';
import PhonicsHomePage from './pages/phonics/PhonicsHomePage';
import LetterSoundPage from './pages/phonics/LetterSoundPage';
import WordBuildingPage from './pages/phonics/WordBuildingPage';
import DecodableTextPage from './pages/phonics/DecodableTextPage';
import WritingPracticePage from './pages/WritingPracticePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ParentTeacherPortalPage from './pages/ParentTeacherPortalPage'; // Will create this page later
import './App.css'; // Assuming global styles

// Mock authentication check
const isAuthenticated = () => {
  // Replace with actual auth check (e.g., check for token in localStorage)
  return true; // For now, assume user is always authenticated for layout testing
};

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* App routes with MainLayout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="phonemic-awareness">
            <Route index element={<PhonemicAwarenessHomePage />} />
            <Route path="sound-recognition" element={<SoundRecognitionPage />} />
            <Route path="sound-recognition/:activityId" element={<SoundRecognitionPage />} /> {/* For specific activity */}
            <Route path="sound-blending" element={<SoundBlendingPage />} />
            <Route path="sound-blending/:activityId" element={<SoundBlendingPage />} /> {/* For specific activity */}
            <Route path="sound-segmentation" element={<SoundSegmentationPage />} />
            <Route path="sound-segmentation/:activityId" element={<SoundSegmentationPage />} /> {/* For specific activity */}
            <Route path="sound-manipulation" element={<SoundManipulationPage />} />
            <Route path="sound-manipulation/:activityId" element={<SoundManipulationPage />} /> {/* For specific activity */}
          </Route>
          <Route path="phonics">
            <Route index element={<PhonicsHomePage />} />
            <Route path="letter-sounds" element={<LetterSoundPage />} />
            <Route path="letter-sounds/activity/:activityId" element={<LetterSoundPage />} /> {/* For specific activity */}
            <Route path="word-building" element={<WordBuildingPage />} />
            <Route path="word-building/activity/:activityId" element={<WordBuildingPage />} /> {/* For specific activity */}
            <Route path="decodable-texts" element={<DecodableTextPage />} />
            <Route path="decodable-texts/activity/:activityId" element={<DecodableTextPage />} /> {/* For specific activity */}
          </Route>
          <Route path="writing-practice" element={<WritingPracticePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="parent-teacher-portal" element={<ParentTeacherPortalPage />} /> {/* Placeholder for now */}
        </Route>

        {/* Fallback for any other route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
