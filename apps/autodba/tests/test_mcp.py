"""
Tests for Model Context Protocol (MCP) JSON-RPC 2.0 endpoint.
"""

from fastapi.testclient import TestClient

from api.index import app

client = TestClient(app)


def test_mcp_get_not_allowed():
    resp = client.get("/api/py/mcp")
    assert resp.status_code == 405
    assert resp.headers.get("Allow") == "POST"


def test_mcp_initialize():
    req = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "initialize",
        "params": {"protocolVersion": "2025-06-18"},
    }
    resp = client.post("/api/py/mcp", json=req)
    assert resp.status_code == 200
    res = resp.json()["result"]
    assert res["protocolVersion"] == "2025-06-18"
    assert res["serverInfo"]["name"] == "autodba"


def test_mcp_notification():
    req = {
        "jsonrpc": "2.0",
        "method": "notifications/initialized",
        "params": {},
    }
    resp = client.post("/api/py/mcp", json=req)
    assert resp.status_code == 202


def test_mcp_ping():
    req = {"jsonrpc": "2.0", "id": 2, "method": "ping"}
    resp = client.post("/api/py/mcp", json=req)
    assert resp.status_code == 200
    assert resp.json()["result"] == {}


def test_mcp_tools_list():
    req = {"jsonrpc": "2.0", "id": 3, "method": "tools/list"}
    resp = client.post("/api/py/mcp", json=req)
    assert resp.status_code == 200
    tools = resp.json()["result"]["tools"]
    tool_names = [t["name"] for t in tools]
    assert "analyze_sql" in tool_names
    assert "optimize_sql" in tool_names
    assert "list_presets" in tool_names


def test_mcp_call_analyze_sql():
    req = {
        "jsonrpc": "2.0",
        "id": 4,
        "method": "tools/call",
        "params": {
            "name": "analyze_sql",
            "arguments": {
                "sql": "SELECT * FROM dbo.Leads l WHERE YEAR(l.CreatedDate) = 2026",
                "dialect": "tsql",
            },
        },
    }
    resp = client.post("/api/py/mcp", json=req)
    assert resp.status_code == 200
    result = resp.json()["result"]
    assert not result["isError"]
    assert "NON_SARGABLE_FUNCTION" in str(result["content"])


def test_mcp_unknown_method():
    req = {"jsonrpc": "2.0", "id": 5, "method": "non_existent_method"}
    resp = client.post("/api/py/mcp", json=req)
    assert resp.status_code == 200
    assert "error" in resp.json()
    assert resp.json()["error"]["code"] == -32601
