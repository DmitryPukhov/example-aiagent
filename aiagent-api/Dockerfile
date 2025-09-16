# Use official Python base image with version 3.12
FROM python:3.12-slim-bookworm AS builder

# Set working directory inside container
WORKDIR /app

COPY pyproject.toml .
COPY src ./src
RUN pip install --upgrade pip && \
    pip install --no-cache-dir --use-pep517 /app

# Expose any ports needed by your application
EXPOSE 8000

# Command to run when starting the container
CMD ["python", "-m", "aiagent_api"]