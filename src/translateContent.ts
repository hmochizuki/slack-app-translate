import axios from 'axios';

/**
 * 指定されたテキストを指定された言語に翻訳します。
 * 
 * @param text - 翻訳するテキスト
 * @param targetLang - 翻訳先の言語（デフォルトは日本語）
 * @returns 翻訳されたテキスト
 */
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