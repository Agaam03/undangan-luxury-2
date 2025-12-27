/**
 * Asset Cache Utility
 * Preloads and caches all images and videos for faster subsequent visits
 */

const CACHE_KEY = 'wedding-assets-cached';

// Collect all asset URLs from weddingData
export const getAllAssetUrls = (weddingData: any): string[] => {
    const urls: string[] = [];

    // Groom & Bride photos
    if (weddingData.groom?.image) urls.push(weddingData.groom.image);
    if (weddingData.bride?.image) urls.push(weddingData.bride.image);

    // Event assets
    if (weddingData.event?.splashImage) urls.push(weddingData.event.splashImage);
    if (weddingData.event?.heroVideo) urls.push(weddingData.event.heroVideo);

    // Schedule images
    weddingData.schedule?.forEach((event: any) => {
        if (event.image) urls.push(event.image);
    });

    // Love Story assets
    if (weddingData.story?.videoUrl) urls.push(weddingData.story.videoUrl);

    // Gallery images
    weddingData.gallery?.forEach((item: any) => {
        if (item.src) urls.push(item.src);
    });

    // Background music
    if (weddingData.music?.url) urls.push(weddingData.music.url);

    return urls;
};

// Check if assets are already cached
export const isAssetsCached = (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(CACHE_KEY) === 'true';
};

// Mark assets as cached
export const markAssetsCached = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CACHE_KEY, 'true');
    }
};

// Preload a single image
const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Resolve even on error to continue loading other assets
        img.src = url;
    });
};

// Preload a single video (just fetch metadata, not full download)
const preloadVideo = (url: string): Promise<void> => {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => resolve();
        video.onerror = () => resolve();
        video.src = url;
    });
};

// Preload a single audio file
const preloadAudio = (url: string): Promise<void> => {
    return new Promise((resolve) => {
        const audio = new Audio();
        audio.preload = 'metadata';
        audio.onloadedmetadata = () => resolve();
        audio.onerror = () => resolve();
        audio.src = url;
    });
};

// Main function to preload all assets with progress callback
export const preloadAllAssets = async (
    urls: string[],
    onProgress?: (loaded: number, total: number) => void
): Promise<void> => {
    const total = urls.length;
    let loaded = 0;

    const promises = urls.map(async (url) => {
        try {
            // Determine asset type and preload accordingly
            if (url.match(/\.(mp4|webm|mov)(\?|$)/i)) {
                await preloadVideo(url);
            } else if (url.match(/\.(mp3|wav|ogg|m4a)(\?|$)/i)) {
                await preloadAudio(url);
            } else {
                await preloadImage(url);
            }
        } catch (e) {
            // Silently fail for individual assets
        } finally {
            loaded++;
            onProgress?.(loaded, total);
        }
    });

    await Promise.all(promises);
    markAssetsCached();
};

// Clear cache (for development/testing)
export const clearAssetsCache = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(CACHE_KEY);
    }
};
