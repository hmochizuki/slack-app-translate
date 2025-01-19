import axios from 'axios';
import cheerio from 'cheerio';

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