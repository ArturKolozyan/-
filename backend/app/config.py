from pathlib import Path

from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    bot_token: str
    owner_chat_id: int
    fastapi_host: str = "127.0.0.1"
    fastapi_port: int = 8000
    data_dir: str = str(ROOT_DIR / "backend" / "data")
    cors_origins: str = "http://127.0.0.1:3000,http://localhost:3000"

    @computed_field(return_type=list[str])
    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    model_config = SettingsConfigDict(
        env_file=str(ROOT_DIR / ".env"),
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


settings = Settings()
