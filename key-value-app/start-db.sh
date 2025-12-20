MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="latest"
# source .env.db
CONTAINER_NAME="mongodb"
KEY_VALUE_DB="key-value-db"
KEY_VALUE_USER="key-value-user"
KEY_VALUE_PASSWORD="key-value-password"

ROOT_USER="admin"
ROOT_PASSWORD="adminpassword"

# volume
# source .env.volume
VOLUME_NAME="mongodb_data"
VOLUME_CONTAINER_PATH="/data/db"

#network
# NETWORK_NAME="key-value-net"
# source .env.network
NETWORK_NAME="key-value-net"

source setup.sh

if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  echo "A docker container named $CONTAINER_NAME is already running. Skipping container start."
  exit 1
fi
echo "Container Name=$CONTAINER_NAME"
echo "KEY_VALUE_DB=$KEY_VALUE_DB"
echo "KEY_VALUE_USER=$KEY_VALUE_USER"
echo "KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD"
echo "VOLUME_NAME=$VOLUME_NAME"
echo "VOLUME_CONTAINER_PATH=$VOLUME_CONTAINER_PATH"
echo "NETWORK_NAME=$NETWORK_NAME"

docker run -d --name $CONTAINER_NAME \
    -e MONGODB_INITDB_ROOT_USERNAME=$ROOT_USER \
    -e MONGODB_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \
    -e KEY_VALUE_DB=$KEY_VALUE_DB \
    -e KEY_VALUE_USER=$KEY_VALUE_USER \
    -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
    -v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
    -v ./db-config/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
    -p 27017:27017 \
    --network $NETWORK_NAME \
    $MONGODB_IMAGE:$MONGODB_TAG
