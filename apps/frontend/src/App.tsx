import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProjectProvider } from './context/ProjectContext'
import { UIProvider } from './context/UIContext'
import LandingPage from './pages/LandingPage'
import AppPage from './pages/AppPage'
import AppLayout from './components/layout/AppLayout'
import UploadPage from './pages/app/UploadPage'
import LibraryPage from './pages/app/LibraryPage'
import ProfilePage from './pages/app/ProfilePage'

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <UIProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />

              {/* Protected App Routes */}
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<AppPage />} />
                <Route path="upload" element={<UploadPage />} />
                <Route path="library" element={<LibraryPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UIProvider>
      </ProjectProvider>
    </AuthProvider>
  )
}

export default App
