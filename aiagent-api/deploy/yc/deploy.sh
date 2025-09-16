#!/bin/bash

PROJECT_DIR=../..

source $PROJECT_DIR/.env
ENV_FILE=./.env


TAG=cr.yandex/crphlhale1p66tb6f590/aiagent-api
CONTAINER_NAME=aiagent-api
SERVICE_ACCOUNT_NAME=admin1
SERVICE_ACCOUNT_ID=$(yc iam service-account list | grep $SERVICE_ACCOUNT_NAME | awk '{print $2}')


function build_push_docker() {
  cd $PROJECT_DIR || exit
  docker build -t $TAG . || exit
  docker push $TAG || exit
  cd "$OLDPWD" || exit
}
#
function read_env_vars_string(){

  # Чтение переменных из .env файла
  while IFS='=' read -r key value; do
    if [[ ! -z "$key" && ! "$key" =~ ^\ *#.* ]]; then
      # Формирование списка переменных окружения
      env_vars+="${key}=${value},"
    fi
  done < "$ENV_FILE"

  # Удаляем последний символ-запятую
  env_vars=${env_vars%,*}

  echo "$env_vars"
}
function create_container_revision(){
  cd $PROJECT_DIR || exit

  env_vars=$(read_env_vars_string)
  echo $env_vars

  yc serverless container revision deploy \
    --container-name $CONTAINER_NAME \
    --image $TAG \
    --cores 1 \
    --memory 128MB \
    --concurrency 1 \
    --execution-timeout 30s \
    --service-account-id "$SERVICE_ACCOUNT_ID" \
    --environment $env_vars

  cd "$OLDPWD"
}



#echo $SERVICE_ACCOUNT_ID
#############################
# main
#############################

build_push_docker
create_container_revision