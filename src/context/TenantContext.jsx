import { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const TenantContext = createContext({
    tenant: null,
    isLoading: true
});

// Mock Database of Tenants
const TENANTS_DB = {
    'demo': { id: 'demo', name: 'Demo Corp', color: '#8b5cf6' },
    'acme': { id: 'acme', name: 'Acme Inc', color: '#ec4899' },
    'creative': { id: 'creative', name: 'Creative Studio', color: '#10b981' }
};

export const TenantProvider = ({ children }) => {
    const [tenant, setTenant] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const location = useLocation();

    useEffect(() => {
        // Extract tenantId from URL path: /:tenantId/...
        const pathParts = location.pathname.split('/');
        const tenantIdPromise = pathParts[1];

        if (tenantIdPromise && TENANTS_DB[tenantIdPromise]) {
            setTenant(TENANTS_DB[tenantIdPromise]);
        } else {
            // Default or redirect to a landing page logic
            if (pathParts[1] && pathParts[1] !== '') {
                console.warn(`Tenant ${pathParts[1]} not found`);
            }
            setTenant(null);
        }
        setIsLoading(false);
    }, [location]);

    return (
        <TenantContext.Provider value={{ tenant, isLoading }}>
            {children}
        </TenantContext.Provider>
    );
};

export const useTenant = () => useContext(TenantContext);
