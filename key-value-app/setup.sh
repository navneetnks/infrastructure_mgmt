source .env.network
source .env.volume

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
  echo "A docker network named $NETWORK_NAME already exists. Skipping network creation."
else
  docker network create $NETWORK_NAME
fi

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
  echo "A docker volume named $VOLUME_NAME already exists. Skipping volume creation."
else
  docker volume create $VOLUME_NAME
fi
