/**
 * The PowerShell AST element type for pipeline elements.
 * Maps directly to CommandBaseAst derivatives in System.Management.Automation.Language.
 */
type PipelineElementType = 'CommandAst' | 'CommandExpressionAst' | 'ParenExpressionAst';
/**
 * The AST node type for individual command elements (arguments, expressions).
 * Used to classify each element during the AST walk so TypeScript can derive
 * security flags without extra Find-AstNodes calls in PowerShell.
 */
type CommandElementType = 'ScriptBlock' | 'SubExpression' | 'ExpandableString' | 'MemberInvocation' | 'Variable' | 'StringConstant' | 'Parameter' | 'Other';
/**
 * A child node of a command element (one level deep). Populated for
 * CommandParameterAst → .Argument (colon-bound parameters like
 * `-InputObject:$env:SECRET`). Consumers check `child.type` to classify
 * the bound value (Variable, StringConstant, Other) without parsing text.
 */
export type CommandElementChild = {
    type: CommandElementType;
    text: string;
};
/**
 * The PowerShell AST statement type.
 * Maps directly to StatementAst derivatives in System.Management.Automation.Language.
 */
type StatementType = 'PipelineAst' | 'PipelineChainAst' | 'AssignmentStatementAst' | 'IfStatementAst' | 'ForStatementAst' | 'ForEachStatementAst' | 'WhileStatementAst' | 'DoWhileStatementAst' | 'DoUntilStatementAst' | 'SwitchStatementAst' | 'TryStatementAst' | 'TrapStatementAst' | 'FunctionDefinitionAst' | 'DataStatementAst' | 'UnknownStatementAst';
/**
 * A command invocation within a pipeline segment.
 */
export type ParsedCommandElement = {
    /** The command/cmdlet name (e.g., "Get-ChildItem", "git") */
    name: string;
    /** The command name type: cmdlet, application (exe), or unknown */
    nameType: 'cmdlet' | 'application' | 'unknown';
    /** The AST element type from PowerShell's parser */
    elementType: PipelineElementType;
    /** All arguments as strings (includes flags like "-Recurse") */
    args: string[];
    /** The full text of this command element */
    text: string;
    /** AST node types for each element in this command (arguments, expressions, etc.) */
    elementTypes?: CommandElementType[];
    /**
     * Child nodes of each argument, aligned with `args[]` (so
     * `children[i]` ↔ `args[i]` ↔ `elementTypes[i+1]`). Only populated for
     * Parameter elements with a colon-bound argument. Undefined for elements
     * with no children. Lets consumers check `children[i].some(c => c.type
     * !== 'StringConstant')` instead of parsing the arg text for `:` + `$`.
     */
    children?: (CommandElementChild[] | undefined)[];
    /** Redirections on this command element (from nested commands in && / || chains) */
    redirections?: ParsedRedirection[];
};
/**
 * A redirection found in the command.
 */
type ParsedRedirection = {
    /** The redirection operator */
    operator: '>' | '>>' | '2>' | '2>>' | '*>' | '*>>' | '2>&1';
    /** The target (file path or stream number) */
    target: string;
    /** Whether this is a merging redirection like 2>&1 */
    isMerging: boolean;
};
/**
 * A parsed statement from PowerShell.
 * Can be a pipeline, assignment, control flow statement, etc.
 */
type ParsedStatement = {
    /** The AST statement type from PowerShell's parser */
    statementType: StatementType;
    /** Individual commands in this statement (for pipelines) */
    commands: ParsedCommandElement[];
    /** Redirections on this statement */
    redirections: ParsedRedirection[];
    /** Full text of the statement */
    text: string;
    /**
     * For control flow statements (if, for, foreach, while, try, etc.),
     * commands found recursively inside the body blocks.
     * Uses FindAll() to extract ALL nested CommandAst nodes at any depth.
     */
    nestedCommands?: ParsedCommandElement[];
    /**
     * Security-relevant AST patterns found via FindAll() on the entire statement,
     * regardless of statement type. This catches patterns that elementTypes may
     * miss (e.g. member invocations inside assignments, subexpressions in
     * non-pipeline statements). Computed in the PS1 script using instanceof
     * checks against the PowerShell AST type system.
     */
    securityPatterns?: {
        hasMemberInvocations?: boolean;
        hasSubExpressions?: boolean;
        hasExpandableStrings?: boolean;
        hasScriptBlocks?: boolean;
    };
};
/**
 * A variable reference found in the command.
 */
