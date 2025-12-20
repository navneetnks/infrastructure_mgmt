
source .env.db
# CONTAINER_NAME="mongodb"
# KEY_VALUE_DB="key-value-db"
# KEY_VALUE_USER="key-value-user"
# KEY_VALUE_PASSWORD="key-value-password"

ROOT_USER="admin"
ROOT_PASSWORD="adminpassword"

#network
# NETWORK_NAME="key-value-net"
source .env.network

source setup.sh

BACKEND_CONTAINER_NAME="backend"
BACKEND_IMAGE_NAME="key-value-backend"
CONTAINER_PORT=3000
MONGODB_HOST="mongodb"

if [ "$(docker ps -q -f name=$BACKEND_CONTAINER_NAME)" ]; then
  echo "A docker container named $BACKEND_CONTAINER_NAME is already running. Skipping container start."
  exit 1
fi

echo "Container=$BACKEND_CONTAINER_NAME, KEY_VALUE_DB=$KEY_VALUE_DB, KEY_VALUE_USER=$KEY_VALUE_USER, KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD"

printf 'Container=[%s], KEY_VALUE_DB=[%s], KEY_VALUE_USER=[%s], KEY_VALUE_PASSWORD=[%s]\n' \
  "$BACKEND_CONTAINER_NAME" "$KEY_VALUE_DB" "$KEY_VALUE_USER" "$KEY_VALUE_PASSWORD"

docker build -t $BACKEND_IMAGE_NAME -f backend/Dockerfile.dev backend 

docker run --rm -d --name $BACKEND_CONTAINER_NAME \
    -e KEY_VALUE_DB=$KEY_VALUE_DB \
    -e KEY_VALUE_USER=$KEY_VALUE_USER \
    -e PORT=$CONTAINER_PORT \
    -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
    -e MONGODB_HOST=$MONGODB_HOST \
    -e CHOKIDAR_USEPOLLING=true \
    --network $NETWORK_NAME \
    -p $CONTAINER_PORT:$CONTAINER_PORT \
    -v ./backend/src:/app/src:ro \
    $BACKEND_IMAGE_NAME
