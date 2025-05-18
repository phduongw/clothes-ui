const setToken = (token: string, type: 'local' | 'session' = 'session') => {
    if (type === 'local') {
        localStorage.setItem('accessToken', token);
    } else {
        sessionStorage.setItem('accessToken', token);
    }
}

const clearToken = () => {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
}

export const useToken = () => {
    return { set: setToken, clear: clearToken };
}