type ParsedVariable = {
    /** The variable path (e.g., "HOME", "env:PATH", "global:x") */
    path: string;
    /** Whether this variable uses splatting (@var instead of $var) */
    isSplatted: boolean;
};
/**
 * A parse error from PowerShell's parser.
 */
type ParseError = {
    message: string;
    errorId: string;
};
/**
 * The complete parsed result from the PowerShell AST parser.
 */
export type ParsedPowerShellCommand = {
    /** Whether the command parsed successfully (no syntax errors) */
    valid: boolean;
    /** Parse errors, if any */
    errors: ParseError[];
    /** Top-level statements, separated by ; or newlines */
    statements: ParsedStatement[];
    /** All variable references found */
    variables: ParsedVariable[];
    /** Whether the token stream contains a stop-parsing (--%) token */
    hasStopParsing: boolean;
    /** The original command text */
    originalCommand: string;
    /**
     * All .NET type literals found anywhere in the AST (TypeExpressionAst +
     * TypeConstraintAst). TypeName.FullName — the literal text as written, NOT
     * the resolved .NET type (e.g. [int] → "int", not "System.Int32").
     * Consumed by the CLM-allowlist check in powershellSecurity.ts.
     */
    typeLiterals?: string[];
    /**
     * Whether the command contains `using module` or `using assembly` statements.
     * These load external code (modules/assemblies) and execute their top-level
     * script body or module initializers. The using statement is a sibling of
     * the named blocks on ScriptBlockAst, not a child, so it is not visible
     * to Process-BlockStatements or any downstream command walker.
     */
    hasUsingStatements?: boolean;
    /**
     * Whether the command contains `#Requires` directives (ScriptRequirements).
     * `#Requires -Modules <name>` triggers module loading from PSModulePath.
     */
    hasScriptRequirements?: boolean;
};
/**
 * The PowerShell parse script inlined as a string constant.
 * This avoids needing to read from disk at runtime (the file may not exist
 * in bundled builds). The script uses the native PowerShell AST parser to
 * analyze a command and output structured JSON.
 */
export type RawCommandElement = {
    type: string;
    text: string;
    value?: string;
    expressionType?: string;
    children?: {
        type: string;
        text: string;
    }[];
};
export type RawRedirection = {
    type: string;
    append?: boolean;
    fromStream?: string;
    locationText?: string;
};
export type RawPipelineElement = {
    type: string;
    text: string;
    commandElements?: RawCommandElement[];
    redirections?: RawRedirection[];
    expressionType?: string;
};
export type RawStatement = {
    type: string;
    text: string;
    elements?: RawPipelineElement[];
    nestedCommands?: RawPipelineElement[];
    redirections?: RawRedirection[];
    securityPatterns?: {
        hasMemberInvocations?: boolean;
        hasSubExpressions?: boolean;
        hasExpandableStrings?: boolean;
        hasScriptBlocks?: boolean;
    };
};
/**
 * The core parse logic.
 * The command is passed via Base64-encoded $EncodedCommand variable
 * to avoid here-string injection attacks.
 *
 * SECURITY — top-level ParamBlock: ScriptBlockAst.ParamBlock is a SIBLING of
 * the named blocks (Begin/Process/End/Clean/DynamicParam), not nested inside
 * them, so Process-BlockStatements never reaches it. Commands inside param()
 * default-value expressions and attribute arguments (e.g. [ValidateScript({...})])
 * were invisible to every downstream check. PoC:
 *   param($x = (Remove-Item /)); Get-Process   → only Get-Process surfaced
 *   param([ValidateScript({rm /;$true})]$x='t') → rm invisible, runs on bind
 * Function-level param() IS covered: FindAll on the FunctionDefinitionAst
 * statement recurses into its descendants. The gap was only the script-level
 * ParamBlock. ParamBlockAst has .Parameters (not .Statements) so we FindAll
 * on it directly rather than reusing Process-BlockStatements. We only emit a
 * statement if there is something to report, to avoid noise for plain
 * param($x) declarations. (Kept compact in-script to preserve argv budget.)
 */
