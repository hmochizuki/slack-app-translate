import axios from 'axios';
import cheerio from 'cheerio';

/**
 * 指定されたURLからHTMLを取得し、記事の本文を抽出します。
 * 
 * @param url - 取得するURL
 * @returns 抽出された記事の本文
 */
export const fetchAndExtractContent = async (url: string): Promise<string> => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const articleContent = $('article').text(); // 例として記事タグを抽出
        return articleContent.trim();
    } catch (error) {
        console.error('Error fetching URL content:', error);
        return '';
    }
}; 