FROM node:16.14.2-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the application port (example: 4000)
EXPOSE 4000

# Command to run the application
CMD [ "yarn", "prod" ]