/**
 * PS1 parse script. Comments live here (not inline) — every char inside the
 * backticks eats into WINDOWS_MAX_COMMAND_LENGTH (argv budget).
 *
 * Structure:
 * - Get-RawCommandElements: extract CommandAst element data (type, text, value,
 *   expressionType, children for colon-bound param .Argument)
 * - Get-RawRedirections: extract FileRedirectionAst operator+target
 * - Get-SecurityPatterns: FindAll for security flags (hasSubExpressions via
 *   Sub/Array/ParenExpressionAst, hasScriptBlocks, etc.)
 * - Type literals: emit TypeExpressionAst names for CLM allowlist check
 * - --% token: PS7 MinusMinus, PS5.1 Generic kind
 * - CommandExpressionAst.Redirections: inherits from CommandBaseAst —
 *   `1 > /tmp/x` statement has FileRedirectionAst that element-iteration misses
 * - Nested commands: FindAll for ALL statement types (if/for/foreach/while/
 *   switch/try/function/assignment/PipelineChainAst) — skip direct pipeline
 *   elements already in the loop
 */
export declare const PARSE_SCRIPT_BODY = "\nif (-not $EncodedCommand) {\n    Write-Output '{\"valid\":false,\"errors\":[{\"message\":\"No command provided\",\"errorId\":\"NoInput\"}],\"statements\":[],\"variables\":[],\"hasStopParsing\":false,\"originalCommand\":\"\"}'\n    exit 0\n}\n\n$Command = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($EncodedCommand))\n\n$tokens = $null\n$parseErrors = $null\n$ast = [System.Management.Automation.Language.Parser]::ParseInput(\n    $Command,\n    [ref]$tokens,\n    [ref]$parseErrors\n)\n\n$allVariables = [System.Collections.ArrayList]::new()\n\nfunction Get-RawCommandElements {\n    param([System.Management.Automation.Language.CommandAst]$CmdAst)\n    $elems = [System.Collections.ArrayList]::new()\n    foreach ($ce in $CmdAst.CommandElements) {\n        $ceData = @{ type = $ce.GetType().Name; text = $ce.Extent.Text }\n        if ($ce.PSObject.Properties['Value'] -and $null -ne $ce.Value -and $ce.Value -is [string]) {\n            $ceData.value = $ce.Value\n        }\n        if ($ce -is [System.Management.Automation.Language.CommandExpressionAst]) {\n            $ceData.expressionType = $ce.Expression.GetType().Name\n        }\n        $a=$ce.Argument;if($a){$ceData.children=@(@{type=$a.GetType().Name;text=$a.Extent.Text})}\n        [void]$elems.Add($ceData)\n    }\n    return $elems\n}\n\nfunction Get-RawRedirections {\n    param($Redirections)\n    $result = [System.Collections.ArrayList]::new()\n    foreach ($redir in $Redirections) {\n        $redirData = @{ type = $redir.GetType().Name }\n        if ($redir -is [System.Management.Automation.Language.FileRedirectionAst]) {\n            $redirData.append = [bool]$redir.Append\n            $redirData.fromStream = $redir.FromStream.ToString()\n            $redirData.locationText = $redir.Location.Extent.Text\n        }\n        [void]$result.Add($redirData)\n    }\n    return $result\n}\n\nfunction Get-SecurityPatterns($A) {\n    $p = @{}\n    foreach ($n in $A.FindAll({ param($x)\n        $x -is [System.Management.Automation.Language.MemberExpressionAst] -or\n        $x -is [System.Management.Automation.Language.SubExpressionAst] -or\n        $x -is [System.Management.Automation.Language.ArrayExpressionAst] -or\n        $x -is [System.Management.Automation.Language.ExpandableStringExpressionAst] -or\n        $x -is [System.Management.Automation.Language.ScriptBlockExpressionAst] -or\n        $x -is [System.Management.Automation.Language.ParenExpressionAst]\n    }, $true)) { switch ($n.GetType().Name) {\n        'InvokeMemberExpressionAst' { $p.hasMemberInvocations = $true }\n        'MemberExpressionAst' { $p.hasMemberInvocations = $true }\n        'SubExpressionAst' { $p.hasSubExpressions = $true }\n        'ArrayExpressionAst' { $p.hasSubExpressions = $true }\n        'ParenExpressionAst' { $p.hasSubExpressions = $true }\n        'ExpandableStringExpressionAst' { $p.hasExpandableStrings = $true }\n        'ScriptBlockExpressionAst' { $p.hasScriptBlocks = $true }\n    }}\n    if ($p.Count -gt 0) { return $p }\n    return $null\n}\n\n$varExprs = $ast.FindAll({ param($node) $node -is [System.Management.Automation.Language.VariableExpressionAst] }, $true)\nforeach ($v in $varExprs) {\n    [void]$allVariables.Add(@{\n        path = $v.VariablePath.ToString()\n        isSplatted = [bool]$v.Splatted\n    })\n}\n\n$typeLiterals = [System.Collections.ArrayList]::new()\nforeach ($t in $ast.FindAll({ param($n)\n    $n -is [System.Management.Automation.Language.TypeExpressionAst] -or\n    $n -is [System.Management.Automation.Language.TypeConstraintAst]\n}, $true)) { [void]$typeLiterals.Add($t.TypeName.FullName) }\n\n$hasStopParsing = $false\n$tk = [System.Management.Automation.Language.TokenKind]\nforeach ($tok in $tokens) {\n    if ($tok.Kind -eq $tk::MinusMinus) { $hasStopParsing = $true; break }\n    if ($tok.Kind -eq $tk::Generic -and ($tok.Text -replace '[\u2013\u2014\u2015]','-') -eq '--%') {\n        $hasStopParsing = $true; break\n    }\n}\n\n$statements = [System.Collections.ArrayList]::new()\n\nfunction Process-BlockStatements {\n    param($Block)\n    if (-not $Block) { return }\n\n    foreach ($stmt in $Block.Statements) {\n        $statement = @{\n            type = $stmt.GetType().Name\n            text = $stmt.Extent.Text\n        }\n\n        if ($stmt -is [System.Management.Automation.Language.PipelineAst]) {\n            $elements = [System.Collections.ArrayList]::new()\n            foreach ($element in $stmt.PipelineElements) {\n                $elemData = @{\n                    type = $element.GetType().Name\n                    text = $element.Extent.Text\n                }\n\n                if ($element -is [System.Management.Automation.Language.CommandAst]) {\n                    $elemData.commandElements = @(Get-RawCommandElements -CmdAst $element)\n                    $elemData.redirections = @(Get-RawRedirections -Redirections $element.Redirections)\n                } elseif ($element -is [System.Management.Automation.Language.CommandExpressionAst]) {\n                    $elemData.expressionType = $element.Expression.GetType().Name\n                    $elemData.redirections = @(Get-RawRedirections -Redirections $element.Redirections)\n                }\n\n                [void]$elements.Add($elemData)\n            }\n            $statement.elements = @($elements)\n\n            $allNestedCmds = $stmt.FindAll(\n                { param($node) $node -is [System.Management.Automation.Language.CommandAst] },\n                $true\n            )\n            $nestedCmds = [System.Collections.ArrayList]::new()\n            foreach ($cmd in $allNestedCmds) {\n                if ($cmd.Parent -eq $stmt) { continue }\n                $nested = @{\n                    type = $cmd.GetType().Name\n                    text = $cmd.Extent.Text\n                    commandElements = @(Get-RawCommandElements -CmdAst $cmd)\n                    redirections = @(Get-RawRedirections -Redirections $cmd.Redirections)\n                }\n                [void]$nestedCmds.Add($nested)\n            }\n            if ($nestedCmds.Count -gt 0) {\n                $statement.nestedCommands = @($nestedCmds)\n            }\n            $r = $stmt.FindAll({param($n) $n -is [System.Management.Automation.Language.FileRedirectionAst]}, $true)\n            if ($r.Count -gt 0) {\n                $rr = @(Get-RawRedirections -Redirections $r)\n                $statement.redirections = if ($statement.redirections) { @($statement.redirections) + $rr } else { $rr }\n            }\n        } else {\n            $nestedCmdAsts = $stmt.FindAll(\n                { param($node) $node -is [System.Management.Automation.Language.CommandAst] },\n                $true\n            )\n            $nested = [System.Collections.ArrayList]::new()\n            foreach ($cmd in $nestedCmdAsts) {\n                [void]$nested.Add(@{\n                    type = 'CommandAst'\n                    text = $cmd.Extent.Text\n                    commandElements = @(Get-RawCommandElements -CmdAst $cmd)\n                    redirections = @(Get-RawRedirections -Redirections $cmd.Redirections)\n                })\n            }\n            if ($nested.Count -gt 0) {\n                $statement.nestedCommands = @($nested)\n            }\n            $r = $stmt.FindAll({param($n) $n -is [System.Management.Automation.Language.FileRedirectionAst]}, $true)\n            if ($r.Count -gt 0) { $statement.redirections = @(Get-RawRedirections -Redirections $r) }\n        }\n\n        $sp = Get-SecurityPatterns $stmt\n        if ($sp) { $statement.securityPatterns = $sp }\n\n        [void]$statements.Add($statement)\n    }\n\n    if ($Block.Traps) {\n        foreach ($trap in $Block.Traps) {\n            $statement = @{\n                type = 'TrapStatementAst'\n                text = $trap.Extent.Text\n            }\n            $nestedCmdAsts = $trap.FindAll(\n                { param($node) $node -is [System.Management.Automation.Language.CommandAst] },\n                $true\n            )\n            $nestedCmds = [System.Collections.ArrayList]::new()\n            foreach ($cmd in $nestedCmdAsts) {\n                $nested = @{\n                    type = $cmd.GetType().Name\n                    text = $cmd.Extent.Text\n                    commandElements = @(Get-RawCommandElements -CmdAst $cmd)\n                    redirections = @(Get-RawRedirections -Redirections $cmd.Redirections)\n                }\n                [void]$nestedCmds.Add($nested)\n            }\n            if ($nestedCmds.Count -gt 0) {\n                $statement.nestedCommands = @($nestedCmds)\n            }\n            $r = $trap.FindAll({param($n) $n -is [System.Management.Automation.Language.FileRedirectionAst]}, $true)\n            if ($r.Count -gt 0) { $statement.redirections = @(Get-RawRedirections -Redirections $r) }\n            $sp = Get-SecurityPatterns $trap\n            if ($sp) { $statement.securityPatterns = $sp }\n            [void]$statements.Add($statement)\n        }\n    }\n}\n\nProcess-BlockStatements -Block $ast.BeginBlock\nProcess-BlockStatements -Block $ast.ProcessBlock\nProcess-BlockStatements -Block $ast.EndBlock\nProcess-BlockStatements -Block $ast.CleanBlock\nProcess-BlockStatements -Block $ast.DynamicParamBlock\n\nif ($ast.ParamBlock) {\n  $pb = $ast.ParamBlock\n  $pn = [System.Collections.ArrayList]::new()\n  foreach ($c in $pb.FindAll({param($n) $n -is [System.Management.Automation.Language.CommandAst]}, $true)) {\n    [void]$pn.Add(@{type='CommandAst';text=$c.Extent.Text;commandElements=@(Get-RawCommandElements -CmdAst $c);redirections=@(Get-RawRedirections -Redirections $c.Redirections)})\n  }\n  $pr = $pb.FindAll({param($n) $n -is [System.Management.Automation.Language.FileRedirectionAst]}, $true)\n  $ps = Get-SecurityPatterns $pb\n  if ($pn.Count -gt 0 -or $pr.Count -gt 0 -or $ps) {\n    $st = @{type='ParamBlockAst';text=$pb.Extent.Text}\n    if ($pn.Count -gt 0) { $st.nestedCommands = @($pn) }\n    if ($pr.Count -gt 0) { $st.redirections = @(Get-RawRedirections -Redirections $pr) }\n    if ($ps) { $st.securityPatterns = $ps }\n    [void]$statements.Add($st)\n  }\n}\n\n$hasUsingStatements = $ast.UsingStatements -and $ast.UsingStatements.Count -gt 0\n$hasScriptRequirements = $ast.ScriptRequirements -ne $null\n\n$output = @{\n    valid = ($parseErrors.Count -eq 0)\n    errors = @($parseErrors | ForEach-Object {\n        @{\n            message = $_.Message\n            errorId = $_.ErrorId\n        }\n    })\n    statements = @($statements)\n    variables = @($allVariables)\n    hasStopParsing = $hasStopParsing\n    originalCommand = $Command\n    typeLiterals = @($typeLiterals)\n    hasUsingStatements = [bool]$hasUsingStatements\n    hasScriptRequirements = [bool]$hasScriptRequirements\n}\n\n$output | ConvertTo-Json -Depth 10 -Compress\n";
export declare const WINDOWS_MAX_COMMAND_LENGTH: number;
export declare const MAX_COMMAND_LENGTH: number;
/** Map raw .NET AST type name to our StatementType union */
export declare function mapStatementType(rawType: string): StatementType;
/** Map raw .NET AST type name to our CommandElementType union */
export declare function mapElementType(rawType: string, expressionType?: string): CommandElementType;
/** Classify command name as cmdlet, application, or unknown */
export declare function classifyCommandName(name: string): 'cmdlet' | 'application' | 'unknown';
/** Strip module prefix from command name (e.g. "Microsoft.PowerShell.Utility\\Invoke-Expression" -> "Invoke-Expression") */
export declare function stripModulePrefix(name: string): string;
/** Transform a raw CommandAst pipeline element into ParsedCommandElement */
export declare function transformCommandAst(raw: RawPipelineElement): ParsedCommandElement;
/** Transform a non-CommandAst pipeline element into ParsedCommandElement */
export declare function transformExpressionElement(raw: RawPipelineElement): ParsedCommandElement;
/** Map raw redirection to ParsedRedirection */
export declare function transformRedirection(raw: RawRedirection): ParsedRedirection;
/** Transform a raw statement into ParsedStatement */
export declare function transformStatement(raw: RawStatement): ParsedStatement;
declare const parsePowerShellCommandCached: {
    (command: string): Promise<ParsedPowerShellCommand>;
    cache: {
        clear: () => void;
        size: () => number;
        delete: (key: string) => boolean;
        get: (key: string) => Promise<ParsedPowerShellCommand> | undefined;
        has: (key: string) => boolean;
    };
};
export { parsePowerShellCommandCached as parsePowerShellCommand };
/**
 * Security-relevant flags derived from the parsed AST.
 */
