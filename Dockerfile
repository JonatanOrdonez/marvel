FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy app source
COPY package*.json ./
COPY src/ ./src/
COPY index.ts ./
COPY tsconfig.json ./

# Set env variables
ENV MONGO_DB_HOST mongodb
ENV MONGO_DB_PORT 27017
ENV MONGO_DB_NAME marvel
ENV MONGO_DB_USERNAME root
ENV MONGO_DB_PASSWORD c@ptainAm3rica
ENV MARVEL_API_PUBLIC_KEY 52c98241a8c98bbc647266bb48fc802f
ENV MARVEL_API_PRIVATE_KEY 9dee762367043ea9360f43ab978c914be9c0ad21
ENV MARVEL_API_URL https://gateway.marvel.com/v1/public
ENV MARVEL_MAX_LIMIT 100

# Install app dependencies
RUN ["npm", "install"]

# Build app
RUN [ "npm", "run", "compile" ]

# Start app
ENTRYPOINT [ "npm", "start" ]
