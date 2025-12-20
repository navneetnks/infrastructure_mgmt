source .env.db
source .env.volume
source .env.network


if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  echo "Stopping and removing the docker container named $CONTAINER_NAME..."
  docker rm -f $CONTAINER_NAME
else
  echo "No running docker container named $CONTAINER_NAME found. Skipping container stop."
fi

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
  echo "Removing the docker volume named $VOLUME_NAME..."
  docker volume rm $VOLUME_NAME
else
  echo "No docker volume named $VOLUME_NAME found. Skipping volume removal."
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
  echo "Removing the docker network named $NETWORK_NAME..."
  docker network rm $NETWORK_NAME
else
  echo "No docker network named $NETWORK_NAME found. Skipping network removal."
fi