type SecurityFlags = {
    /** Contains $(...) subexpression */
    hasSubExpressions: boolean;
    /** Contains { ... } script block expressions */
    hasScriptBlocks: boolean;
    /** Contains @variable splatting */
    hasSplatting: boolean;
    /** Contains expandable strings with embedded expressions ("...$()...") */
    hasExpandableStrings: boolean;
    /** Contains .NET method invocations ([Type]::Method or $obj.Method()) */
    hasMemberInvocations: boolean;
    /** Contains variable assignments ($x = ...) */
    hasAssignments: boolean;
    /** Uses stop-parsing token (--%) */
    hasStopParsing: boolean;
};
/**
 * Common PowerShell aliases mapped to their canonical cmdlet names.
 * Uses Object.create(null) to prevent prototype-chain pollution — attacker-controlled
 * command names like 'constructor' or '__proto__' must return undefined, not inherited
 * Object.prototype properties.
 */
export declare const COMMON_ALIASES: Record<string, string>;
/**
 * Get all command names across all statements, pipeline segments, and nested commands.
 * Returns lowercased names for case-insensitive comparison.
 */
export declare function getAllCommandNames(parsed: ParsedPowerShellCommand): string[];
/**
 * Get all pipeline segments as flat list of commands.
 * Useful for checking each command independently.
 */
