# ------------------------------------------------------------------------------
# Stage 1: Base (Common dependencies)
# ------------------------------------------------------------------------------
FROM python:3.10-slim-bookworm AS base

# Prevent Python from writing pyc files and buffering stdout
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app

WORKDIR /app

# Install system dependencies (gcc usually needed for some python packages)
# Clean up apt cache to keep image small
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc curl \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
# We use a requirements file here, but this works similarly with poetry/uv
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# ------------------------------------------------------------------------------
# Stage 2: Development (Includes dev tools, hot-reload)
# ------------------------------------------------------------------------------
FROM base AS dev

# Install dev-specific dependencies (linting, testing, etc.)
# If you have a separate requirements-dev.txt:
# COPY requirements-dev.txt .
# RUN pip install --no-cache-dir -r requirements-dev.txt

# Expose port
EXPOSE 8000

COPY . .
# Run with hot-reload enabled
# "fastapi dev" is the new standard (since 2024) replacing "uvicorn --reload"
CMD ["fastapi", "dev", "main.py", "--host", "0.0.0.0", "--port", "8000"]

# ------------------------------------------------------------------------------
# Stage 3: Production (Lean, Secure, Optimized)
# ------------------------------------------------------------------------------
FROM python:3.10-slim-bookworm AS prod

# Create a non-root user for security [web:27][web:36]
RUN groupadd -r appuser && useradd -r -g appuser appuser

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app

WORKDIR /app

# Copy installed packages from the base stage to avoid re-installing
COPY --from=base /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=base /usr/local/bin /usr/local/bin

# Copy application code
COPY . .

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8000

# "fastapi run" is the official production command (uses multiple workers by default)
# Reference: [web:23][web:35]
CMD ["fastapi", "run", "main.py", "--port", "8000"]
