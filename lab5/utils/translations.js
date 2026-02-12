const translations = {
  en: {
    login: 'Login',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    mobileNumber: 'Mobile Number',
    registration: 'Create Account',
    welcome: 'Welcome, {email}!',
    en: 'English',
    fr: 'French',
    es: 'Spanish',
  },
  fr: {
    login: 'Connexion',
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    mobileNumber: 'Numéro de téléphone',
    registration: 'Créer un compte',
    welcome: 'Bienvenue, {email}!',
    en: 'English',
    fr: 'Français',
    es: 'Espagnol',
  },
  es: {
    login: 'Iniciar sesión',
    email: 'Correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    mobileNumber: 'Número de teléfono',
    registration: 'Crear cuenta',
    welcome: '¡Bienvenido, {email}!',
    en: 'English',
    fr: 'Francés',
    es: 'Español',
  },
};

export const getTranslation = (key, language, params = {}) => {
  const text = translations[language]?.[key] || translations.en[key] || key;
  return text.replace(/\{(\w+)\}/g, (_, k) => params[k] || '');
};

export default translations;
