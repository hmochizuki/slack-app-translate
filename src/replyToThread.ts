import { WebClient } from '@slack/web-api';

const webClient = new WebClient(process.env.SLACK_BOT_TOKEN);

export const replyToThread = async (channel: string, threadTs: string, text: string) => {
    try {
        await webClient.chat.postMessage({
            channel: channel,
            text: text,
            thread_ts: threadTs
        });
    } catch (error) {
        console.error('Error replying to thread:', error);
    }
}; 