export declare function getAllCommands(parsed: ParsedPowerShellCommand): ParsedCommandElement[];
/**
 * Get all redirections across all statements.
 */
export declare function getAllRedirections(parsed: ParsedPowerShellCommand): ParsedRedirection[];
/**
 * Get all variables, optionally filtered by scope (e.g., 'env').
 * Variable paths in PowerShell can have scopes like "env:PATH", "global:x".
 */
export declare function getVariablesByScope(parsed: ParsedPowerShellCommand, scope: string): ParsedVariable[];
/**
 * Check if any command in the parsed result matches a given name (case-insensitive).
 * Handles common aliases too.
 */
export declare function hasCommandNamed(parsed: ParsedPowerShellCommand, name: string): boolean;
/**
 * Check if the command contains any directory-changing commands.
 * (Set-Location, cd, sl, chdir, Push-Location, pushd, Pop-Location, popd)
 */
export declare function hasDirectoryChange(parsed: ParsedPowerShellCommand): boolean;
/**
 * Check if the command is a single simple command (no pipes, no semicolons, no operators).
 */
export declare function isSingleCommand(parsed: ParsedPowerShellCommand): boolean;
/**
 * Check if a specific command has a given argument/flag (case-insensitive).
 * Useful for checking "-EncodedCommand", "-Recurse", etc.
 */
