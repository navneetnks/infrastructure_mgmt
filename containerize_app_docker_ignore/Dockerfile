# Use official Node.js image
FROM node:24

# Set working directory
WORKDIR /app


# Copy application code
COPY . .


# Command to run your app (change as needed)
CMD ["node", "index.js"]

# command to create large file for linux based systems 
# dd if=/dev/zero of=largefile bs=1M count=1024