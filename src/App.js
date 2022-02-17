import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Urls from './components/Urls';
import ForgotPassswordForm from './components/ForgotPassswordForm';
import ForgotPasswordRedirect from './components/ForgotPasswordRedirect';
import LinkError from './components/LinkError';
import ResetPassword from './components/ResetPassword';
import Register from './components/Register';
import ActivateAccountRedirect from './components/ActivateAccountRedirect';
import AccountActivated from './components/AccountActivated';
import AccountAlreadyActivated from './components/AccountAlreadyActivated';
import LinkExpired from './components/LinkExpired';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassswordForm />} />
          <Route path="/forgot-password-redirect/:token/:verifyString" element={<ForgotPasswordRedirect />} />
          <Route path="/activate/:token/:activateString" element={<ActivateAccountRedirect />} />
          <Route path="/activated" element={<AccountActivated />} />
          <Route path="/alreadyactivated" element={<AccountAlreadyActivated />} />
          <Route path="/link-error" element={<LinkError />} />
          <Route path="/link-expired" element={<LinkExpired />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <>
            <Route path="/dashboard" element={
              <>
                <ResponsiveAppBar />
                <Dashboard />
              </>
            } />
            <Route path="/urls" element={
              <>
                <ResponsiveAppBar />
                <Urls />
              </>
            } />
          </>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
