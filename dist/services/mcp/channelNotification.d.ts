/**
 * Channel notifications — lets an MCP server push user messages into the
 * conversation. A "channel" (Discord, Slack, SMS, etc.) is just an MCP server
 * that:
 *   - exposes tools for outbound messages (e.g. `send_message`) — standard MCP
 *   - sends `notifications/claude/channel` notifications for inbound — this file
 *
 * The notification handler wraps the content in a <channel> tag and
 * enqueues it. SleepTool polls hasCommandsInQueue() and wakes within 1s.
 * The model sees where the message came from and decides which tool to reply
 * with (the channel's MCP tool, SendUserMessage, or both).
 *
 * feature('KAIROS') || feature('KAIROS_CHANNELS'). Runtime gate tengu_harbor.
 * Requires claude.ai OAuth auth — API key users are blocked until
 * console gets a channelsEnabled admin surface. Teams/Enterprise orgs
 * must explicitly opt in via channelsEnabled: true in managed settings.
 */
import type { ServerCapabilities } from '@modelcontextprotocol/sdk/types.js';
import { type ChannelEntry } from '../../bootstrap/state.js';
import { getSubscriptionType } from '../../utils/auth.js';
import { type ChannelAllowlistEntry } from './channelAllowlist.js';
export declare const ChannelMessageNotificationSchema: () => any;
/**
 * Structured permission reply from a channel server. Servers that support
 * this declare `capabilities.experimental['claude/channel/permission']` and
 * emit this event INSTEAD of relaying "yes tbxkq" as text via
 * notifications/claude/channel. Explicit opt-in per server — a channel that
 * just wants to relay text never becomes a permission surface by accident.
 *
 * The server parses the user's reply (spec: /^\s*(y|yes|n|no)\s+([a-km-z]{5})\s*$/i)
 * and emits {request_id, behavior}. CC matches request_id against its
 * pending map. Unlike the regex-intercept approach, text in the general
 * channel can never accidentally match — approval requires the server
 * to deliberately emit this specific event.
 */
export declare const CHANNEL_PERMISSION_METHOD = "notifications/claude/channel/permission";
export declare const ChannelPermissionNotificationSchema: () => any;
/**
 * Outbound: CC → server. Fired from interactiveHandler.ts when a
 * permission dialog opens and the server has declared the permission
 * capability. Server formats the message for its platform (Telegram
 * markdown, iMessage rich text, Discord embed) and sends it to the
 * human. When the human replies "yes tbxkq", the server parses that
 * against PERMISSION_REPLY_RE and emits the inbound schema above.
 *
 * Not a zod schema — CC SENDS this, doesn't validate it. A type here
 * keeps both halves of the protocol documented side by side.
 */
export declare const CHANNEL_PERMISSION_REQUEST_METHOD = "notifications/claude/channel/permission_request";
export type ChannelPermissionRequestParams = {
    request_id: string;
    tool_name: string;
    description: string;
    /** JSON-stringified tool input, truncated to 200 chars with …. Full
     *  input is in the local terminal dialog; this is a phone-sized
     *  preview. Server decides whether/how to show it. */
    input_preview: string;
};
export declare function wrapChannelMessage(serverName: string, content: string, meta?: Record<string, string>): string;
/**
 * Effective allowlist for the current session. Team/enterprise orgs can set
 * allowedChannelPlugins in managed settings — when set, it REPLACES the
 * GrowthBook ledger (admin owns the trust decision). Undefined falls back
 * to the ledger. Unmanaged users always get the ledger.
 *
 * Callers already read sub/policy for the policy gate — pass them in to
 * avoid double-reading getSettingsForSource (uncached).
 */
export declare function getEffectiveChannelAllowlist(sub: ReturnType<typeof getSubscriptionType>, orgList: ChannelAllowlistEntry[] | undefined): {
    entries: ChannelAllowlistEntry[];
    source: 'org' | 'ledger';
};
export type ChannelGateResult = {
    action: 'register';
} | {
    action: 'skip';
    kind: 'capability' | 'disabled' | 'auth' | 'policy' | 'session' | 'marketplace' | 'allowlist';
    reason: string;
};
/**
 * Match a connected MCP server against the user's parsed --channels entries.
 * server-kind is exact match on bare name; plugin-kind matches on the second
 * segment of plugin:X:Y. Returns the matching entry so callers can read its
 * kind — that's the user's trust declaration, not inferred from runtime shape.
 */
export declare function findChannelEntry(serverName: string, channels: readonly ChannelEntry[]): ChannelEntry | undefined;
/**
 * Gate an MCP server's channel-notification path. Caller checks
 * feature('KAIROS') || feature('KAIROS_CHANNELS') first (build-time
 * elimination). Gate order: capability → runtime gate (tengu_harbor) →
 * auth (OAuth only) → org policy → session --channels → allowlist.
 * API key users are blocked at the auth layer — channels requires
 * claude.ai auth; console orgs have no admin opt-in surface yet.
 *
 *   skip      Not a channel server, or managed org hasn't opted in, or
 *             not in session --channels. Connection stays up; handler
 *             not registered.
 *   register  Subscribe to notifications/claude/channel.
 *
 * Which servers can connect at all is governed by allowedMcpServers —
 * this gate only decides whether the notification handler registers.
 */
export declare function gateChannelServer(serverName: string, capabilities: ServerCapabilities | undefined, pluginSource: string | undefined): ChannelGateResult;
//# sourceMappingURL=channelNotification.d.ts.map