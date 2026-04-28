import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';
import { DataProvider } from '@/lib/data';
import { Layout } from '@/components/layout/Layout';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { RequireAuth } from '@/components/admin/RequireAuth';
import HomePage from '@/pages/HomePage';
import EventiPage from '@/pages/EventiPage';
import EventoDetailPage from '@/pages/EventoDetailPage';
import OrchestraPage from '@/pages/OrchestraPage';
import BandiPage from '@/pages/BandiPage';
import BandoDetailPage from '@/pages/BandoDetailPage';
import ContattiPage from '@/pages/ContattiPage';
import NotFoundPage from '@/pages/NotFoundPage';
import LoginPage from '@/pages/admin/LoginPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import EventiListPage from '@/pages/admin/EventiListPage';
import EventoFormPage from '@/pages/admin/EventoFormPage';
import BandiListPage from '@/pages/admin/BandiListPage';
import BandoFormPage from '@/pages/admin/BandoFormPage';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Sito pubblico */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/eventi" element={<EventiPage />} />
              <Route path="/eventi/:slug" element={<EventoDetailPage />} />
              <Route path="/orchestra" element={<OrchestraPage />} />
              <Route path="/bandi" element={<BandiPage />} />
              <Route path="/bandi/:slug" element={<BandoDetailPage />} />
              <Route path="/contatti" element={<ContattiPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin: login (no auth) */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Admin: routes protette */}
            <Route
              element={
                <RequireAuth>
                  <AdminLayout />
                </RequireAuth>
              }
            >
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/eventi" element={<EventiListPage />} />
              <Route path="/admin/eventi/new" element={<EventoFormPage />} />
              <Route path="/admin/eventi/:id/edit" element={<EventoFormPage />} />
              <Route path="/admin/bandi" element={<BandiListPage />} />
              <Route path="/admin/bandi/new" element={<BandoFormPage />} />
              <Route path="/admin/bandi/:id/edit" element={<BandoFormPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}
