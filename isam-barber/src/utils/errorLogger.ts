/**
 * Semplice logger per catturare errori globali e salvarli nel localStorage
 * per la visualizzazione nel pannello admin.
 */

export interface AppError {
    id: string;
    message: string;
    stack?: string;
    timestamp: string;
    url: string;
}

const STORAGE_KEY = 'app_errors_log';

export const initErrorLogger = () => {
    window.onerror = (message, source, lineno, colno, error) => {
        saveError({
            message: String(message),
            stack: error?.stack,
            url: `${source}:${lineno}:${colno}`
        });
    };

    window.onunhandledrejection = (event) => {
        saveError({
            message: `Promessa non gestita: ${event.reason?.message || String(event.reason)}`,
            stack: event.reason?.stack,
            url: window.location.href
        });
    };
};

export const getErrors = (): AppError[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
};

export const clearErrors = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
};

export const saveError = (error: Partial<AppError>) => {
    try {
        const errors = getErrors();
        const newError: AppError = {
            id: Math.random().toString(36).substring(2, 9),
            message: error.message || 'Errore sconosciuto',
            stack: error.stack,
            timestamp: new Date().toISOString(),
            url: error.url || window.location.href,
        };

        // Mantieni solo gli ultimi 50 errori
        const updatedErrors = [newError, ...errors].slice(0, 50);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedErrors));

        // Notifica l'admin se il pannello è aperto (opzionale, tramite Evento)
        window.dispatchEvent(new CustomEvent('app_error_logged', { detail: newError }));
    } catch (e) {
        console.error('Impossibile salvare l\'errore nel log:', e);
    }
};
