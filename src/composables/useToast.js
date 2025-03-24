import { useToast } from "vue-toastification";

export function useCustomToast() {
    const toast = useToast();

    const showSuccess = (message) => {
        toast.success(message, {
            timeout: 2000
        });
    };

    const showError = (message) => {
        toast.error(message || "Ha ocurrido un error", {
            timeout: 3000
        });
    };

    const showInfo = (message) => {
        toast.info(message, {
            timeout: 2000
        });
    };

    const showWarning = (message) => {
        toast.warning(message, {
            timeout: 2500
        });
    };

    return {
        showSuccess,
        showError,
        showInfo,
        showWarning
    };
} 