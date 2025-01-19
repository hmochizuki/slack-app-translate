import { WebClient } from '@slack/web-api';
import { createEventAdapter } from '@slack/events-api';

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET || '';
const slackToken = process.env.SLACK_BOT_TOKEN || '';
const slackEvents = createEventAdapter(slackSigningSecret);
const webClient = new WebClient(slackToken);

const PORT = Number(process.env.PORT) || 3000;

slackEvents.on('message', async (event) => {
    if (event.text && event.text.includes('http')) {
        // URLを含むメッセージを処理
        console.log(`URL detected in message: ${event.text}`);
        // ここで次のステップに進む
    }
});

// サーバーを起動
slackEvents.start(PORT).then(() => {
    console.log('Slack event listener is running');
}); 