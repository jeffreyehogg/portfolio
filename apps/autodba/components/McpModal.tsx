"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Copy, Terminal, X } from "lucide-react";

interface McpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function McpModal({ isOpen, onClose }: McpModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeTab, setActiveTab] = useState<"uvx" | "remote" | "curl">("uvx");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  const uvxConfig = JSON.stringify(
    {
      mcpServers: {
        autodba: {
          command: "uvx",
          args: ["autodba-mcp"],
        },
      },
    },
    null,
    2
  );

  const remoteConfig = JSON.stringify(
    {
      mcpServers: {
        autodba: {
          url: "https://autodba.jeffhogg.com/api/py/mcp",
        },
      },
    },
    null,
    2
  );

  const curlExample = `curl -X POST https://autodba.jeffhogg.com/api/py/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}'`;

  const activeSnippet =
    activeTab === "uvx"
      ? uvxConfig
      : activeTab === "remote"
      ? remoteConfig
      : curlExample;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="m-auto rounded-2xl bg-slate-950/90 text-slate-100 border border-white/[0.1] shadow-2xl backdrop:bg-slate-950/80 backdrop:backdrop-blur-md p-0 max-w-xl w-full focus:outline-none"
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Model Context Protocol (MCP) Server
              </h3>
              <p className="text-xs text-slate-400">
                Integrate AutoDBA query diagnostics directly into your AI IDE.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Overview */}
        <p className="text-xs text-slate-300 leading-relaxed">
          AutoDBA is published as a standalone Python MCP server package (<code className="text-cyan-300">autodba-mcp</code>). Run it locally in Claude Desktop, Cursor, or Antigravity via <code className="text-cyan-300">uvx autodba-mcp</code>, or connect to the serverless JSON-RPC HTTP endpoint.
        </p>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/[0.06]">
          {(
            [
              { id: "uvx", label: "Local Stdio (uvx autodba-mcp)" },
              { id: "remote", label: "Remote HTTP Endpoint" },
              { id: "curl", label: "cURL JSON-RPC Probe" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Box */}
        <div className="relative rounded-xl bg-slate-900 border border-white/[0.08] p-4 font-mono text-xs">
          <pre className="text-slate-200 overflow-x-auto whitespace-pre leading-5">
            <code>{activeSnippet}</code>
          </pre>

          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-white/[0.08] transition-all"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Footer info */}
        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>
            Repo:{" "}
            <a
              href="https://github.com/jeffreyehogg/autodba-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              github.com/jeffreyehogg/autodba-mcp
            </a>
          </span>
          <span className="text-emerald-400">Open-Source MCP Server</span>
        </div>
      </div>
    </dialog>
  );
}
