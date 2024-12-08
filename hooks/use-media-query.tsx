import { useState, useEffect } from 'react';

const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(() => window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        
        // 更新状态的函数
        const handleChange = () => setMatches(mediaQueryList.matches);
        
        // 添加监听器
        mediaQueryList.addEventListener('change', handleChange);

        // 清理函数，组件卸载时移除监听器
        return () => {
            mediaQueryList.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;