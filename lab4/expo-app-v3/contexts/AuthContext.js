// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthContext.Provider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Initialize loading state
        setIsLoading(false);
    }, []);
    const login = async (email, password) => {
        try {
            // Simulate API call
            const userData = { id: 1, email, name: 'John Doe' };
            setUser(userData);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };
    const logout = () => {
        setUser(null);
    };

    const updateUser = (userData) => {
        setUser(userData);
    };
    const value = {
        user,
        updateUser,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};