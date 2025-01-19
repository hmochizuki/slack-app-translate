import { WebClient } from '@slack/web-api';
import { createEventAdapter } from '@slack/events-api';

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET || '';
const slackToken = process.env.SLACK_BOT_TOKEN || '';
const slackEvents = createEventAdapter(slackSigningSecret);
const webClient = new WebClient(slackToken);

const PORT = Number(process.env.PORT) || 3000;

const createSlackEvent = () => {
  /**
   * Slackのメッセージイベントをリッスンし、URLを含むメッセージを検出します。
   * URLが含まれている場合、次のステップに進むための処理を行います。
   * 
   * @param event - Slackのメッセージイベントオブジェクト
   */
  slackEvents.on('message', async (event) => {
      if (event.text && event.text.includes('http')) {
          // URLを含むメッセージを処理
          console.log(`URL detected in message: ${event.text}`);
          // ここで次のステップに進む
      }
  });
  
  /**
   * Slackイベントリスナーサーバーを起動します。
   * 指定されたポートでリッスンを開始し、サーバーが正常に起動したことをログに出力します。
   */
  slackEvents.start(PORT).then(() => {
      console.log('Slack event listener is running');
  }); 
}

createSlackEvent();