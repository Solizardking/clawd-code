import { Agent } from "../agent/agent";
import { type ProviderId } from "../grok/models";
import { type SandboxMode, type SandboxSettings } from "../utils/settings";
export interface AppStartupConfig {
    apiKey: string | undefined;
    baseURL: string;
    provider: ProviderId;
    model: string;
    sandboxMode: SandboxMode;
    sandboxSettings: SandboxSettings;
    maxToolRounds: number;
    toolsets: string[];
    version: string;
}
interface AppProps {
    agent: Agent;
    startupConfig: AppStartupConfig;
    initialMessage?: string;
    onExit?: () => void;
}
export declare function App({ agent, startupConfig, initialMessage, onExit }: AppProps): any;
export {};