export declare function commandHasArg(command: ParsedCommandElement, arg: string): boolean;
/**
 * Tokenizer-level dash characters that PowerShell's parser accepts as
 * parameter prefixes. SpecialCharacters.IsDash (CharTraits.cs) accepts exactly
 * these four: ASCII hyphen-minus, en-dash, em-dash, horizontal bar. These are
 * tokenizer-level — they apply to ALL cmdlet parameters, not just argv to
 * powershell.exe (contrast with `/` which is an argv-parser quirk of
 * powershell.exe 5.1 only; see PS_ALT_PARAM_PREFIXES in powershellSecurity.ts).
 *
 * Extent.Text preserves the raw character; transformCommandAst uses ce.text
 * for CommandParameterAst elements, so these reach callers unchanged.
 */
export declare const PS_TOKENIZER_DASH_CHARS: Set<string>;
/**
 * Determines if an argument is a PowerShell parameter (flag), using the AST
 * element type as ground truth when available.
 *
 * The parser maps CommandParameterAst → 'Parameter' regardless of which dash
 * character the user typed — PowerShell's tokenizer handles that. So when
 * elementType is available, it's authoritative:
 *   - 'Parameter' → true (covers `-Path`, `–Path`, `—Path`, `―Path`)
 *   - anything else → false (a quoted "-Path" is StringConstant, not a param)
 *
 * When elementType is unavailable (backward compat / no AST detail), fall back
 * to a char check against PS_TOKENIZER_DASH_CHARS.
 */
