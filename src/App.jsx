import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppShell } from './components/Layout/AppShell';
import { LoginModal } from './components/Auth/LoginModal';
import { AppRoutes } from './routes';

function App() {
    // Check for token in localStorage. 
    // In a real app we might verify validity, but existence is enough for this demo stage.
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    if (!isAuthenticated) {
        return <LoginModal />;
    }

    return (
        <Router>
            <AppShell>
                <AppRoutes />
            </AppShell>
        </Router>
    )
}

export default App;
