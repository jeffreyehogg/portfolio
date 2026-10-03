from __future__ import annotations

from functools import lru_cache
from pydantic import AliasChoices, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(extra="ignore", populate_by_name=True)

    gemini_api_key: str | None = Field(
        default=None,
        validation_alias=AliasChoices("GEMINI_API_KEY", "GOOGLE_API_KEY"),
    )
    gemini_model: str = Field(
        default="gemini-flash-latest",
        validation_alias=AliasChoices("GEMINI_MODEL"),
    )
    llm_daily_limit: int = Field(
        default=5,
        validation_alias=AliasChoices("LLM_DAILY_LIMIT"),
    )
    byok_daily_limit: int = Field(
        default=50,
        validation_alias=AliasChoices("BYOK_DAILY_LIMIT"),
    )
    analyze_per_minute: int = Field(
        default=60,
        validation_alias=AliasChoices("ANALYZE_PER_MINUTE"),
    )
    llm_timeout_s: float = Field(
        default=25.0,
        validation_alias=AliasChoices("LLM_TIMEOUT_S"),
    )
    max_agent_iterations: int = Field(
        default=3,
        validation_alias=AliasChoices("MAX_AGENT_ITERATIONS"),
    )
    app_version: str = Field(
        default="1.0.0",
        validation_alias=AliasChoices("APP_VERSION"),
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
