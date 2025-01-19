import 'dotenv/config';
import { WebClient } from '@slack/web-api';
import { createEventAdapter } from '@slack/events-api';
import { fetchAndExtractContent } from './fetchAndExtractContent';
import { translateContent } from './translateContent';
import { replyToThread } from './replyToThread';

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET || '';
const slackToken = process.env.SLACK_BOT_TOKEN || '';
const rssBotId = process.env.RSS_BOT_ID || '';
const slackEvents = createEventAdapter(slackSigningSecret);
const webClient = new WebClient(slackToken);

const PORT = Number(process.env.PORT) || 3333;

const createSlackEvent = () => {
  /**
   * Slackのメッセージイベントをリッスンし、URLを含むメッセージを検出します。
   * URLが含まれている場合、次のステップに進むための処理を行います。
   * 
   * @param event - Slackのメッセージイベントオブジェクト
   */
  slackEvents.on('message', async (event) => {
      console.log(event);
      // RSSアプリからのメッセージかどうかを確認
      if (event.subtype === 'bot_message' && event.bot_id === rssBotId) {
          if (event.text && event.text.includes('http')) {
              const url = extractUrl(event.text);
              if (url) {
                  try {
                      const content = await fetchAndExtractContent(url);
                      const translatedContent = await translateContent(content);
                      await replyToThread(event.channel, event.ts, translatedContent);
                  } catch (error) {
                      console.error('Error processing message:', error);
                  }
              }
          }
      }
  });
  
  /**
   * Slackイベントリスナーサーバーを起動します。
   * 指定されたポートでリッスンを開始し、サーバーが正常に起動したことをログに出力します。
   */
  slackEvents.start(PORT).then(() => {
      console.log(`Slack event listener is running on port ${PORT}`);
  }); 
}

/**
 * メッセージからURLを抽出します。
 * 
 * @param text - メッセージテキスト
 * @returns 抽出されたURL
 */
const extractUrl = (text: string): string | null => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);
    return matches ? matches[0] : null;
}

createSlackEvent();