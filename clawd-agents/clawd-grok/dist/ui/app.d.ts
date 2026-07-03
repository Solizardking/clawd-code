import { Agent } from "../agent/agent";
import { type SandboxMode, type SandboxSettings } from "../utils/settings";
export interface AppStartupConfig {
    apiKey: string | undefined;
    baseURL: string;
    model: string;
    sandboxMode: SandboxMode;
    sandboxSettings: SandboxSettings;
    maxToolRounds: number;
    version: string;
}
interface AppProps {
    agent: Agent;
    startupConfig: AppStartupConfig;
    initialMessage?: string;
    onExit?: () => void;
}
export declare function App({ agent, startupConfig, initialMessage, onExit }: AppProps): import("react").ReactNode;
export {};
