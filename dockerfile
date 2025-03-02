# Use the official Bun image
FROM oven/bun:latest-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and bun.lockb
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile --production

# Copy the rest of the application code
COPY src ./

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "index.ts"]