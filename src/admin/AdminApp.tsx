import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import AdminLayout from "./AdminLayout";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";
import SettingsPage from "./pages/SettingsPage";
import PageEditor from "./pages/PageEditor";
import ProjectsAdmin from "./pages/ProjectsAdmin";
import ClientsAdmin from "./pages/ClientsAdmin";
import MediaAdmin from "./pages/MediaAdmin";

// Loaded lazily so public visitors never download the editor code.
const AdminApp = () => (
  <AuthProvider>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="pages/:page" element={<PageEditor />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="clients" element={<ClientsAdmin />} />
        <Route path="media" element={<MediaAdmin />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default AdminApp;
