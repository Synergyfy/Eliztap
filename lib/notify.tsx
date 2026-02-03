import { toast } from 'react-hot-toast';

// Custom icons for a premium feel
const Icons = {
    success: <span className="material-icons-round text-green-500">check_circle</span>,
    error: <span className="material-icons-round text-red-500">error</span>,
    warning: <span className="material-icons-round text-yellow-500">warning</span>,
    info: <span className="material-icons-round text-blue-500">info</span>,
}

export const notify = {
    success: (message: string) =>
        toast.success(message, {
            icon: Icons.success,
            style: { borderLeft: '4px solid #22c55e' }
        }),

    error: (message: string) =>
        toast.error(message, {
            icon: Icons.error,
            style: { borderLeft: '4px solid #ef4444' }
        }),

    // Custom wrapper for loading
    loading: (message: string) => toast.loading(message),

    // Custom wrapper for generic info
    info: (message: string) =>
        toast(message, {
            icon: Icons.info,
            style: { borderLeft: '4px solid #3b82f6' }
        }),

    // Custom wrapper for warnings
    warning: (message: string) =>
        toast(message, {
            icon: Icons.warning,
            style: { borderLeft: '4px solid #eab308' }
        }),

    dismiss: (toastId?: string) => toast.dismiss(toastId),
};