export declare function isPowerShellParameter(arg: string, elementType?: CommandElementType): boolean;
/**
 * Check if any argument on a command is an unambiguous abbreviation of a PowerShell parameter.
 * PowerShell allows parameter abbreviation as long as the prefix is unambiguous.
 * The minPrefix is the shortest unambiguous prefix for the parameter.
 * For example, minPrefix '-en' for fullParam '-encodedcommand' matches '-en', '-enc', '-enco', etc.
 */
export declare function commandHasArgAbbreviation(command: ParsedCommandElement, fullParam: string, minPrefix: string): boolean;
/**
 * Split a parsed command into its pipeline segments for per-segment permission checking.
 * Returns each pipeline's commands separately.
 */
export declare function getPipelineSegments(parsed: ParsedPowerShellCommand): ParsedStatement[];
/**
 * True if a redirection target is PowerShell's `$null` automatic variable.
 * `> $null` discards output (like /dev/null) — not a filesystem write.
 * `$null` cannot be reassigned, so this is safe to treat as a no-op sink.
 * `${null}` is the same automatic variable via curly-brace syntax. Spaces
 * inside the braces (`${ null }`) name a different variable, so no regex.
 */
export declare function isNullRedirectionTarget(target: string): boolean;
/**
 * Get output redirections (file redirections, not merging redirections).
 * Returns only redirections that write to files.
 */
export declare function getFileRedirections(parsed: ParsedPowerShellCommand): ParsedRedirection[];
/**
 * Derive security-relevant flags from the parsed command structure.
 * This replaces the previous approach of computing flags in PowerShell via
 * separate Find-AstNodes calls. Instead, the PS1 script tags each element
 * with its AST node type, and this function walks those types.
 */
export declare function deriveSecurityFlags(parsed: ParsedPowerShellCommand): SecurityFlags;
//# sourceMappingURL=parser.d.ts.map