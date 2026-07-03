import * as fs from "fs";
import * as os from "os";
import * as path from "path";
export class PaymentHistory {
    static getLogPath() {
        return path.join(os.homedir(), ".clawd", "payment_log.jsonl");
    }
    record(entry) {
        const logPath = PaymentHistory.getLogPath();
        fs.mkdirSync(path.dirname(logPath), { recursive: true, mode: 0o700 });
        fs.appendFileSync(logPath, `${JSON.stringify(entry)}\n`, { encoding: "utf-8", mode: 0o600, flag: "a" });
    }
    list(limit = 20) {
        const logPath = PaymentHistory.getLogPath();
        if (!fs.existsSync(logPath))
            return [];
        const lines = fs
            .readFileSync(logPath, "utf-8")
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
        const records = [];
        for (let i = lines.length - 1; i >= 0 && records.length < limit; i -= 1) {
            const line = lines[i];
            if (!line)
                continue;
            try {
                records.push(JSON.parse(line));
            }
            catch {
                // Skip malformed lines so one bad entry doesn't break the whole log.
            }
        }
        return records;
    }
}
//# sourceMappingURL=history.js.map