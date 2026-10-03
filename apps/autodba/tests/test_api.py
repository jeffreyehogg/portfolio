"""
Tests for FastAPI REST endpoints and error handling.
"""

from fastapi.testclient import TestClient

from api.index import app

client = TestClient(app)


def test_health_endpoint():
    resp = client.get("/api/py/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "ok"
    assert "sqlglot_version" in data


def test_presets_list_and_detail():
    resp = client.get("/api/py/presets")
    assert resp.status_code == 200
    presets = resp.json()["presets"]
    assert len(presets) == 4

    p_id = presets[0]["id"]
    detail_resp = client.get(f"/api/py/presets/{p_id}")
    assert detail_resp.status_code == 200
    detail = detail_resp.json()
    assert detail["id"] == p_id
    assert detail["result"]["engine"] == "preset"


def test_preset_not_found():
    resp = client.get("/api/py/presets/non-existent-id")
    assert resp.status_code == 404
    assert resp.json()["error"]["code"] == "NOT_FOUND"


def test_analyze_endpoint():
    payload = {
        "sql": "SELECT * FROM Leads l WHERE YEAR(l.CreatedDate) = 2026",
        "dialect": "tsql",
    }
    resp = client.post("/api/py/analyze", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["report"]["parse_ok"]
    assert len(data["indexes"]) > 0


def test_optimize_deterministic_mode():
    payload = {
        "sql": "SELECT l.* FROM dbo.Leads l WHERE YEAR(l.CreatedDate) = 2026",
        "dialect": "tsql",
        "mode": "deterministic",
    }
    resp = client.post("/api/py/optimize", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["engine"] == "deterministic"
    assert data["quota"] is not None


def test_invalid_byok_key_returns_400():
    payload = {
        "sql": "SELECT 1",
        "dialect": "tsql",
    }
    resp = client.post(
        "/api/py/optimize",
        json=payload,
        headers={"X-Gemini-Key": "short-invalid-key"},
    )
    assert resp.status_code == 400
    assert resp.json()["error"]["code"] == "BAD_REQUEST"


def test_empty_sql_validation_error():
    resp = client.post("/api/py/analyze", json={"sql": "", "dialect": "tsql"})
    assert resp.status_code == 422
    assert resp.json()["error"]["code"] == "VALIDATION_ERROR"
