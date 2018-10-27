# Tactics Arena

Put your tactics to the test against other players in a 1v1, chess-like arena!

### Quick Start

To get a local instance of the game up-and-running, follow the setups outlined below.

Create the env/* files from the examples.

```bash
cp env/server.example.json env/server.json
cp env/common.example.json env/common.json
```

Create a MySQL database, then update the details inside the env/server.json file.

Finally run the following command.

```bash
# Install memcached for session management
brew install memcached

# Install dependencies
npm install

# Build frontend assets
npm run assets:build

# Download model files
./bin/download_models.sh

# Start server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to see the game running.

### Contributing

You won't want to keep running the commands to manually build the assets and server, so run 
the following command to watch files for changes during development.

```bash
npm run dev
```
