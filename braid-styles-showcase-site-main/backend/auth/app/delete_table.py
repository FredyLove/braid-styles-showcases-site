import asyncio
from app.database import engine
from app import models

async def reset_service_table():
    async with engine.begin() as conn:
        await conn.run_sync(models.Service.__table__.drop)
        await conn.run_sync(models.Service.__table__.create)
        print("✅ Service table dropped and recreated successfully.")

if __name__ == "__main__":
    asyncio.run(reset_service_table())
