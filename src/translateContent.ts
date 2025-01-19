import axios from 'axios';

export const translateContent = async (text: string, targetLang: string = 'ja'): Promise<string> => {
    try {
        const response = await axios.post('https://libretranslate.com/translate', {
            q: text,
            source: 'en',
            target: targetLang,
            format: 'text'
        });
        return response.data.translatedText;
    } catch (error) {
        console.error('Error translating content:', error);
        return '';
    }
}; 