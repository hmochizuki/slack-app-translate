import { WebClient } from '@slack/web-api';

const webClient = new WebClient(process.env.SLACK_BOT_TOKEN);

/**
 * 指定されたSlackチャンネルのスレッドにメッセージを返信します。
 * 
 * @param channel - メッセージを送信するチャンネルID
 * @param threadTs - スレッドのタイムスタンプ
 * @param text - 返信するテキスト
 */
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